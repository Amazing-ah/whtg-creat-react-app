import { Outlet } from 'react-router';

const RootLayout = () => {
  return (
    <>
      <div>hello,world</div>

      <Outlet />
      <div>hello,world--- end</div>
    </>
  );
};

export default RootLayout;
