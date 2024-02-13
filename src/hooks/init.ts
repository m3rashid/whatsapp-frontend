import { useEffect, useState } from 'react';
import type { User } from '../atoms/auth';
import { services } from '../utils/api';

export type InitRes = {
  message: string;
  token: string;
  user: User;
};

function useInit() {
  const [initRes, setInitRes] = useState<InitRes | null>(null);
  const [loading, setLoading] = useState(false);

  async function init() {
    try {
      setLoading(true);
      const res = await services.init();
      setInitRes(res?.data);
      console.log(res);
    } catch (err: any) {
      console.log(err);
      setInitRes(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return {
    init,
    initRes,
    loading,
  };
}

export default useInit;
