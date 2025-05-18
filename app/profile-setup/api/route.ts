import { NextResponse } from 'next/server';
import { profileSchema } from '@/schemas/profileSchema';
import { simulateApiPost } from '@/lib/mockApi';
import { ProfileFormData } from '@/schemas/profileSchema';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const result = profileSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      );
    }

    // Simulate API call with validated data
    const response = await simulateApiPost<ProfileFormData>(result.data);
    
    if (response.success) {
      return NextResponse.json(
        { message: 'پروفایل با موفقیت ذخیره شد' },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: 'خطا در ذخیره پروفایل' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Profile setup error:', error);
    return NextResponse.json(
      { error: 'خطای سرور' },
      { status: 500 }
    );
  }
} 