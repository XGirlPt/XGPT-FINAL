// Defina a interface no topo do arquivo
interface CaptchaResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
}

// A função principal para validação do CAPTCHA
import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

export async function POST(req: Request) {
  const { captchaToken } = await req.json();

  if (!captchaToken) {
    return NextResponse.json({ success: false, message: 'Token do CAPTCHA não enviado.' }, { status: 400 });
  }

  const secret = process.env.HCAPTCHA_SECRET_KEY;
  const verifyUrl = `https://hcaptcha.com/siteverify`;

  console.log("a chave secreta é : ", secret)

  const response = await fetch(verifyUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `response=${captchaToken}&secret=${secret}`,
  });
  console.log('Token recebido:', captchaToken);


  // Adicione a asserção de tipo aqui
  const captchaValidation = await response.json() as CaptchaResponse;
  console.log('Resposta do hCaptcha:', captchaValidation);

  if (captchaValidation.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false, message: 'Falha na verificação do CAPTCHA.' }, { status: 400 });
  }
}
