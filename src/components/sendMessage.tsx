import { useEffect, useRef } from 'react';

import { socket } from '../utils/socket';

const SendMessage = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    socket.connect();
    socket.on('message', (message: string) => {
      console.log(message);
    });
    socket.on('error', (error: any) => {
      console.log(error);
    });

    socket.on('connect_error', (error: any) => {
      console.log(error);
    });

    return () => {
      console.log('disconnecting socket');
      socket.disconnect();
    };
  }, []);

  const handleClick = () => {
    try {
      const messageText = inputRef.current?.value;
      if (!messageText) return;
      console.log('Sending message', messageText);
      // ... do something
      // inputRef.current!.value = '';
      socket.emit('new-message', {
        message: messageText,
        sender: 'user1',
        receiver: 'user2',
      });
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <div className='flex gap-2'>
      <input
        ref={inputRef}
        className='border-2 rounded-md px-2 py-2 flex-grow'
      />
      <button onClick={handleClick} className='bg-red-200 rounded-md px-4 py-2'>
        Send
      </button>

      <div className=''></div>
    </div>
  );
};

export default SendMessage;
