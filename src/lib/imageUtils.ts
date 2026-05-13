/**
 * Resizes and compresses an image to ensure it fits within Firestore's 1MB limit.
 */
export async function resizeImage(base64Str: string, maxWidth = 1024, maxHeight = 1024, quality = 0.7): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      
      // We use image/jpeg for better compression than png
      const resizedBase64 = canvas.toDataURL("image/jpeg", quality);
      resolve(resizedBase64);
    };
    img.onerror = (e) => reject(e);
  });
}
