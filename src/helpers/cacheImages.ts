import { TDictionary } from "../commonTypes";

const cacheImages = async (srcImages: Array<TDictionary<string>>) => {
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

export default cacheImages;
