import { useRef, useState } from 'react';
import { services } from '../../utils/api';
import { useSetRecoilState } from 'recoil';
import { authAtom } from '../../atoms/auth';

type VerifyOtpProps = {
  toggleState: () => void;
  phone: string;
};

const VerifyOtp: React.FC<VerifyOtpProps> = (props) => {
  const otpRef = useRef<HTMLInputElement>(null);
  const setAuth = useSetRecoilState(authAtom);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const otp = otpRef.current?.value;
      if (!otp) return;

      const res = await services.verifyOtp({
        data: { otp, phone: props.phone },
      });
      console.log(res);

      // !TODO
      setAuth({ isAuthenticated: true, user: res?.data.user });
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className='text-center mb-4'>Enter the OTP sent to your phone</h1>

      <div className='flex gap-2'>
        <input
          ref={otpRef}
          className='border-2 rounded-md px-2 py-2 flex-grow'
        />

        <button
          disabled={loading}
          onClick={handleSubmit}
          className='bg-red-200 rounded-md px-4 py-2'
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default VerifyOtp;
