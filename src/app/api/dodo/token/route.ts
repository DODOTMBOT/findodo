import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json({ error: 'Код не передан' }, { status: 400 });
    }

    const clientId = process.env.NEXT_PUBLIC_DODO_CLIENT_ID;
    const clientSecret = process.env.DODO_CLIENT_SECRET;
    const redirectUri = process.env.DODO_REDIRECT_URI;

    // ИСПРАВЛЕННЫЙ URL: https://auth.dodois.io/connect/token
    const response = await fetch('https://auth.dodois.io/connect/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: clientId!,
        client_secret: clientSecret!,
        redirect_uri: redirectUri!,
        code: code,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: 'Ошибка от Dodo', details: data }, { status: response.status });
    }

    // Возвращаем токены на фронт для проверки (или сохранения)
    return NextResponse.json({ 
      success: true, 
      access_token: data.access_token,
      refresh_token: data.refresh_token 
    });

  } catch (error) {
    console.error('Ошибка в API:', error);
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 });
  }
}