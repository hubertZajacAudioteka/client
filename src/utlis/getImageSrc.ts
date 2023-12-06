import { STORAGE } from '@/constants/api';

export const getImageSrc = (imageSrc: string): string => {
  return imageSrc.startsWith('images') ? `${STORAGE}/${imageSrc}` : imageSrc;
};
