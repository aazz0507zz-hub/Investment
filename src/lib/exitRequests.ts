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

export type ExitRequestStatus =
  | 'new'
  | 'contacted'
  | 'under_review'
  | 'approved_estimate'
  | 'rejected'
  | 'closed';

export interface ExitRequestData {
  fullName: string;
  mobile: string;
  email?: string;
  shares: number;
  investmentAmount: number;
  ownershipPercentage: number;
  selectedExitYear: number;
  selectedScenario: string;
  occupancy: number;
  dailyPriceChange: number;
  maintenanceIncrease: number;
  insuranceIncrease: number;
  financingEnabled: boolean;
  financingPercentage: number;
  distributionsEnabled: boolean;
  distributionPercentage: number;
  exitDiscountPercentage: number;
  estimatedCompanyNAV: number;
  grossExitValue: number;
  estimatedExitValue: number;
  originalCapital: number;
  estimatedProfitLoss: number;
  estimatedROI: number;
  notes?: string;
}

export interface ExitRequest extends ExitRequestData {
  id: string;
  status: ExitRequestStatus;
  createdAt: Date;
}

function toExitRequest(id: string, data: DocumentData): ExitRequest {
  return {
    id,
    fullName: data.fullName ?? '',
    mobile: data.mobile ?? '',
    email: data.email ?? '',
    shares: data.shares ?? 0,
    investmentAmount: data.investmentAmount ?? 0,
    ownershipPercentage: data.ownershipPercentage ?? 0,
    selectedExitYear: data.selectedExitYear ?? 1,
    selectedScenario: data.selectedScenario ?? '',
    occupancy: data.occupancy ?? 51,
    dailyPriceChange: data.dailyPriceChange ?? 0,
    maintenanceIncrease: data.maintenanceIncrease ?? 0,
    insuranceIncrease: data.insuranceIncrease ?? 0,
    financingEnabled: data.financingEnabled ?? false,
    financingPercentage: data.financingPercentage ?? 0,
    distributionsEnabled: data.distributionsEnabled ?? true,
    distributionPercentage: data.distributionPercentage ?? 50,
    exitDiscountPercentage: data.exitDiscountPercentage ?? 10,
    estimatedCompanyNAV: data.estimatedCompanyNAV ?? 0,
    grossExitValue: data.grossExitValue ?? 0,
    estimatedExitValue: data.estimatedExitValue ?? 0,
    originalCapital: data.originalCapital ?? 0,
    estimatedProfitLoss: data.estimatedProfitLoss ?? 0,
    estimatedROI: data.estimatedROI ?? 0,
    notes: data.notes ?? '',
    status: data.status ?? 'new',
    createdAt: data.createdAt?.toDate?.() ?? new Date(),
  };
}

export async function createExitRequest(
  data: ExitRequestData
): Promise<{ success: boolean; id?: string; error?: string }> {
  if (!isFirebaseReady || !db) {
    return { success: false, error: 'Firebase غير متاح حالياً' };
  }
  try {
    const ref = await addDoc(collection(db, 'exitRequests'), {
      ...data,
      status: 'new' as ExitRequestStatus,
      createdAt: serverTimestamp(),
    });
    return { success: true, id: ref.id };
  } catch (err) {
    console.error('[Firestore] createExitRequest:', err);
    return { success: false, error: 'تعذر إرسال طلب التخارج. حاول مرة أخرى لاحقًا.' };
  }
}

export async function getExitRequests(): Promise<{
  success: boolean;
  data?: ExitRequest[];
  error?: string;
}> {
  if (!isFirebaseReady || !db) {
    return { success: false, error: 'Firebase غير متاح حالياً' };
  }
  try {
    const q = query(collection(db, 'exitRequests'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    const data = snap.docs.map((d) => toExitRequest(d.id, d.data()));
    return { success: true, data };
  } catch (err) {
    console.error('[Firestore] getExitRequests:', err);
    return {
      success: false,
      error:
        'قراءة الطلبات غير مفعلة حاليًا من قاعدة البيانات. فعّل صلاحيات الإدارة أو Firebase Auth.',
    };
  }
}

export async function updateExitRequestStatus(
  id: string,
  status: ExitRequestStatus
): Promise<{ success: boolean; error?: string }> {
  if (!isFirebaseReady || !db) {
    return { success: false, error: 'Firebase غير متاح حالياً' };
  }
  try {
    await updateDoc(doc(db, 'exitRequests', id), { status });
    return { success: true };
  } catch (err) {
    console.error('[Firestore] updateExitRequestStatus:', err);
    return { success: false, error: 'فشل في تحديث الحالة' };
  }
}
