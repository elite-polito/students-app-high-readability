import { useMutation } from '@tanstack/react-query';
import { Response } from '../types/response';
import axios from 'axios';

export const useAddResponse = () => {

  return useMutation((response: Response) => {
    return axios.post(process.env.API_URL + '/responses', response).then((res) => res.data);
  });
}