import axios from 'axios';

/**
 * @return {AxiosPromise}
 */
export async function cryptoListFetchApi() {
  const res = await axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=0');
  return {
    data: res.data,
  };
}

export async function cryptoGlobalFetchApi() {
  const res = await axios.get('https://api.coinmarketcap.com/v1/global/');
  return {
    data: res.data,
  };
}
