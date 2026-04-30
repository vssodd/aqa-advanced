const axios = require('axios');

const client = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
});

// REQUEST INTERCEPTOR
client.interceptors.request.use(
  (config) => {
    const timestamp = new Date().toISOString();
    console.log(`\n[REQUEST] ${timestamp}`);
    console.log(`  Method  : ${config.method.toUpperCase()}`);
    console.log(`  URL     : ${config.baseURL}${config.url}`);
    if (config.data) {
      console.log(`  Payload : ${JSON.stringify(config.data)}`);
    }
    return config;
  },
  (error) => {
    console.error('[REQUEST ERROR]', error.message);
    return Promise.reject(error);
  },
);

// RESPONSE INTERCEPTOR
client.interceptors.response.use(
  (response) => {
    const timestamp = new Date().toISOString();
    console.log(`[RESPONSE] ${timestamp}`);
    console.log(`  Status  : ${response.status} ${response.statusText}`);
    console.log(`  Headers : content-type=${response.headers['content-type']}`);
    console.log(`  Body    : ${JSON.stringify(response.data).substring(0, 120)}...`);
    return response;
  },
  (error) => {
    const timestamp = new Date().toISOString();
    console.error(`[RESPONSE ERROR] ${timestamp}`);
    console.error(`  Status  : ${error.response?.status ?? 'N/A'}`);
    console.error(`  Message : ${error.message}`);
    return Promise.reject(error);
  },
);

module.exports = client;
