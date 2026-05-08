import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  serverTimestamp,
  query,
  orderBy,
  type DocumentData,
} from 'firebase/firestore';
import { db, isFirebaseReady } from './firebase';

export type RequestStatus = 'pending' | 'reviewed' | 'approved' | 'rejected';

export interface InvestmentRequestData {
  fullName: string;
  phone: string;
  email?: string;
  referralSource: string;
  shares: number;
  amount: number;
  calculationMethod: 'shares' | 'amount';
  notes?: string;
  riskAcknowledged: boolean;
}

export interface InvestmentRequest extends InvestmentRequestData {
  id: string;
  status: RequestStatus;
  createdAt: Date;
}

function toRequest(id: string, data: DocumentData): InvestmentRequest {
  return {
    id,
    fullName: data.fullName ?? '',
    phone: data.phone ?? '',
    email: data.email ?? '',
    referralSource: data.referralSource ?? '',
    shares: data.shares ?? 0,
    amount: data.amount ?? 0,
    calculationMethod: data.calculationMethod ?? 'shares',
    notes: data.notes ?? '',
    riskAcknowledged: data.riskAcknowledged ?? false,
    status: data.status ?? 'pending',
    createdAt: data.createdAt?.toDate?.() ?? new Date(),
  };
}

export async function createInvestmentRequest(
  data: InvestmentRequestData
): Promise<{ success: boolean; id?: string; error?: string }> {
  if (!isFirebaseReady || !db) {
    return { success: false, error: 'Firebase غير متاح حالياً' };
  }
  try {
    const ref = await addDoc(collection(db, 'investmentRequests'), {
      ...data,
      status: 'pending' as RequestStatus,
      createdAt: serverTimestamp(),
    });
    return { success: true, id: ref.id };
  } catch (err) {
    console.error('[Firestore] createInvestmentRequest:', err);
    return { success: false, error: 'فشل في إرسال الطلب، يرجى المحاولة لاحقاً' };
  }
}

export async function getInvestmentRequests(): Promise<{
  success: boolean;
  data?: InvestmentRequest[];
  error?: string;
}> {
  if (!isFirebaseReady || !db) {
    return { success: false, error: 'Firebase غير متاح حالياً' };
  }
  try {
    const q = query(
      collection(db, 'investmentRequests'),
      orderBy('createdAt', 'desc')
    );
    const snap = await getDocs(q);
    const data = snap.docs.map((d) => toRequest(d.id, d.data()));
    return { success: true, data };
  } catch (err) {
    console.error('[Firestore] getInvestmentRequests:', err);
    return {
      success: false,
      error:
        'لا يمكن قراءة الطلبات (قواعد Firestore تمنع القراءة في وضع التجريب)',
    };
  }
}

export async function updateInvestmentRequestStatus(
  id: string,
  status: RequestStatus
): Promise<{ success: boolean; error?: string }> {
  if (!isFirebaseReady || !db) {
    return { success: false, error: 'Firebase غير متاح حالياً' };
  }
  try {
    await updateDoc(doc(db, 'investmentRequests', id), { status });
    return { success: true };
  } catch (err) {
    console.error('[Firestore] updateInvestmentRequestStatus:', err);
    return { success: false, error: 'فشل في تحديث الحالة' };
  }
}
