export const imageUrlToBase64 = async (imageBuffer: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.onload = function () {
        resolve(this.result as string)
      };
      reader.readAsDataURL(imageBuffer);
    } catch (e) {
      reject(e);
    }
  });
}
