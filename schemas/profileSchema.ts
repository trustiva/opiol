import { z } from 'zod';

export const profileSchema = z.object({
  educationLevel: z.string().min(1, "لطفا مقطع تحصیلی را انتخاب کنید"),
  gpa: z.string().min(1, "لطفا معدل خود را وارد کنید"),
  currentUniversity: z.string().min(1, "لطفا نام دانشگاه فعلی خود را وارد کنید"),
  destinationCountry: z.string().min(1, "لطفا کشور مقصد را انتخاب کنید"),
  targetDegree: z.string().min(1, "لطفا مقطع هدف را انتخاب کنید"),
  intendedField: z.string().min(1, "لطفا رشته مورد نظر خود را وارد کنید"),
  englishTestTaken: z.boolean(),
  englishTestScore: z.string().optional(),
  targetYear: z.string().min(1, "لطفا سال هدف را انتخاب کنید"),
});

export type ProfileFormData = z.infer<typeof profileSchema>; 