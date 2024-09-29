import axios from 'axios';

const API_URL = 'https://sahr.lucapezzolla.com';
const secret = '?secret=xvLoJqHfKvA8dFtmjf9ULihECCEbZGjZ';

export const getRoute = (route: string) => {
  return axios.get(API_URL + route + secret).then((res) => res.data);
};

export const postRoute = (route: string, data: any) => {
  return axios.post(API_URL + route + secret, data).then((res) => res.data);
};