import { useState } from 'react';

import VerifyOtp from './verifyOtp';
import CheckPhoneNumber from './checkPhoneNumber';

const stages = ['check-phone-number', 'verify-otp'] as const;

const Auth = () => {
  const [phone, setPhone] = useState<string>('');
  const [stage, setStage] =
    useState<(typeof stages)[number]>('check-phone-number');

  const toggleState = () => {
    if (stage === 'check-phone-number') {
      setStage('verify-otp');
    } else {
      setStage('check-phone-number');
    }
  };

  if (stage === 'check-phone-number') {
    return <CheckPhoneNumber {...{ toggleState, setPhone }} />;
  } else if (stage === 'verify-otp') {
    return <VerifyOtp {...{ toggleState, phone }} />;
  }

  return null;
};

export default Auth;
