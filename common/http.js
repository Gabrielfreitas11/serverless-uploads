import axios from 'axios';

import { getRandomIp } from './getRandomIp';

export async function request(options, optionsHttpsAgent = null) {
  const optionsAxios = optionsHttpsAgent && optionsHttpsAgent.httpsAgent
    ? optionsHttpsAgent
    : options;

  return axios(optionsAxios).then(
    async (response) => response,
    async (error) => {
      throw error;
    },
  );
}

export async function requestWithAnonimous(options, optionsHttpsAgent = null) {
  const ip = getRandomIp();

  console.log(ip);

  const optionsAxios = optionsHttpsAgent && optionsHttpsAgent.httpsAgent
    ? optionsHttpsAgent
    : options;

  const instance = axios.create({
    headers: {
      // 'X-Forwarded-For': ip,
      cookie: '__cf_bm=01BWF49xIBYRWy_YFP0YxCJWwgsOqz6bb8QNp9EsfH4-1681768142-0-AawmiEc1KjA/zO6kBQ2hVQ8V+2urzsiGtGDEPrzXq0QLENgmfgsozYKi5iU/l+RF1RfaNL+2DwR7aLAmrgo4bafhAr9AipIQOg5kcwUltvLv',
    },
  });

  return instance(optionsAxios).then(
    async (response) => response,
    async (error) => {
      throw error;
    },
  );
}
