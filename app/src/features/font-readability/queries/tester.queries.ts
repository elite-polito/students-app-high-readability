import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Tester } from '../types/tester';
import { useTesterContext } from '../contexts/TesterContext';
import { useMemo } from 'react';

export const useGetTester = (id?: number) => {

  return useQuery<Tester>(['tester'], () => axios.get('http://localhost:3001' + '/testers/' + id), {
    enabled: id !== undefined,
    cacheTime: 0,
    staleTime: 0,
  });
};
export const useGetTask = (id: number) => {
  const { testerId } = useTesterContext();
  const testerQuery = useGetTester(testerId);

  return useMemo(() => {
    if (testerQuery.data) {
      return testerQuery.data.tasks[id];
    }
  }, [testerQuery.data, id]);
}