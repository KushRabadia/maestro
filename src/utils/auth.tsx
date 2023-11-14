// utils/auth.ts
import { useEffect, useState } from 'react';
import { Storage } from '@/types';

export const useAuthToken = ({ refresh }: { refresh?: boolean } = {}): Storage => {
  const [token, setToken] = useState<string | null>(null);
  const [expiryDate, setExpiryDate] = useState<string | null>(null);

  useEffect(() => {
    // Get the token from localStorage
    const storedToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const storedExpiryDate = typeof window !== 'undefined' ? localStorage.getItem('expiryDate') : null;
    setToken(storedToken);
    setExpiryDate(storedExpiryDate);
  }, [refresh]);

  return { token: token, expiryDate: expiryDate };
};
