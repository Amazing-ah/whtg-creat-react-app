import { Outlet } from 'react-router';

import { Link, useLocation } from 'react-router';

const RootLayout = () => {
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home', exact: true },
    { to: '/setting', label: 'Setting' },
    { to: '/login', label: 'Login' },
    { to: '/register', label: 'Register' },
  ];

  return (
    <>
      <nav style={{ display: 'flex', gap: 16, margin: 20 }}>
        {navLinks.map(link => {
          const isActive = link.exact
            ? location.pathname === link.to
            : location.pathname.startsWith(link.to);
          return (
            <Link
              key={link.to}
              to={link.to}
              style={{
                padding: '4px 12px',
                borderRadius: 4,
                textDecoration: 'none',
                color: isActive ? '#6366f1' : '#333',
                borderBottom: isActive
                  ? '2px solid #6366f1'
                  : '2px solid transparent',
                fontWeight: isActive ? 700 : 400,
                background: isActive ? '#f5f7ff' : undefined,
                transition: 'all 0.2s',
              }}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
      <Outlet />
      <div>hello,world--- end</div>
    </>
  );
};

export default RootLayout;
