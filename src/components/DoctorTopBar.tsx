import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import BaseTopBar from './BaseTopBar';

interface Props {
  onToggleSidebar: () => void;
}

export default function DoctorTopBar({ onToggleSidebar }: Props) {
  const user = useSelector((state: RootState) => state.auth.user);
  const name = user?.name || 'Doctor';
  return <BaseTopBar onToggleSidebar={onToggleSidebar} greeting={`Good Morning, Dr. ${name}`} />;
}
