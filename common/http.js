import axios from 'axios';

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
