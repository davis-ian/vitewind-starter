import axiosInstance from '@/services/axiosConfig';

export const useAxios = () => {
  return { ...axiosInstance };
};
