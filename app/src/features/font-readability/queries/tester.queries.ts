import { useQuery } from '@tanstack/react-query';
import { Tester } from '../types/tester';
import { useTesterContext } from '../contexts/TesterContext';
import { useMemo } from 'react';
import { getRoute } from '../helpers/axios';

export const useGetTester = (id?: number) => {

  return useQuery<Tester>(['tester'], () => getRoute('/testers/' + id), {
    enabled: id !== undefined,
    cacheTime: Infinity,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
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