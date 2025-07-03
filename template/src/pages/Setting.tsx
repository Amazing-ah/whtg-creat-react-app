import { useQuery } from '@tanstack/react-query';

interface SettingsData {
  theme: string;
  language: string;
}

function Setting() {
  // React Query 数据获取
  const { data: settings, isLoading } = useQuery<SettingsData>({
    queryKey: ['settings'],
    queryFn: async (): Promise<SettingsData> => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      return { theme: 'light', language: 'zh-CN' };
    },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">设置</h1>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">当前设置</h2>
        {isLoading ? (
          <div>设置加载中...</div>
        ) : settings ? (
          <div>
            <p>主题: {settings.theme}</p>
            <p>语言: {settings.language}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Setting;
