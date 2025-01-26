// import { createCanvas, loadImage } from "canvas";

// async function addWatermark(
//   imagePath: string,
//   watermarkText: string
// ): Promise<string> {
//   try {
//     const image = await loadImage(imagePath);
//     const canvas = createCanvas(image.width, image.height);
//     const ctx = canvas.getContext("2d");

//     // Draw the original image on the canvas
//     ctx.drawImage(image, 0, 0);

//     // Add the watermark
//     ctx.font = "20px Arial";
//     ctx.fillStyle = "rgba(255, 255, 255, 0.5)"; // Color and transparency of the watermark
//     ctx.fillText(watermarkText, 10, 50); // Watermark text and position

//     // Return the image with the watermark as a data URL
//     return canvas.toDataURL();
//   } catch (error: any) {
//     throw new Error("Erro ao adicionar marca d'água: " + error.message);
//   }
// }

// export { addWatermark };
