const axios = require('axios');
const { fetchWithWrongUrl, fetchWithHeadersAndParams } = require('./axiosTasks');

jest.mock('axios');

describe('Axios task suite', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('Завдання 1: should throw an error for a wrong URL and return the expected message', async () => {
    const error = new Error('Request failed with status code 404');
    error.response = { status: 404 };
    axios.get.mockRejectedValueOnce(error);

    await expect(fetchWithWrongUrl()).rejects.toThrow(
      'Axios error: Request failed with status 404',
    );
    expect(axios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/invalid-endpoint');
  });

  test('Завдання 2: should include custom headers and params in the request', async () => {
    const url = 'https://example.com/data';
    const headers = { 'X-Custom-Header': 'test-value' };
    const params = { q: 'search', page: 1 };
    const mockData = { result: 'ok' };
    axios.get.mockResolvedValueOnce({ data: mockData });

    const data = await fetchWithHeadersAndParams(url, headers, params);

    expect(data).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith(url, { headers, params });
  });

  test('Завдання 3: should handle successful and failed mocked Axios requests', async () => {
    const successResponse = { data: { id: 42, title: 'Success' } };
    axios.get.mockResolvedValueOnce(successResponse);

    const successData = await fetchWithHeadersAndParams('https://example.com/success', {}, {});
    expect(successData).toEqual(successResponse.data);

    const failureError = new Error('Network Error');
    failureError.response = undefined;
    axios.get.mockRejectedValueOnce(failureError);

    await expect(fetchWithWrongUrl()).rejects.toThrow('Axios error: Network Error');
  });
});
