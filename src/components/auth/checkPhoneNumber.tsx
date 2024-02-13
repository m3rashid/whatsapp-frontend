import { useRef, useState } from 'react';
import { services } from '../../utils/api';

type CheckPhoneNumberProps = {
  toggleState: () => void;
  setPhone: (phone: string) => void;
};

const CheckPhoneNumber: React.FC<CheckPhoneNumberProps> = (props) => {
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const phone = phoneNumberRef.current?.value;
      if (!phone) return;

      const res = await services.checkPhoneNumber({ data: { phone } });
      console.log(res);
      // !TODO

      props.setPhone(phone);
      phoneNumberRef.current.value = '';
      props.toggleState();
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className='text-center mb-4'>Enter your Phone Number</h1>

      <div className='flex gap-2'>
        <input
          ref={phoneNumberRef}
          className='border-2 rounded-md px-2 py-2 flex-grow'
        />

        <button
          disabled={loading}
          onClick={handleSubmit}
          className='bg-red-200 rounded-md px-4 py-2'
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CheckPhoneNumber;
