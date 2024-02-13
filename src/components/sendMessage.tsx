import { useRef } from 'react';

const SendMessage = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    try {
      const input = inputRef.current?.value;
      if (!input) return;

      console.log(input);
      // ... do something

      inputRef.current!.value = '';
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
