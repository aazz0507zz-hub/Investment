'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useInvestor } from '@/contexts/InvestorContext';
import { createInvestmentRequest } from '@/lib/investmentRequests';
import { formatCurrency } from '@/lib/utils';
import { projectConfig } from '@/data/projectConfig';

const schema = z.object({
  fullName: z.string().min(3, 'الاسم يجب أن يكون 3 أحرف على الأقل'),
  phone: z
    .string()
    .regex(/^05\d{8}$/, 'رقم الجوال يجب أن يبدأ بـ 05 ويتكون من 10 أرقام'),
  email: z.string().email('بريد إلكتروني غير صحيح').optional().or(z.literal('')),
  referralSource: z.string().min(1, 'يرجى اختيار كيف عرفت عنّا'),
  calculationMethod: z.enum(['shares', 'amount']),
  shares: z.coerce.number().int().min(1).max(2000),
  amount: z.coerce.number().min(projectConfig.sharePrice),
  notes: z.string().optional(),
  riskAcknowledged: z.literal(true, {
    errorMap: () => ({ message: 'يجب الموافقة على إقرار المخاطر' }),
  }),
});

type FormData = z.infer<typeof schema>;

export default function FinalRequestForm() {
  const { draft, updateDraft, resetDraft } = useInvestor();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: draft.fullName,
      phone: draft.phone,
      email: draft.email,
      referralSource: draft.referralSource,
      calculationMethod: draft.calculationMethod,
      shares: draft.shares,
      amount: draft.amount,
      notes: draft.notes,
      riskAcknowledged: draft.riskAcknowledged || undefined,
    },
  });

  const method = watch('calculationMethod');
  const sharesVal = watch('shares');
  const amountVal = watch('amount');

  const derivedShares =
    method === 'amount'
      ? Math.max(1, Math.floor((amountVal || 0) / projectConfig.sharePrice))
      : sharesVal || 1;
  const derivedAmount = derivedShares * projectConfig.sharePrice;

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    setServerError('');
    updateDraft(data);

    const result = await createInvestmentRequest({
      ...data,
      email: data.email || '',
      notes: data.notes || '',
      shares: derivedShares,
      amount: derivedAmount,
    });

    setSubmitting(false);

    if (result.success) {
      setSubmitted(true);
      resetDraft();
    } else {
      setServerError(result.error ?? 'حدث خطأ، يرجى المحاولة مجدداً');
    }
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto text-center py-16 space-y-4">
        <div className="text-5xl">✅</div>
        <h2 className="text-2xl font-bold text-forest">تم إرسال طلبك بنجاح!</h2>
        <p className="text-[var(--text-muted)]">
          سيتواصل معك عبدالعزيز محمد العنزي على الرقم{' '}
          <a href="tel:0500772878" className="text-gold">
            0500772878
          </a>{' '}
          في أقرب وقت.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl mx-auto" noValidate>
      {/* Personal info */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg text-[var(--text-base)]">بياناتك الشخصية</h3>

        <div>
          <label className="block text-sm font-medium mb-1">الاسم الكامل *</label>
          <input
            {...register('fullName', {
              onChange: (e) => updateDraft({ fullName: e.target.value }),
            })}
            className="w-full border border-[var(--border)] rounded-lg px-3 py-2 bg-[var(--card-bg)] text-[var(--text-base)] focus:outline-none focus:ring-2 focus:ring-forest/50"
            placeholder="عبدالله محمد العنزي"
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">رقم الجوال *</label>
          <input
            {...register('phone', {
              onChange: (e) => updateDraft({ phone: e.target.value }),
            })}
            type="tel"
            dir="ltr"
            className="w-full border border-[var(--border)] rounded-lg px-3 py-2 bg-[var(--card-bg)] text-[var(--text-base)] text-left focus:outline-none focus:ring-2 focus:ring-forest/50"
            placeholder="05xxxxxxxx"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            البريد الإلكتروني <span className="text-[var(--text-muted)]">(اختياري)</span>
          </label>
          <input
            {...register('email', {
              onChange: (e) => updateDraft({ email: e.target.value }),
            })}
            type="email"
            dir="ltr"
            className="w-full border border-[var(--border)] rounded-lg px-3 py-2 bg-[var(--card-bg)] text-[var(--text-base)] text-left focus:outline-none focus:ring-2 focus:ring-forest/50"
            placeholder="example@email.com"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">كيف عرفت عن المشروع؟ *</label>
          <select
            {...register('referralSource', {
              onChange: (e) => updateDraft({ referralSource: e.target.value }),
            })}
            className="w-full border border-[var(--border)] rounded-lg px-3 py-2 bg-[var(--card-bg)] text-[var(--text-base)] focus:outline-none focus:ring-2 focus:ring-forest/50"
          >
            <option value="">اختر...</option>
            <option value="friend">طرف أو صديق</option>
            <option value="whatsapp">واتساب</option>
            <option value="twitter">تويتر / X</option>
            <option value="direct">تواصل مباشر</option>
            <option value="other">أخرى</option>
          </select>
          {errors.referralSource && (
            <p className="text-red-500 text-xs mt-1">{errors.referralSource.message}</p>
          )}
        </div>
      </div>

      {/* Investment details */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg text-[var(--text-base)]">تفاصيل الاستثمار</h3>

        <div>
          <label className="block text-sm font-medium mb-2">طريقة الحساب</label>
          <div className="flex gap-3">
            {(['shares', 'amount'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setValue('calculationMethod', m);
                  updateDraft({ calculationMethod: m });
                }}
                className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  method === m
                    ? 'bg-forest text-ivory border-forest'
                    : 'border-[var(--border)] text-[var(--text-muted)] hover:border-forest/50'
                }`}
              >
                {m === 'shares' ? 'عدد الأسهم' : 'المبلغ'}
              </button>
            ))}
          </div>
        </div>

        {method === 'shares' ? (
          <div>
            <label className="block text-sm font-medium mb-1">
              عدد الأسهم * (سعر السهم: {formatCurrency(projectConfig.sharePrice)})
            </label>
            <input
              {...register('shares', {
                onChange: (e) =>
                  updateDraft({ shares: parseInt(e.target.value) || 1 }),
              })}
              type="number"
              min={1}
              max={2000}
              className="w-full border border-[var(--border)] rounded-lg px-3 py-2 bg-[var(--card-bg)] text-[var(--text-base)] focus:outline-none focus:ring-2 focus:ring-forest/50"
            />
            {errors.shares && (
              <p className="text-red-500 text-xs mt-1">{errors.shares.message}</p>
            )}
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium mb-1">
              المبلغ (ريال) * (الحد الأدنى: {formatCurrency(projectConfig.sharePrice)})
            </label>
            <input
              {...register('amount', {
                onChange: (e) =>
                  updateDraft({ amount: parseFloat(e.target.value) || projectConfig.sharePrice }),
              })}
              type="number"
              min={projectConfig.sharePrice}
              step={projectConfig.sharePrice}
              className="w-full border border-[var(--border)] rounded-lg px-3 py-2 bg-[var(--card-bg)] text-[var(--text-base)] focus:outline-none focus:ring-2 focus:ring-forest/50"
            />
            {errors.amount && (
              <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>
            )}
          </div>
        )}

        {/* Live summary */}
        <div className="bg-forest/10 border border-forest/20 rounded-lg p-4 space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-[var(--text-muted)]">عدد الأسهم</span>
            <span className="font-bold">{derivedShares.toLocaleString('ar-SA')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--text-muted)]">إجمالي الاستثمار</span>
            <span className="font-bold text-gold">{formatCurrency(derivedAmount)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--text-muted)]">النسبة من المشروع</span>
            <span className="font-bold">
              {((derivedShares / projectConfig.totalShares) * 100).toFixed(2)}٪
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            ملاحظات <span className="text-[var(--text-muted)]">(اختياري)</span>
          </label>
          <textarea
            {...register('notes', {
              onChange: (e) => updateDraft({ notes: e.target.value }),
            })}
            rows={3}
            className="w-full border border-[var(--border)] rounded-lg px-3 py-2 bg-[var(--card-bg)] text-[var(--text-base)] focus:outline-none focus:ring-2 focus:ring-forest/50 resize-none"
            placeholder="أي ملاحظات إضافية..."
          />
        </div>
      </div>

      {/* Risk acknowledgment */}
      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
        <label className="flex gap-3 cursor-pointer">
          <input
            {...register('riskAcknowledged', {
              onChange: (e) => updateDraft({ riskAcknowledged: e.target.checked }),
            })}
            type="checkbox"
            className="mt-0.5 accent-forest"
          />
          <span className="text-sm text-[var(--text-base)]">
            أقرّ بأنني قرأت دراسة الجدوى وأفهم أن الاستثمار ينطوي على مخاطر، وأن العوائد
            المذكورة تقديرية وغير مضمونة. هذا الطلب لا يُعدّ عقدًا ملزمًا.
          </span>
        </label>
        {errors.riskAcknowledged && (
          <p className="text-red-500 text-xs mt-2">{errors.riskAcknowledged.message}</p>
        )}
      </div>

      {serverError && (
        <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-red-700 dark:text-red-400 text-sm">
          {serverError}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-gold hover:bg-gold-light disabled:opacity-60 text-charcoal font-bold py-3 rounded-lg transition-colors"
      >
        {submitting ? 'جارٍ الإرسال...' : 'إرسال طلب الاهتمام'}
      </button>

      <p className="text-center text-xs text-[var(--text-muted)]">
        بعد الإرسال سيتواصل معك المسؤول على رقم 0500772878
      </p>
    </form>
  );
}
