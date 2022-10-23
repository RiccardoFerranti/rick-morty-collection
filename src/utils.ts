import { TDictionary } from "./commonTypes";

export const cacheImages = async (srcImages: Array<TDictionary>) => {
  const promises = await srcImages.map((obj) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = obj.image;
      img.addEventListener('load', resolve);
      img.addEventListener('error', reject);
    })
  });

  return await Promise.allSettled(promises);
}
