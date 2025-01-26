// import { NextApiRequest, NextApiResponse } from 'next';
// import { createCanvas, loadImage } from 'canvas';
// import sharp from 'sharp';
// import supabase from '@/database/supabase';
// import watermarkImage from '../../../public/logo.png'; // Import the watermark image

// // Função para adicionar marca d'água
// async function addWatermark(
//   imagePath: string,
//   scale: number = 0.2
// ): Promise<Buffer> {
//   const image = await loadImage(imagePath);
//   const canvas = createCanvas(image.width, image.height);
//   const ctx = canvas.getContext("2d");
//   ctx.drawImage(image, 0, 0);

//   const watermark = await loadImage(watermarkImage.src);
//   const watermarkWidth = watermark.width * scale;
//   const watermarkHeight = watermark.height * scale;
//   const x = (image.width - watermarkWidth) / 2;
//   const y = (image.height - watermarkHeight) / 2;
//   ctx.globalAlpha = 0.4;
//   ctx.drawImage(watermark, x, y, watermarkWidth, watermarkHeight);

//   return canvas.toBuffer();
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     try {
//       const { image, userUID, fileName } = req.body;
      
//       const buffer = Buffer.from(image, 'base64');
//       const watermarkedBuffer = await addWatermark(buffer, 0.3);
//       const webpBuffer = await sharp(watermarkedBuffer).webp().toBuffer();

//       const filePath = `${userUID}/${fileName.toLowerCase().replace(/ /g, "_").replace(/\./g, "_")}`;

//       const { data, error } = await supabase.storage
//         .from("profileFoto")
//         .upload(filePath, webpBuffer, { contentType: 'image/webp' });

//       if (error) throw new Error(error.message);

//       const publicURLFoto = `https://ulcggrutwonkxbiuigdu.supabase.co/storage/v1/object/public/profileFoto/${filePath}`;
//       res.status(200).json({ url: publicURLFoto });
//     } catch (error: any) {
//       console.error("Erro durante o upload:", error.message);
//       res.status(500).json({ error: error.message });
//     }
//   } else {
//     res.status(405).json({ error: 'Method not allowed' });
//   }
// }


import { NextApiRequest, NextApiResponse } from 'next';
import sharp from 'sharp';
import supabase from '@/database/supabase';

// Função para converter a imagem para WebP
async function convertToWebP(imagePath: string): Promise<Buffer> {
  const buffer = Buffer.from(imagePath, 'base64');
  return sharp(buffer).webp().toBuffer();
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { image, userUID, fileName } = req.body;
      
      const buffer = Buffer.from(image, 'base64');
      const webpBuffer = await sharp(buffer).webp().toBuffer();

      const filePath = `${userUID}/${fileName.toLowerCase().replace(/ /g, "_").replace(/\./g, "_")}`;

      const { data, error } = await supabase.storage
        .from("profileFoto")
        .upload(filePath, webpBuffer, { contentType: 'image/webp' });

      if (error) throw new Error(error.message);

      const publicURLFoto = `https://ulcggrutwonkxbiuigdu.supabase.co/storage/v1/object/public/profileFoto/${filePath}`;
      res.status(200).json({ url: publicURLFoto });
    } catch (error: any) {
      console.error("Erro durante o upload:", error.message);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
