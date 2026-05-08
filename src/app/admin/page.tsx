'use client';

import { useState, useEffect } from 'react';
import {
  getInvestmentRequests,
  updateInvestmentRequestStatus,
  type InvestmentRequest,
  type RequestStatus,
} from '@/lib/investmentRequests';
import { formatCurrency } from '@/lib/utils';

const CORRECT_PASSCODE = process.env.NEXT_PUBLIC_ADMIN_PASSCODE ?? 'Az12345';

const STATUS_LABELS: Record<RequestStatus, string> = {
  pending: 'قيد الانتظار',
  reviewed: 'تمت المراجعة',
  approved: 'موافق عليه',
  rejected: 'مرفوض',
};

const STATUS_COLORS: Record<RequestStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  reviewed: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  approved: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  rejected: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
};

export default function AdminPage() {
  const [passcode, setPasscode] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');

  const [requests, setRequests] = useState<InvestmentRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (passcode === CORRECT_PASSCODE) {
      setAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('رمز المرور غير صحيح');
    }
  }

  useEffect(() => {
    if (!authenticated) return;
    setLoading(true);
    getInvestmentRequests().then((res) => {
      setLoading(false);
      if (res.success && res.data) {
        setRequests(res.data);
      } else {
        setFetchError(res.error ?? 'فشل في جلب البيانات');
      }
    });
  }, [authenticated]);

  async function handleStatusChange(id: string, status: RequestStatus) {
    setUpdatingId(id);
    const res = await updateInvestmentRequestStatus(id, status);
    if (res.success) {
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
    }
    setUpdatingId(null);
  }

  if (!authenticated) {
    return (
      <div className="max-w-sm mx-auto mt-24 space-y-6">
        <h1 className="text-2xl font-bold text-center text-[var(--text-base)]">لوحة الإدارة</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-[var(--text-base)]">
              رمز المرور
            </label>
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full border border-[var(--border)] rounded-lg px-3 py-2 bg-[var(--card-bg)] text-[var(--text-base)] focus:outline-none focus:ring-2 focus:ring-forest/50"
              placeholder="أدخل رمز المرور"
              autoFocus
            />
            {authError && (
              <p className="text-red-500 text-sm mt-1">{authError}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-forest hover:bg-forest-light text-ivory font-bold py-2.5 rounded-lg transition-colors"
          >
            دخول
          </button>
        </form>
        <p className="text-center text-xs text-[var(--text-muted)]">
          للمسؤولين فقط — هذا النظام لعرض طلبات الاستثمار
        </p>
      </div>
    );
  }

  const summary = {
    total: requests.length,
    pending: requests.filter((r) => r.status === 'pending').length,
    approved: requests.filter((r) => r.status === 'approved').length,
    totalAmount: requests
      .filter((r) => r.status === 'approved')
      .reduce((s, r) => s + r.amount, 0),
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[var(--text-base)]">لوحة الإدارة</h1>
        <button
          onClick={() => setAuthenticated(false)}
          className="text-sm text-[var(--text-muted)] hover:text-[var(--text-base)]"
        >
          خروج
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'إجمالي الطلبات', value: summary.total },
          { label: 'قيد الانتظار', value: summary.pending },
          { label: 'موافق عليهم', value: summary.approved },
          { label: 'مبالغ موافق عليها', value: formatCurrency(summary.totalAmount) },
        ].map((s) => (
          <div
            key={s.label}
            className="border border-[var(--border)] rounded-xl p-4 bg-[var(--card-bg)] text-center"
          >
            <div className="text-xl font-extrabold text-gold">{s.value}</div>
            <div className="text-xs text-[var(--text-muted)] mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      {loading && (
        <p className="text-[var(--text-muted)] text-center py-8">جارٍ التحميل...</p>
      )}

      {fetchError && (
        <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl p-4 text-red-700 dark:text-red-400 text-sm">
          <p className="font-bold mb-1">تعذّر جلب البيانات</p>
          <p>{fetchError}</p>
          <p className="mt-2 text-xs opacity-70">
            ملاحظة: قواعد Firestore الحالية تمنع القراءة في وضع التجريب.
            لتفعيل لوحة الإدارة بالكامل، يجب تعديل Firestore rules للسماح للمسؤولين بالقراءة.
          </p>
        </div>
      )}

      {!loading && !fetchError && requests.length === 0 && (
        <p className="text-[var(--text-muted)] text-center py-8">لا توجد طلبات بعد</p>
      )}

      {!loading && requests.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
          <table className="w-full text-sm">
            <thead className="bg-[var(--surface-alt)]">
              <tr>
                {['الاسم', 'الجوال', 'الأسهم', 'المبلغ', 'المصدر', 'التاريخ', 'الحالة', 'تعديل'].map(
                  (h) => (
                    <th key={h} className="px-4 py-3 text-right font-semibold text-[var(--text-base)]">
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] bg-[var(--card-bg)]">
              {requests.map((r) => (
                <tr key={r.id} className="hover:bg-[var(--surface-alt)] transition-colors">
                  <td className="px-4 py-3 font-medium text-[var(--text-base)]">{r.fullName}</td>
                  <td className="px-4 py-3 text-[var(--text-muted)]" dir="ltr">{r.phone}</td>
                  <td className="px-4 py-3 text-[var(--text-muted)]">{r.shares}</td>
                  <td className="px-4 py-3 text-[var(--text-muted)]">{formatCurrency(r.amount)}</td>
                  <td className="px-4 py-3 text-[var(--text-muted)]">{r.referralSource}</td>
                  <td className="px-4 py-3 text-[var(--text-muted)]">
                    {r.createdAt.toLocaleDateString('ar-SA')}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[r.status]}`}>
                      {STATUS_LABELS[r.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={r.status}
                      disabled={updatingId === r.id}
                      onChange={(e) =>
                        handleStatusChange(r.id, e.target.value as RequestStatus)
                      }
                      className="border border-[var(--border)] rounded-md px-2 py-1 text-xs bg-[var(--card-bg)] text-[var(--text-base)]"
                    >
                      {(Object.keys(STATUS_LABELS) as RequestStatus[]).map((s) => (
                        <option key={s} value={s}>
                          {STATUS_LABELS[s]}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
