import { Suspense } from "react";
import MainLayout from "../../components/MainLayout/MainLayout";
import StatCard from "../../components/StatCard/StatCard";
import "./Dashboard.scss";

const statCard = [
  {
    title: "Khách hàng",
    value: "41",
  },
  {
    title: "Cuộc hẹn",
    value: "120",
  },
  {
    title: "Dịch vụ",
    value: "8",
  },
  {
    title: "Chi nhánh",
    value: "3",
  },
  {
    title: "Nhóm dịch vụ",
    value: "6",
  },
];
export default function Dashboard() {
  const renderStatCard = () => {
    return statCard.map((i) => {
      return <StatCard title={i.title} value={i.value} />;
    });
  };
  // const cx = classNames.bind(styles);

  return (
    <Suspense fallback={<></>}>
      <MainLayout title="Thống kê">
        <div className="dashboard">{renderStatCard()}</div>
      </MainLayout>
    </Suspense>
  );
}
