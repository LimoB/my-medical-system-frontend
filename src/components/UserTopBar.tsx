import BaseTopBar from './BaseTopBar';

interface Props {
  onToggleSidebar: () => void;
}

export default function UserTopBar({ onToggleSidebar }: Props) {
  return <BaseTopBar onToggleSidebar={onToggleSidebar} />;
}
