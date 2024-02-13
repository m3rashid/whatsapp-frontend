import { RecoilRoot } from 'recoil';

import Home from './pages/home';
import useInit from './hooks/init';
import { authAtom } from './atoms/auth';

function App() {
  const { initRes, loading } = useInit();

  if (loading) {
    return (
      <div className='h-screen flex items-center justify-center'>
        <h1 className='text-3xl font-bold'>Loading ...</h1>
      </div>
    );
  }

  return (
    <RecoilRoot
      initializeState={({ set }) => {
        set(authAtom, {
          isAuthenticated: !!initRes,
          user: initRes?.user || null,
        });
      }}
    >
      <Home />
    </RecoilRoot>
  );
}

export default App;
