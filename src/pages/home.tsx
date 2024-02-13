import { useRecoilValue } from 'recoil';

import Auth from '../components/auth';
import { authAtom } from '../atoms/auth';
import ChatHistory from '../components/chat';
import SendMessage from '../components/sendMessage';

const Home = () => {
  const { isAuthenticated } = useRecoilValue(authAtom);

  if (!isAuthenticated) {
    return (
      <div className='h-screen flex px-2 items-center justify-center py-2 mx-auto max-w-3xl'>
        <Auth />
      </div>
    );
  }

  return (
    <div className='h-screen flex flex-col px-2 max-w-3xl mx-auto justify-between py-2'>
      <ChatHistory />
      <SendMessage />
    </div>
  );
};

export default Home;
