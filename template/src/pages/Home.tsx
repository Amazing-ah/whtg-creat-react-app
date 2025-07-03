import { useQuery } from '@tanstack/react-query';

interface UserData {
  name: string;
  email: string;
}

function Home() {
  // react-query 局部 loading
  const { data: userData, isLoading: isUserDataLoading } = useQuery<UserData>({
    queryKey: ['userData'],
    queryFn: async (): Promise<UserData> => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      return { name: '用户', email: 'user@example.com' };
    },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">首页</h1>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">用户信息</h2>
        {isUserDataLoading ? (
          <div>加载用户数据中...</div>
        ) : (
          <div>
            <p>姓名: {userData?.name}</p>
            <p>邮箱: {userData?.email}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
