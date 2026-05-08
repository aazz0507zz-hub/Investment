'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';

export interface InvestorDraft {
  fullName: string;
  phone: string;
  email: string;
  referralSource: string;
  shares: number;
  amount: number;
  calculationMethod: 'shares' | 'amount';
  notes: string;
  riskAcknowledged: boolean;
}

const STORAGE_KEY = 'sanad_investor_draft';

const defaultDraft: InvestorDraft = {
  fullName: '',
  phone: '',
  email: '',
  referralSource: '',
  shares: 1,
  amount: 775,
  calculationMethod: 'shares',
  notes: '',
  riskAcknowledged: false,
};

interface InvestorContextValue {
  draft: InvestorDraft;
  updateDraft: (partial: Partial<InvestorDraft>) => void;
  resetDraft: () => void;
  isReady: boolean;
}

const InvestorContext = createContext<InvestorContextValue>({
  draft: defaultDraft,
  updateDraft: () => {},
  resetDraft: () => {},
  isReady: false,
});

export function InvestorProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<InvestorDraft>(defaultDraft);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<InvestorDraft>;
        setDraft((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // ignore parse errors
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch {
      // ignore storage errors
    }
  }, [draft, isReady]);

  const updateDraft = useCallback((partial: Partial<InvestorDraft>) => {
    setDraft((prev) => ({ ...prev, ...partial }));
  }, []);

  const resetDraft = useCallback(() => {
    setDraft(defaultDraft);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  return (
    <InvestorContext.Provider value={{ draft, updateDraft, resetDraft, isReady }}>
      {children}
    </InvestorContext.Provider>
  );
}

export function useInvestor() {
  return useContext(InvestorContext);
}
