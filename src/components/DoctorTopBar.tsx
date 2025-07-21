import BaseTopBar from './BaseTopBar';

interface Props {
  onToggleSidebar: () => void;
}

export default function DoctorTopBar({ onToggleSidebar }: Props) {
  return <BaseTopBar onToggleSidebar={onToggleSidebar} />;
}
