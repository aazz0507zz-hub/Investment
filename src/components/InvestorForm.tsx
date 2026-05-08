'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { projectConfig } from '@/data/projectConfig';
import { formatCurrency } from '@/lib/utils';
import { SectionTitle } from './SectionTitle';
import { Disclaimer } from './Disclaimer';

// Validation schema
const schema = z.object({
  fullName: z.string().min(2, 'الاسم يجب أن يكون أكثر من حرفين'),
  phone: z.string().min(10, 'رقم الجوال يجب أن يكون 10 أرقام على الأقل').regex(/^[0-9+\s-]+$/, 'رقم غير صحيح'),
  email: z.string().email('البريد الإلكتروني غير صحيح').or(z.literal('')),
  referralSource: z.string().min(1, 'يرجى اختيار مصدر الوصول'),
  calculationMethod: z.enum(['shares', 'amount']),
  shares: z.coerce.number().min(0).optional(),
  amount: z.coerce.number().min(0).optional(),
  notes: z.string().optional(),
  riskAcknowledged: z.literal(true, { errorMap: () => ({ message: 'يجب الموافقة على التنبيه الاستثماري' }) }),
});

type FormData = z.infer<typeof schema>;

interface CalculationResult {
  shares: number;
  amount: number;
  ownershipPct: number;
}

// NOTE: Future integration point for Supabase or Google Sheets
// Replace the handleSubmit function body with an API call:
// await fetch('/api/investor-interest', { method: 'POST', body: JSON.stringify(data) })
// or use Supabase client: await supabase.from('investor_leads').insert(data)

export function InvestorForm() {
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { calculationMethod: 'shares' },
  });

  const method = watch('calculationMethod');
  const sharesVal = watch('shares') || 0;
  const amountVal = watch('amount') || 0;

  const onSubmit = (data: FormData) => {
    let shares = 0;
    let amount = 0;

    if (data.calculationMethod === 'shares') {
      shares = data.shares || 0;
      amount = shares * projectConfig.sharePrice;
    } else {
      amount = data.amount || 0;
      shares = Math.floor(amount / projectConfig.sharePrice);
    }

    const ownershipPct = (shares / projectConfig.totalShares) * 100;
    setResult({ shares, amount, ownershipPct: Math.round(ownershipPct * 1000) / 1000 });
    setSubmitted(true);

    // TODO: Send to backend
    // e.g., await submitToGoogleSheets(data) or await submitToSupabase(data)
    console.log('Investor interest form submitted (local only):', data);
  };

  // Live calculation preview
  const liveShares = method === 'shares' ? sharesVal : Math.floor(amountVal / projectConfig.sharePrice);
  const liveAmount = method === 'amount' ? amountVal : sharesVal * projectConfig.sharePrice;
  const liveOwnership = (liveShares / projectConfig.totalShares) * 100;

  return (
    <section id="investor-form" className="py-16 bg-charcoal">
      <div className="max-w-3xl mx-auto px-4">
        <SectionTitle
          title="سجّل اهتمامك الاستثماري"
          subtitle="هذا النموذج لجمع الاهتمام الأولي فقط — لا يُعدّ عقدًا أو التزامًا بالاستثمار"
        />

        {submitted && result ? (
          <div className="bg-forest/20 border border-gold/30 rounded-xl p-6 text-center">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-ivory text-xl font-bold mb-4">تم استلام اهتمامك</h3>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-charcoal-light rounded-lg p-3">
                <div className="text-2xl font-bold text-gold">{result.shares.toLocaleString('ar-SA')}</div>
                <div className="text-calm-400 text-xs mt-1">عدد الأسهم</div>
              </div>
              <div className="bg-charcoal-light rounded-lg p-3">
                <div className="text-2xl font-bold text-gold">{formatCurrency(result.amount)}</div>
                <div className="text-calm-400 text-xs mt-1">إجمالي الاستثمار</div>
              </div>
              <div className="bg-charcoal-light rounded-lg p-3">
                <div className="text-2xl font-bold text-gold">{result.ownershipPct.toFixed(2)}%</div>
                <div className="text-calm-400 text-xs mt-1">نسبة الملكية</div>
              </div>
            </div>
            <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-3 text-yellow-300 text-sm">
              هذا الحساب تقديري وغير ملزم، ولا يمثل عرضًا عامًا أو وعدًا بعائد.
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" dir="rtl">
            {/* Live preview */}
            {(liveShares > 0 || liveAmount > 0) && (
              <div className="bg-forest/20 border border-gold/30 rounded-xl p-4 grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className="text-xl font-bold text-gold">{liveShares.toLocaleString('ar-SA')}</div>
                  <div className="text-calm-400 text-xs">أسهم</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-gold">{formatCurrency(liveAmount)}</div>
                  <div className="text-calm-400 text-xs">إجمالي</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-gold">{liveOwnership.toFixed(2)}%</div>
                  <div className="text-calm-400 text-xs">نسبة الملكية</div>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-calm-300 text-sm mb-1">الاسم الكامل *</label>
                <input
                  {...register('fullName')}
                  className="w-full bg-charcoal-light border border-calm-700 rounded-lg px-3 py-2.5 text-ivory text-sm focus:outline-none focus:border-gold/50"
                  placeholder="اسمك الكامل"
                />
                {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>}
              </div>
              <div>
                <label className="block text-calm-300 text-sm mb-1">رقم الجوال *</label>
                <input
                  {...register('phone')}
                  className="w-full bg-charcoal-light border border-calm-700 rounded-lg px-3 py-2.5 text-ivory text-sm focus:outline-none focus:border-gold/50"
                  placeholder="05xxxxxxxx"
                  dir="ltr"
                />
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-calm-300 text-sm mb-1">البريد الإلكتروني</label>
                <input
                  {...register('email')}
                  type="email"
                  className="w-full bg-charcoal-light border border-calm-700 rounded-lg px-3 py-2.5 text-ivory text-sm focus:outline-none focus:border-gold/50"
                  placeholder="example@email.com"
                  dir="ltr"
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-calm-300 text-sm mb-1">من أين وصلك الرابط؟ *</label>
                <select
                  {...register('referralSource')}
                  className="w-full bg-charcoal-light border border-calm-700 rounded-lg px-3 py-2.5 text-ivory text-sm focus:outline-none focus:border-gold/50"
                >
                  <option value="">اختر...</option>
                  <option value="whatsapp">واتساب</option>
                  <option value="twitter">تويتر / X</option>
                  <option value="friend">صديق أو معارف</option>
                  <option value="instagram">إنستغرام</option>
                  <option value="linkedin">لينكد إن</option>
                  <option value="direct">مباشرة</option>
                  <option value="other">أخرى</option>
                </select>
                {errors.referralSource && <p className="text-red-400 text-xs mt-1">{errors.referralSource.message}</p>}
              </div>
            </div>

            {/* Calculation method */}
            <div>
              <label className="block text-calm-300 text-sm mb-2">طريقة الحساب *</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" {...register('calculationMethod')} value="shares" className="accent-gold" />
                  <span className="text-ivory text-sm">بعدد الأسهم</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" {...register('calculationMethod')} value="amount" className="accent-gold" />
                  <span className="text-ivory text-sm">بالمبلغ</span>
                </label>
              </div>
            </div>

            {method === 'shares' ? (
              <div>
                <label className="block text-calm-300 text-sm mb-1">عدد الأسهم</label>
                <input
                  {...register('shares')}
                  type="number"
                  min={1}
                  max={projectConfig.totalShares}
                  className="w-full bg-charcoal-light border border-calm-700 rounded-lg px-3 py-2.5 text-ivory text-sm focus:outline-none focus:border-gold/50"
                  placeholder="مثال: 10"
                  dir="ltr"
                />
                <p className="text-calm-500 text-xs mt-1">سعر السهم: {formatCurrency(projectConfig.sharePrice)}</p>
              </div>
            ) : (
              <div>
                <label className="block text-calm-300 text-sm mb-1">مبلغ الاستثمار (ريال)</label>
                <input
                  {...register('amount')}
                  type="number"
                  min={projectConfig.sharePrice}
                  className="w-full bg-charcoal-light border border-calm-700 rounded-lg px-3 py-2.5 text-ivory text-sm focus:outline-none focus:border-gold/50"
                  placeholder="مثال: 7750"
                  dir="ltr"
                />
                <p className="text-calm-500 text-xs mt-1">الحد الأدنى: {formatCurrency(projectConfig.sharePrice)} (سهم واحد)</p>
              </div>
            )}

            <div>
              <label className="block text-calm-300 text-sm mb-1">ملاحظات إضافية</label>
              <textarea
                {...register('notes')}
                rows={3}
                className="w-full bg-charcoal-light border border-calm-700 rounded-lg px-3 py-2.5 text-ivory text-sm focus:outline-none focus:border-gold/50 resize-none"
                placeholder="أي استفسارات أو ملاحظات..."
              />
            </div>

            {/* Risk acknowledgment */}
            <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('riskAcknowledged')}
                  className="mt-1 accent-gold"
                />
                <span className="text-yellow-200 text-sm leading-relaxed">
                  أقر أنني قرأت التنبيه الاستثماري وأفهم أن الاستثمار ينطوي على مخاطر، وأن الأرقام المعروضة مبنية على دراسة جدوى وافتراضات قابلة للتغيير، وأنه لا يوجد ضمان على العائد.
                </span>
              </label>
              {errors.riskAcknowledged && (
                <p className="text-red-400 text-xs mt-2">{errors.riskAcknowledged.message}</p>
              )}
            </div>

            <Disclaimer />

            <button
              type="submit"
              className="w-full bg-gold hover:bg-gold-light text-charcoal font-bold py-3 rounded-xl transition-all text-sm"
            >
              أرسل طلب الاهتمام
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
