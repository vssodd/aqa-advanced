const axios = require('axios');

async function fetchWithWrongUrl() {
  try {
    await axios.get('https://jsonplaceholder.typicode.com/invalid-endpoint');
    return { success: true };
  } catch (error) {
    const message = error?.response?.status
      ? `Request failed with status ${error.response.status}`
      : error.message;
    throw new Error(`Axios error: ${message}`);
  }
}

async function fetchWithHeadersAndParams(url, headers, params) {
  const response = await axios.get(url, {
    headers,
    params,
  });
  return response.data;
}

module.exports = {
  fetchWithWrongUrl,
  fetchWithHeadersAndParams,
};
