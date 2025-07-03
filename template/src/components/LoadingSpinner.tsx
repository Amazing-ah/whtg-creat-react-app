import type { LoadingSpinnerProps } from '../types/loading';

export default function LoadingSpinner({
  text = '加载中...',
  size = 'md',
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="flex items-center space-x-3">
        <div
          className={`animate-spin rounded-full border-b-2 border-blue-600 ${sizeClasses[size]}`}
        ></div>
        <span className="text-gray-600">{text}</span>
      </div>
    </div>
  );
}
