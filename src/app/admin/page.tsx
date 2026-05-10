'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  getInvestmentRequests,
  updateInvestmentRequestStatus,
  type InvestmentRequest,
  type RequestStatus,
} from '@/lib/investmentRequests';
import {
  getExitRequests,
  updateExitRequestStatus,
  type ExitRequest,
  type ExitRequestStatus,
} from '@/lib/exitRequests';
import { formatCurrency } from '@/lib/utils';

// Client-side passcode — demo only. Use Firebase Auth for production.
const CORRECT_PASSCODE = process.env.NEXT_PUBLIC_ADMIN_PASSCODE ?? 'Az12345';

type TabId = 'investment' | 'exit';

const INV_STATUS_LABELS: Record<RequestStatus, string> = {
  pending: 'جديد',
  reviewed: 'تمت المراجعة',
  approved: 'موافق عليه',
  rejected: 'مرفوض',
};

const EXIT_STATUS_LABELS: Record<ExitRequestStatus, string> = {
  new: 'جديد',
  contacted: 'تم التواصل',
  under_review: 'قيد المراجعة',
  approved_estimate: 'تقدير موافق',
  rejected: 'مرفوض',
  closed: 'مغلق',
};

const STATUS_COLOR_MAP: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  reviewed: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  approved: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  rejected: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  new: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  contacted: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  under_review: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  approved_estimate: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  closed: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300',
};

function exportCSV(rows: object[], filename: string) {
  if (rows.length === 0) return;
  const keys = Object.keys(rows[0]);
  const csv = [
    keys.join(','),
    ...rows.map((r) =>
      keys.map((k) => `"${String((r as Record<string, unknown>)[k] ?? '').replace(/"/g, '""')}"`).join(',')
    ),
  ].join('\n');
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminPage() {
  const [passcode, setPasscode] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<TabId>('investment');

  // Investment requests
  const [invRequests, setInvRequests] = useState<InvestmentRequest[]>([]);
  const [invLoading, setInvLoading] = useState(false);
  const [invError, setInvError] = useState('');
  const [invSearch, setInvSearch] = useState('');
  const [invStatusFilter, setInvStatusFilter] = useState<string>('all');
  const [invUpdating, setInvUpdating] = useState<string | null>(null);

  // Exit requests
  const [exitRequests, setExitRequests] = useState<ExitRequest[]>([]);
  const [exitLoading, setExitLoading] = useState(false);
  const [exitError, setExitError] = useState('');
  const [exitSearch, setExitSearch] = useState('');
  const [exitStatusFilter, setExitStatusFilter] = useState<string>('all');
  const [exitUpdating, setExitUpdating] = useState<string | null>(null);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (passcode === CORRECT_PASSCODE) {
      setAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('رمز المرور غير صحيح');
    }
  }

  const loadInvestmentRequests = useCallback(async () => {
    setInvLoading(true);
    const res = await getInvestmentRequests();
    setInvLoading(false);
    if (res.success && res.data) {
      setInvRequests(res.data);
    } else {
      setInvError(res.error ?? 'فشل في جلب البيانات');
    }
  }, []);

  const loadExitRequests = useCallback(async () => {
    setExitLoading(true);
    const res = await getExitRequests();
    setExitLoading(false);
    if (res.success && res.data) {
      setExitRequests(res.data);
    } else {
      setExitError(res.error ?? 'فشل في جلب البيانات');
    }
  }, []);

  useEffect(() => {
    if (!authenticated) return;
    loadInvestmentRequests();
    loadExitRequests();
  }, [authenticated, loadInvestmentRequests, loadExitRequests]);

  async function handleInvStatusChange(id: string, status: RequestStatus) {
    setInvUpdating(id);
    const res = await updateInvestmentRequestStatus(id, status);
    if (res.success) {
      setInvRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    }
    setInvUpdating(null);
  }

  async function handleExitStatusChange(id: string, status: ExitRequestStatus) {
    setExitUpdating(id);
    const res = await updateExitRequestStatus(id, status);
    if (res.success) {
      setExitRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    }
    setExitUpdating(null);
  }

  // Filtered
  const filteredInv = invRequests.filter((r) => {
    const matchSearch = !invSearch || r.fullName.includes(invSearch) || r.phone.includes(invSearch);
    const matchStatus = invStatusFilter === 'all' || r.status === invStatusFilter;
    return matchSearch && matchStatus;
  });

  const filteredExit = exitRequests.filter((r) => {
    const matchSearch = !exitSearch || r.fullName.includes(exitSearch) || r.mobile.includes(exitSearch);
    const matchStatus = exitStatusFilter === 'all' || r.status === exitStatusFilter;
    return matchSearch && matchStatus;
  });

  if (!authenticated) {
    return (
      <div className="max-w-sm mx-auto mt-24 space-y-6 px-4">
        <h1 className="text-2xl font-bold text-center text-[var(--text-base)]">لوحة الإدارة</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-[var(--text-base)]">رمز المرور</label>
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full border border-[var(--border)] rounded-lg px-3 py-2 bg-[var(--card-bg)] text-[var(--text-base)] focus:outline-none focus:ring-2 focus:ring-forest/50"
              placeholder="أدخل رمز المرور"
              autoFocus
            />
            {authError && <p className="text-red-500 text-sm mt-1">{authError}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-forest hover:bg-forest-light text-ivory font-bold py-2.5 rounded-lg transition-colors"
          >
            دخول
          </button>
        </form>
        <p className="text-center text-xs text-[var(--text-muted)]">
          للمسؤولين فقط — رمز المرور للعرض التجريبي فقط وليس آمنًا للإنتاج
        </p>
      </div>
    );
  }

  // Investment summary
  const invSummary = {
    total: invRequests.length,
    newCount: invRequests.filter((r) => r.status === 'pending').length,
    approved: invRequests.filter((r) => r.status === 'approved').length,
    totalAmount: invRequests.filter((r) => r.status === 'approved').reduce((s, r) => s + r.amount, 0),
    totalShares: invRequests.filter((r) => r.status === 'approved').reduce((s, r) => s + r.shares, 0),
  };

  // Exit summary
  const exitSummary = {
    total: exitRequests.length,
    newCount: exitRequests.filter((r) => r.status === 'new').length,
    totalEstimatedExit: exitRequests.reduce((s, r) => s + r.estimatedExitValue, 0),
    avgROI: exitRequests.length > 0
      ? exitRequests.reduce((s, r) => s + r.estimatedROI, 0) / exitRequests.length
      : 0,
  };

  const FIRESTORE_NOTE =
    'قراءة الطلبات غير مفعلة حاليًا من قاعدة البيانات. فعّل صلاحيات الإدارة أو Firebase Auth.';

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[var(--text-base)]">لوحة الإدارة</h1>
        <button
          onClick={() => setAuthenticated(false)}
          className="text-sm text-[var(--text-muted)] hover:text-[var(--text-base)] border border-[var(--border)] px-3 py-1.5 rounded-md"
        >
          خروج
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[var(--border)]">
        {([
          { id: 'investment', label: 'طلبات الاستثمار', count: invSummary.total },
          { id: 'exit', label: 'طلبات التخارج التقديرية', count: exitSummary.total },
        ] as { id: TabId; label: string; count: number }[]).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === tab.id
                ? 'border-forest text-forest dark:text-green-400'
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-base)]'
            }`}
          >
            {tab.label}
            {tab.count > 0 && (
              <span className="bg-gold/20 text-gold text-xs px-1.5 py-0.5 rounded-full">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* INVESTMENT REQUESTS TAB */}
      {activeTab === 'investment' && (
        <div className="space-y-6">
          {/* Summary cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {[
              { label: 'إجمالي الطلبات', value: invSummary.total },
              { label: 'جديدة', value: invSummary.newCount },
              { label: 'موافق عليها', value: invSummary.approved },
              { label: 'مبالغ الموافقة', value: formatCurrency(invSummary.totalAmount) },
              { label: 'أسهم الموافقة', value: invSummary.totalShares.toLocaleString('ar-SA') },
            ].map((s) => (
              <div key={s.label} className="border border-[var(--border)] rounded-xl p-4 bg-[var(--card-bg)] text-center">
                <div className="text-xl font-extrabold text-gold">{s.value}</div>
                <div className="text-xs text-[var(--text-muted)] mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Filters + export */}
          <div className="flex flex-wrap gap-3 items-center">
            <input
              value={invSearch}
              onChange={(e) => setInvSearch(e.target.value)}
              className="border border-[var(--border)] rounded-lg px-3 py-2 text-sm bg-[var(--card-bg)] text-[var(--text-base)] w-48 focus:outline-none"
              placeholder="بحث بالاسم أو الجوال"
            />
            <select
              value={invStatusFilter}
              onChange={(e) => setInvStatusFilter(e.target.value)}
              className="border border-[var(--border)] rounded-lg px-3 py-2 text-sm bg-[var(--card-bg)] text-[var(--text-base)] focus:outline-none"
            >
              <option value="all">كل الحالات</option>
              {Object.entries(INV_STATUS_LABELS).map(([v, l]) => (
                <option key={v} value={v}>{l}</option>
              ))}
            </select>
            <button
              onClick={() => exportCSV(filteredInv.map((r) => ({ ...r, createdAt: r.createdAt.toLocaleDateString('ar-SA') })), 'investment-requests.csv')}
              className="border border-[var(--border)] rounded-lg px-3 py-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-base)] hover:bg-[var(--surface-alt)] transition-colors"
            >
              تصدير CSV
            </button>
          </div>

          {invLoading && <p className="text-[var(--text-muted)] text-center py-8">جارٍ التحميل...</p>}

          {invError && (
            <div className="bg-[var(--surface-alt)] border border-[var(--border)] rounded-xl p-4 text-sm text-[var(--text-muted)]">
              <p className="font-bold mb-1">⚠️ {FIRESTORE_NOTE}</p>
              <p className="text-xs opacity-70">{invError}</p>
            </div>
          )}

          {!invLoading && !invError && filteredInv.length === 0 && (
            <p className="text-[var(--text-muted)] text-center py-8">لا توجد طلبات</p>
          )}

          {!invLoading && filteredInv.length > 0 && (
            <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
              <table className="w-full text-sm">
                <thead className="bg-[var(--surface-alt)]">
                  <tr>
                    {['الاسم', 'الجوال', 'الأسهم', 'المبلغ', 'المصدر', 'التاريخ', 'الحالة', 'تعديل'].map((h) => (
                      <th key={h} className="px-3 py-3 text-right font-semibold text-[var(--text-base)] whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)] bg-[var(--card-bg)]">
                  {filteredInv.map((r) => (
                    <tr key={r.id} className="hover:bg-[var(--surface-alt)] transition-colors">
                      <td className="px-3 py-2.5 font-medium text-[var(--text-base)]">{r.fullName}</td>
                      <td className="px-3 py-2.5 text-[var(--text-muted)]" dir="ltr">{r.phone}</td>
                      <td className="px-3 py-2.5 text-[var(--text-muted)]">{r.shares}</td>
                      <td className="px-3 py-2.5 text-[var(--text-muted)]">{formatCurrency(r.amount)}</td>
                      <td className="px-3 py-2.5 text-[var(--text-muted)]">{r.referralSource}</td>
                      <td className="px-3 py-2.5 text-[var(--text-muted)]">{r.createdAt.toLocaleDateString('ar-SA')}</td>
                      <td className="px-3 py-2.5">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLOR_MAP[r.status]}`}>
                          {INV_STATUS_LABELS[r.status]}
                        </span>
                      </td>
                      <td className="px-3 py-2.5">
                        <select
                          value={r.status}
                          disabled={invUpdating === r.id}
                          onChange={(e) => handleInvStatusChange(r.id, e.target.value as RequestStatus)}
                          className="border border-[var(--border)] rounded-md px-2 py-1 text-xs bg-[var(--card-bg)] text-[var(--text-base)]"
                        >
                          {Object.entries(INV_STATUS_LABELS).map(([v, l]) => (
                            <option key={v} value={v}>{l}</option>
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
      )}

      {/* EXIT REQUESTS TAB */}
      {activeTab === 'exit' && (
        <div className="space-y-6">
          {/* Summary cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'إجمالي الطلبات', value: exitSummary.total },
              { label: 'جديدة', value: exitSummary.newCount },
              { label: 'إجمالي القيمة التقديرية', value: formatCurrency(Math.round(exitSummary.totalEstimatedExit)) },
              { label: 'متوسط العائد التقديري', value: exitSummary.avgROI.toFixed(1) + '٪' },
            ].map((s) => (
              <div key={s.label} className="border border-[var(--border)] rounded-xl p-4 bg-[var(--card-bg)] text-center">
                <div className="text-xl font-extrabold text-gold">{s.value}</div>
                <div className="text-xs text-[var(--text-muted)] mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Filters + export */}
          <div className="flex flex-wrap gap-3 items-center">
            <input
              value={exitSearch}
              onChange={(e) => setExitSearch(e.target.value)}
              className="border border-[var(--border)] rounded-lg px-3 py-2 text-sm bg-[var(--card-bg)] text-[var(--text-base)] w-48 focus:outline-none"
              placeholder="بحث بالاسم أو الجوال"
            />
            <select
              value={exitStatusFilter}
              onChange={(e) => setExitStatusFilter(e.target.value)}
              className="border border-[var(--border)] rounded-lg px-3 py-2 text-sm bg-[var(--card-bg)] text-[var(--text-base)] focus:outline-none"
            >
              <option value="all">كل الحالات</option>
              {Object.entries(EXIT_STATUS_LABELS).map(([v, l]) => (
                <option key={v} value={v}>{l}</option>
              ))}
            </select>
            <button
              onClick={() =>
                exportCSV(
                  filteredExit.map((r) => ({ ...r, createdAt: r.createdAt.toLocaleDateString('ar-SA') })),
                  'exit-requests.csv'
                )
              }
              className="border border-[var(--border)] rounded-lg px-3 py-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-base)] hover:bg-[var(--surface-alt)] transition-colors"
            >
              تصدير CSV
            </button>
          </div>

          {exitLoading && <p className="text-[var(--text-muted)] text-center py-8">جارٍ التحميل...</p>}

          {exitError && (
            <div className="bg-[var(--surface-alt)] border border-[var(--border)] rounded-xl p-4 text-sm text-[var(--text-muted)]">
              <p className="font-bold mb-1">⚠️ {FIRESTORE_NOTE}</p>
              <p className="text-xs opacity-70">{exitError}</p>
            </div>
          )}

          {!exitLoading && !exitError && filteredExit.length === 0 && (
            <p className="text-[var(--text-muted)] text-center py-8">لا توجد طلبات تخارج</p>
          )}

          {!exitLoading && filteredExit.length > 0 && (
            <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
              <table className="w-full text-sm">
                <thead className="bg-[var(--surface-alt)]">
                  <tr>
                    {['الاسم', 'الجوال', 'الأسهم', 'رأس المال', 'سنة التخارج', 'السيناريو', 'التشغيل', 'NAV', 'القيمة التقديرية', 'ربح/خسارة', 'العائد', 'الحالة', 'تعديل'].map((h) => (
                      <th key={h} className="px-3 py-3 text-right font-semibold text-[var(--text-base)] whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)] bg-[var(--card-bg)]">
                  {filteredExit.map((r) => (
                    <tr key={r.id} className="hover:bg-[var(--surface-alt)] transition-colors">
                      <td className="px-3 py-2.5 font-medium text-[var(--text-base)]">{r.fullName}</td>
                      <td className="px-3 py-2.5 text-[var(--text-muted)]" dir="ltr">{r.mobile}</td>
                      <td className="px-3 py-2.5 text-[var(--text-muted)]">{r.shares}</td>
                      <td className="px-3 py-2.5 text-[var(--text-muted)]">{formatCurrency(r.investmentAmount)}</td>
                      <td className="px-3 py-2.5 text-[var(--text-muted)]">السنة {r.selectedExitYear}</td>
                      <td className="px-3 py-2.5 text-[var(--text-muted)]">{r.selectedScenario}</td>
                      <td className="px-3 py-2.5 text-[var(--text-muted)]">{r.occupancy}٪</td>
                      <td className="px-3 py-2.5 text-[var(--text-muted)]">{formatCurrency(Math.round(r.estimatedCompanyNAV))}</td>
                      <td className="px-3 py-2.5 font-medium text-gold">{formatCurrency(Math.round(r.estimatedExitValue))}</td>
                      <td className={`px-3 py-2.5 font-medium ${r.estimatedProfitLoss >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                        {r.estimatedProfitLoss >= 0 ? '+' : ''}{formatCurrency(Math.round(r.estimatedProfitLoss))}
                      </td>
                      <td className={`px-3 py-2.5 font-medium ${r.estimatedROI >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500'}`}>
                        {r.estimatedROI.toFixed(1)}٪
                      </td>
                      <td className="px-3 py-2.5">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLOR_MAP[r.status]}`}>
                          {EXIT_STATUS_LABELS[r.status]}
                        </span>
                      </td>
                      <td className="px-3 py-2.5">
                        <select
                          value={r.status}
                          disabled={exitUpdating === r.id}
                          onChange={(e) => handleExitStatusChange(r.id, e.target.value as ExitRequestStatus)}
                          className="border border-[var(--border)] rounded-md px-2 py-1 text-xs bg-[var(--card-bg)] text-[var(--text-base)]"
                        >
                          {Object.entries(EXIT_STATUS_LABELS).map(([v, l]) => (
                            <option key={v} value={v}>{l}</option>
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
      )}
    </div>
  );
}
