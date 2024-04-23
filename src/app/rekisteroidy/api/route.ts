import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

interface CaptchaPostBody {
    captchaToken: string
}

export async function POST(req: NextRequest) {
    const requestBody: CaptchaPostBody = await req.json();
    try {
        const res = await axios({
            method: 'POST',
            url: `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${requestBody.captchaToken}`,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return NextResponse.json({ body: res.data, status: res.status });
    } catch (error: any) {
        console.error(error.response!.data);
        return NextResponse.json({ message: error.response!.data }, { status: error.status });
    }
  }