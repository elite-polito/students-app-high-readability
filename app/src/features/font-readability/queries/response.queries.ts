import { useMutation } from '@tanstack/react-query';
import { Response } from '../types/response';
import { postRoute } from '../helpers/axios';

export const useAddResponse = () => {

  return useMutation((response: Response) => {
    return postRoute('/responses', response);
  });
}