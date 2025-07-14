import BaseTopBar from './BaseTopBar';

interface Props {
  onToggleSidebar: () => void;
}

export default function AdminTopBar({ onToggleSidebar }: Props) {
  return <BaseTopBar onToggleSidebar={onToggleSidebar} />;
}
