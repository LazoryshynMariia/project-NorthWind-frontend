import { NextRequest, NextResponse } from 'next/server';
import { api } from '../api';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const formData = await request.formData();

    const res = await api.post('/stories', formData, {
      headers: {
        Cookie: cookieStore.toString(),
        'Content-Type': 'application/json', //////////
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
