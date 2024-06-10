import { EXPO_PUBLIC_BASE_IMG_URL } from '@env';

type UserPhoto = {
  path: string;
  id: number;
  width: number;
  height: number,
  angle: number,
  crop: {
    x1: number,
    y1: number,
    x2: number,
    y2: number
  },
  brightness: number,
  contrast: number,
  position: any,
  main: boolean
}
type UserPhotos = UserPhoto[]

export const generateUserPhotoUls = (photos: UserPhotos) => {
  const sortedByMain = photos.sort(sortByMain)
  const photoUrls = sortedByMain.map((item) => {
    const minOfX2AndY2 = Math.min(item?.crop?.x2, item?.crop?.y2);
    const { x1, y1 } = item?.crop ?? {};
    return (
      `${EXPO_PUBLIC_BASE_IMG_URL}/${item?.path}?w=320&h=320&dpr=1.5&or=0&q=60&bri=0&con=0&rect=${x1},${y1},${minOfX2AndY2},${minOfX2AndY2}&crop=faces`
    )
  })
  return photoUrls
}


function sortByMain(a: UserPhoto, b: UserPhoto) {
  if (a.main && !b.main) {
    return -1; // a comes before b
  } else if (!a.main && b.main) {
    return 1; // b comes before a
  } else {
    return 0; // no preference
  }
}