import classNames from "classnames/bind";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import PageSizeSelector from "../../components/PageSizeSelector";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import {
  addBooking,
  deleteBooking,
  editBooking,
  getBookings,
  resetStatusDeleteBooking,
  selectLoadingBooking,
  selectBookingList,
  selectStatusDeleteBooking,
  selectTotalBooking,
} from "../../redux/slice/Booking/BookingSlice";
import {
  EditBookingReq,
  GetBookingReq,
  BookingRes,
} from "../../redux/types/Booking/booking";
import ModalBooking from "./ModalBooking/ModalBooking";
import styles from "./Booking.module.scss";
import { imageUpload } from "../../common/utils";
import Schedule from "../../components/Schedule/Schedule";

const MainLayout = lazy(() => import("../../components/MainLayout"));
const Table = lazy(() => import("../../components/Table"));
const DropDownEdit = lazy(() => import("../../components/DropDownEdit/index"));
const Modal = lazy(() => import("../../components/Modal"));
const Loading = lazy(() => import("../../components/Loading"));
const ModalConfirm = lazy(() => import("../../components/ModalConfirm"));
const Pagination = lazy(() => import("../../components/Pagination"));

interface SortType {
  sortBy: string;
  type: string;
}

export default function Booking() {
  const cx = classNames.bind(styles);
  const List = [
    { title: "#", sortBy: "" },
    { title: "Tên nhóm dịch vụ" },
    { title: "Ảnh dịch vụ" },
    { title: "Mã dịch vụ" },
    { title: "SKU" },
    { title: "Mô tả" },
    { title: "Action" },
  ];
  const dispatch = useAppDispatch();

  const initial = {
    page: 1,
    limit: 10,
    sortBy: "name",
    sortOrder: "ASC",
  } as GetBookingReq;

  const newBooking = useRef(false);
  const [show, setShow] = useState(false);
  const [modelConfirm, setShowModelConfirm] = useState(false);
  // const [newBooking, setNewBooking] = useState(false);
  const pageSizeList = [10, 25, 50, 100];
  const [limit, setLimit] = useState(pageSizeList[0]);
  const [selected, setSelected] = useState<BookingRes>({
    id: "",
    name: "",
    code: "",
    sku: "",
    image: "",
    description: "",
  });
  const [sort, setSort] = useState<SortType>({ sortBy: "", type: "" });
  const [path, setPath] = useState<GetBookingReq>(initial);
  const [page, setPage] = useState<number>(1);

  const selectBookings = useAppSelector(selectBookingList);
  const loading = useAppSelector(selectLoadingBooking);
  const statusDelete = useAppSelector(selectStatusDeleteBooking);
  const totalBooking = useAppSelector(selectTotalBooking);
  const handleEditBooking = (e: BookingRes) => {
    setShow(true);
    newBooking.current = false;
    setSelected(e);
  };

  const handleAddBooking = () => {
    setShow(true);
    newBooking.current = true;
  };

  const handleDelete = (e: BookingRes) => {
    setShowModelConfirm(true);
    setSelected(e);
  };

  const confirmDelete = () => {
    const req = {
      id: selected.id,
    };
    dispatch(deleteBooking(req));
    setShowModelConfirm(false);
  };

  const handleChangePage = (e: number) => {
    setPage(e);
  };

  useEffect(() => {
    setLimit(limit);
    setPath({ ...path, limit: limit });
  }, [limit]);

  useEffect(() => {
    setPath({ ...path, page: page });
  }, [page]);

  useEffect(() => {
    if (sort.type !== "") {
      setPath({ ...path, sortOrder: sort.type });
    }
  }, [sort.type]);

  useEffect(() => {
    if (sort.sortBy !== "") {
      setPath({ ...path, sortBy: sort.sortBy });
    }
  }, [sort.sortBy]);

  useEffect(() => {
    if (path || statusDelete === true) {
      dispatch(getBookings(path));
    }

    return () => {
      dispatch(resetStatusDeleteBooking(0));
    };
  }, [path.page, path.limit, path.sortBy, path.sortOrder, statusDelete]);

  return (
    <Suspense fallback={<></>}>
      <MainLayout
        title="Booking"
        titleButton="Thêm Cuộc hẹn"
        handleClickAdd={handleAddBooking}
      >
        <Schedule />
      </MainLayout>
    </Suspense>
  );
}
