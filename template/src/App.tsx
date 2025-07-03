import { Routes, Route } from 'react-router';
import { lazy, Suspense } from 'react';
import RootLayout from '@/components/layout/rootLayout';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import Register from '@/pages/Register';
import SuspenseLoading from '@/components/SuspenseLoading';
const Setting = lazy(() => import('@/pages/Setting'));

function App() {
  return (
    <Suspense fallback={<SuspenseLoading />}>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="setting" element={<Setting />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
