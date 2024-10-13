// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const relativePath = 'posts';
const mockPosts = [
  {
    userId: 1,
    id: 1,
    title:
      'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body: `quia et suscipit
  suscipit recusandae consequuntur expedita et cum
  reprehenderit molestiae ut ut quas totam
  nostrum rerum est autem sunt rem eveniet architect`,
  },
  {
    userId: 1,
    id: 2,
    title: 'qui est esse',
    body: `est rerum tempore vitae
  sequi sint nihil reprehenderit dolor beatae ea dolores neque
  fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis
  qui aperiam non debitis possimus qui neque nisi nulla`,
  },
];

jest.mock('axios');

beforeEach(() => {
  axios.create = jest.fn(() => axios);
  axios.get = jest
    .fn()
    .mockImplementation(() => Promise.resolve({ data: mockPosts }));
});

describe('throttledGetDataFromApi', () => {
  jest.useFakeTimers();
  test('should create instance with provided base url', async () => {
    jest.runAllTimers();
    const mockCreate = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(relativePath);

    expect(mockCreate).toBeCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockGet = jest.spyOn(axios.create(), 'get');
    await throttledGetDataFromApi(relativePath);
    jest.runAllTimers();

    expect(axios.create).toHaveBeenCalled();
    expect(mockGet).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    jest.runAllTimers();
    const data = await throttledGetDataFromApi(relativePath);

    expect(data).toEqual(mockPosts);
  });
});
