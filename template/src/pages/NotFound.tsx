import { Link } from 'react-router';

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-400">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mt-4">
          页面未找到
        </h2>
        <p className="text-gray-500 mt-2">抱歉，您访问的页面不存在。</p>
        <Link
          to="/"
          className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
