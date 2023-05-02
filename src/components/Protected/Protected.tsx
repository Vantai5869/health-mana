/* eslint-disable max-len */
import classNames from "classnames/bind";
import { Suspense, lazy, useEffect, useState } from "react";
import { withCookies } from "react-cookie";
import {
  Navigate,
  Route,
  Routes
} from "react-router-dom";
import styles from "./Protected.module.scss";
import ServiceGroup from "../../pages/ServiceGroup/ServiceGroup";

const Header = lazy(() => import("../Header"));
const Sidebar = lazy(() => import("../Sidebar"));
const Branch = lazy(() => import("../../pages/Branch"));
function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}

const Protected = (props: any) => {
  const cx = classNames.bind(styles);
  const [openOnClick, setOpenOnClick] = useState(true);
  const [menuActive, setMenuActive] = useState(true);
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const { role } = JSON.parse(localStorage.getItem("authUser") as any);

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  // useEffect(() => {
  //   windowSize.innerWidth < 1400 && setMenuActive(() => false);
  // }, [windowSize]);

  const onClickCloseMobile = () => {
    setMenuActive(!false);
  };

  const handleMenuClick = () => {
    setMenuActive(!menuActive);
    setOpenOnClick(!openOnClick);
  };

  const menu = [
    {
      path: "branch",
      component: <Branch />,
      isAdmin: false,
    },
    {
      path: "service-group",
      component: <ServiceGroup />,
      isAdmin: false,
    },
  ];
  return (
    <div className={cx("wrapper")}>
      {/* {menuActive && <Sidebar menuActive={menuActive} onMenuClick={handleMenuClick} />} */}
      <Sidebar
        openOnClick={openOnClick}
        menuActive={menuActive}
        onMenuClick={handleMenuClick}
        setMenuActive={setMenuActive}
      />
      <div className={cx("app", menuActive ? "" : "sm-margin")}>
        <Header onMenuClick={handleMenuClick} menuActive={menuActive} />
        {role === "USER" ? (
          <Routes>
            {menu.map((element, index) => (
              <Route
                path={`/${element.path}`}
                element={
                  <Suspense fallback={<></>}>
                    {!element.isAdmin ? (
                      element.component
                    ) : (
                      <Navigate to="/employee-profile" />
                    )}
                  </Suspense>
                }
                key={String(index)}
              />
            ))}
            {/* <Route path="/404" element={<PageNotFound />}></Route> */}
          </Routes>
        ) : (
          <Routes>
            {menu.map((element, index) => (
              <Route
                path={`/${element.path}`}
                element={
                  <Suspense fallback={<></>}>{element.component}</Suspense>
                }
                key={String(index)}
              />
            ))}
            {/* <Route path="/404" element={<PageNotFound />}></Route> */}
          </Routes>
        )}
      </div>
    </div>
  );
};

export default withCookies(Protected);
