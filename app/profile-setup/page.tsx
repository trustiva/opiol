'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import Toast from '@/components/Toast';
import { profileSchema, type ProfileFormData } from '@/schemas/profileSchema';

const initialFormData: ProfileFormData = {
  educationLevel: '',
  gpa: '',
  currentUniversity: '',
  destinationCountry: '',
  targetDegree: '',
  intendedField: '',
  englishTestTaken: false,
  englishTestScore: '',
  targetYear: '',
};

export default function ProfileSetup() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useLocalStorage<ProfileFormData>('profile-setup', initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'loading';
  } | null>(null);
  const router = useRouter();

  const handleInputChange = (field: keyof ProfileFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setToast({ message: 'در حال ذخیره پروفایل...', type: 'loading' });

    // Validate using Zod schema
    const result = profileSchema.safeParse(formData);
    if (!result.success) {
      setToast({ message: result.error.errors[0].message, type: 'error' });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/profile-setup/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setToast({ message: 'پروفایل با موفقیت ذخیره شد!', type: 'success' });
        // Clear localStorage and redirect after a short delay
        setTimeout(() => {
          localStorage.removeItem('profile-setup');
          router.push('/dashboard');
        }, 1500);
      } else {
        throw new Error(data.error || 'خطا در ذخیره پروفایل');
      }
    } catch (error) {
      setToast({ 
        message: error instanceof Error ? error.message : 'خطا در ذخیره پروفایل. لطفا دوباره تلاش کنید.', 
        type: 'error' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            custom={1}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full max-w-md mx-auto"
          >
            <h2 className="text-2xl font-bold text-white mb-6">سوابق تحصیلی شما</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">مقطع تحصیلی</label>
                <select
                  value={formData.educationLevel}
                  onChange={(e) => handleInputChange('educationLevel', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-opiol-gold focus:ring-1 focus:ring-opiol-gold"
                >
                  <option value="">انتخاب مقطع تحصیلی</option>
                  <option value="diploma">دیپلم</option>
                  <option value="bachelor">کارشناسی</option>
                  <option value="master">کارشناسی ارشد</option>
                  <option value="phd">دکتری</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">معدل</label>
                <input
                  type="number"
                  value={formData.gpa}
                  onChange={(e) => handleInputChange('gpa', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-opiol-gold focus:ring-1 focus:ring-opiol-gold"
                  placeholder="معدل خود را وارد کنید"
                  step="0.01"
                  min="0"
                  max="4"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">دانشگاه فعلی</label>
                <input
                  type="text"
                  value={formData.currentUniversity}
                  onChange={(e) => handleInputChange('currentUniversity', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-opiol-gold focus:ring-1 focus:ring-opiol-gold"
                  placeholder="نام دانشگاه خود را وارد کنید"
                />
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            custom={1}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full max-w-md mx-auto"
          >
            <h2 className="text-2xl font-bold text-white mb-6">هدف تحصیلی شما</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">کشور مقصد</label>
                <select
                  value={formData.destinationCountry}
                  onChange={(e) => handleInputChange('destinationCountry', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-opiol-gold focus:ring-1 focus:ring-opiol-gold"
                >
                  <option value="">انتخاب کشور</option>
                  <option value="germany">آلمان</option>
                  <option value="usa">آمریکا</option>
                  <option value="canada">کانادا</option>
                  <option value="uk">انگلستان</option>
                  <option value="australia">استرالیا</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">مقطع هدف</label>
                <select
                  value={formData.targetDegree}
                  onChange={(e) => handleInputChange('targetDegree', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-opiol-gold focus:ring-1 focus:ring-opiol-gold"
                >
                  <option value="">انتخاب مقطع</option>
                  <option value="bsc">کارشناسی</option>
                  <option value="msc">کارشناسی ارشد</option>
                  <option value="phd">دکتری</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">رشته مورد نظر</label>
                <input
                  type="text"
                  value={formData.intendedField}
                  onChange={(e) => handleInputChange('intendedField', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-opiol-gold focus:ring-1 focus:ring-opiol-gold"
                  placeholder="رشته مورد نظر خود را وارد کنید"
                />
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            custom={1}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full max-w-md mx-auto"
          >
            <h2 className="text-2xl font-bold text-white mb-6">آمادگی و زمان‌بندی</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">آیا آزمون آیلتس/تافل را گذرانده‌اید؟</label>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleInputChange('englishTestTaken', true)}
                    className={`px-4 py-2 rounded-lg ${
                      formData.englishTestTaken
                        ? 'bg-opiol-gold text-opiol-dark'
                        : 'bg-gray-800 text-white'
                    } border border-gray-700`}
                  >
                    بله
                  </button>
                  <button
                    onClick={() => handleInputChange('englishTestTaken', false)}
                    className={`px-4 py-2 rounded-lg ${
                      !formData.englishTestTaken
                        ? 'bg-opiol-gold text-opiol-dark'
                        : 'bg-gray-800 text-white'
                    } border border-gray-700`}
                  >
                    خیر
                  </button>
                </div>
              </div>

              {formData.englishTestTaken && (
                <div>
                  <label className="block text-gray-300 mb-2">نمره آیلتس/تافل</label>
                  <input
                    type="number"
                    value={formData.englishTestScore}
                    onChange={(e) => handleInputChange('englishTestScore', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-opiol-gold focus:ring-1 focus:ring-opiol-gold"
                    placeholder="نمره خود را وارد کنید"
                    step="0.5"
                    min="0"
                    max="9"
                  />
                </div>
              )}

              <div>
                <label className="block text-gray-300 mb-2">سال هدف برای درخواست</label>
                <select
                  value={formData.targetYear}
                  onChange={(e) => handleInputChange('targetYear', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-opiol-gold focus:ring-1 focus:ring-opiol-gold"
                >
                  <option value="">انتخاب سال</option>
                  {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                    <option key={year} value={year.toString()}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-opiol-dark py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step <= currentStep ? 'bg-opiol-gold text-opiol-dark' : 'bg-gray-700 text-gray-300'
                }`}
              >
                {step}
              </div>
            ))}
          </div>
          <div className="h-1 bg-gray-700">
            <motion.div
              className="h-full bg-opiol-gold"
              initial={{ width: '0%' }}
              animate={{ width: `${((currentStep - 1) / 2) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Form Steps */}
        <AnimatePresence initial={false} mode="wait">
          {renderStep()}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <button
              onClick={prevStep}
              disabled={isSubmitting}
              className="px-6 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 
                       transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              قبلی
            </button>
          )}
          {currentStep < 3 ? (
            <button
              onClick={nextStep}
              disabled={isSubmitting}
              className="ml-auto px-6 py-2 rounded-lg bg-opiol-gold text-opiol-dark 
                       hover:bg-opiol-gold/90 transition-colors disabled:opacity-50 
                       disabled:cursor-not-allowed"
            >
              بعدی
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="ml-auto px-6 py-2 rounded-lg bg-opiol-gold text-opiol-dark 
                       hover:bg-opiol-gold/90 transition-colors disabled:opacity-50 
                       disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'در حال ذخیره...' : 'ادامه'}
            </button>
          )}
        </div>
      </div>

      {/* Toast Messages */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
          duration={toast.type === 'loading' ? undefined : 3000}
        />
      )}
    </main>
  );
} 