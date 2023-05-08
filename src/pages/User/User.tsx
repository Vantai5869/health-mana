import { Suspense } from 'react';
import MainLayout from '../../components/MainLayout/MainLayout';
import StatCard from '../../components/StatCard/StatCard';
import './User.scss';

const statCard = [
  {
    title: 'Khách hàng',
    value: '41',
  },
  {
    title: 'Cuộc hẹn',
    value: '120',
  },
  {
    title: 'Dịch vụ',
    value: '8',
  },
  {
    title: 'Chi nhánh',
    value: '3',
  },
  {
    title: 'Nhóm dịch vụ',
    value: '6',
  },
];

export default function User() {
  const renderStatCard = () => {
    return statCard.map((i) => {
      return <StatCard title={i.title} value={i.value} key={i.title} />;
    });
  };

  return (
    <Suspense fallback={<></>}>
      <MainLayout title="Thống kê">
        <div className="dashboard">{renderStatCard()}</div>
      </MainLayout>
    </Suspense>
  );
}
