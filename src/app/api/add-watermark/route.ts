// pages/api/add-watermark.ts
import { NextApiRequest, NextApiResponse } from 'next';
import ffmpeg from 'fluent-ffmpeg';
import { createReadStream, createWriteStream } from 'fs';
import { promisify } from 'util';
import { pipeline } from 'stream';
import { tmpdir } from 'os';
import { join } from 'path';
import { unlink } from 'fs/promises';
import supabase from '@/backend/database/supabase';

const pump = promisify(pipeline);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    console.log('[API] Método não permitido:', req.method);
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { userUID, fileName } = req.query as { userUID: string; fileName: string };
    console.log('[API] Recebendo requisição com userUID:', userUID, 'fileName:', fileName);
    
    if (!userUID || !fileName) {
      console.log('[API] Parâmetros inválidos:', { userUID, fileName });
      return res.status(400).json({ error: 'userUID e fileName são obrigatórios' });
    }

    const tempInputPath = join(tmpdir(), `input-${fileName}`);
    const tempOutputPath = join(tmpdir(), `output-${fileName}`);
    console.log('[API] Caminhos temporários:', { tempInputPath, tempOutputPath });

    console.log('[API] Salvando arquivo temporário de entrada');
    const fileStream = createWriteStream(tempInputPath);
    await pump(req, fileStream);

    console.log('[API] Iniciando processamento com ffmpeg');
    await new Promise((resolve, reject) => {
      ffmpeg(tempInputPath)
        .input('public/logo.webp')
        .complexFilter('overlay=(W-w)/2:(H-h)/2')
        .outputOptions('-c:v libx264')
        .outputOptions('-c:a aac')
        .output(tempOutputPath)
        .on('end', () => {
          console.log('[API] Processamento com ffmpeg concluído');
          resolve(null);
        })
        .on('error', (err) => {
          console.error('[API] Erro no ffmpeg:', err.message);
          reject(err);
        })
        .run();
    });

    console.log('[API] Fazendo upload para o Supabase');
    const filePath = `${userUID}/${fileName}`;
    const processedFileStream = createReadStream(tempOutputPath);
    const { error: uploadError } = await supabase.storage
      .from('storyStorage')
      .upload(filePath, processedFileStream, { contentType: 'video/mp4' });

    if (uploadError) {
      console.error('[API] Erro ao fazer upload para o Supabase:', uploadError.message);
      throw new Error(uploadError.message);
    }

    console.log('[API] Limpando arquivos temporários');
    await Promise.all([unlink(tempInputPath), unlink(tempOutputPath)]);

    const publicURL = `https://ulcggrutwonkxbiuigdu.supabase.co/storage/v1/object/public/storyStorage/${filePath}`;
    console.log('[API] Sucesso! URL pública gerada:', publicURL);
    res.status(200).json({ url: publicURL });
  } catch (error: any) {
    console.error('[API] Erro ao processar watermark:', error.message);
    res.status(500).json({ error: error.message });
  }
}