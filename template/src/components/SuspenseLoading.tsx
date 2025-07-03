import LoadingSpinner from './LoadingSpinner';
import type { SuspenseLoadingProps } from '../types/loading';

export default function SuspenseLoading({
  text = '页面加载中...',
}: SuspenseLoadingProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <LoadingSpinner text={text} size="lg" />
      </div>
    </div>
  );
}
