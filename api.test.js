const client = require('./axiosClient');

function isValidPost(obj) {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.userId === 'number' &&
    typeof obj.id === 'number' &&
    typeof obj.title === 'string' &&
    obj.title.length > 0 &&
    typeof obj.body === 'string' &&
    obj.body.length > 0
  );
}

function isValidComment(obj) {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.postId === 'number' &&
    typeof obj.id === 'number' &&
    typeof obj.name === 'string' &&
    obj.name.length > 0 &&
    typeof obj.email === 'string' &&
    obj.email.includes('@') &&
    typeof obj.body === 'string' &&
    obj.body.length > 0
  );
}

function isValidTodo(obj) {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.userId === 'number' &&
    typeof obj.id === 'number' &&
    typeof obj.title === 'string' &&
    typeof obj.completed === 'boolean'
  );
}

describe('JSONPlaceholder API Tests', () => {
  // TEST 1: GET /posts
  describe('GET /posts — Fetch all posts', () => {
    let response;

    beforeAll(async () => {
      response = await client.get('/posts');
    });

    test('Should return HTTP 200', () => {
      expect(response.status).toBe(200);
    });

    test('Response body should be an array of 100 items', () => {
      expect(Array.isArray(response.data)).toBe(true);
      expect(response.data).toHaveLength(100);
    });

    test('Every post in the array should match the Post schema', () => {
      response.data.forEach((post, index) => {
        expect(isValidPost(post)).toBe(true);
      });
    });

    test('Posts should have sequential IDs starting at 1', () => {
      expect(response.data[0].id).toBe(1);
      expect(response.data[99].id).toBe(100);
    });
  });

  // TEST 2: GET /posts/:id
  describe('GET /posts/1 — Fetch a single post by ID', () => {
    let response;

    beforeAll(async () => {
      response = await client.get('/posts/1');
    });

    test('Should return HTTP 200', () => {
      expect(response.status).toBe(200);
    });

    test('Response body should match the Post schema', () => {
      expect(isValidPost(response.data)).toBe(true);
    });

    test('Returned post should have id=1 and userId=1', () => {
      expect(response.data.id).toBe(1);
      expect(response.data.userId).toBe(1);
    });

    test('Post title should be the known value from JSONPlaceholder', () => {
      expect(response.data.title).toBe(
        'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      );
    });
  });

  // TEST 3: GET /posts/:id/comments
  describe('GET /posts/1/comments — Fetch comments for a post', () => {
    let response;

    beforeAll(async () => {
      response = await client.get('/posts/1/comments');
    });

    test('Should return HTTP 200', () => {
      expect(response.status).toBe(200);
    });

    test('Response body should be an array of 5 comments', () => {
      expect(Array.isArray(response.data)).toBe(true);
      expect(response.data).toHaveLength(5);
    });

    test('Every comment should match the Comment schema', () => {
      response.data.forEach((comment) => {
        expect(isValidComment(comment)).toBe(true);
      });
    });

    test('All comments should belong to postId=1', () => {
      response.data.forEach((comment) => {
        expect(comment.postId).toBe(1);
      });
    });
  });

  // TEST 4: POST /posts
  describe('POST /posts — Create a new post', () => {
    const payload = {
      title: 'Axios Test Post',
      body: 'Automated test payload via axios interceptor suite',
      userId: 7,
    };
    let response;

    beforeAll(async () => {
      response = await client.post('/posts', payload);
    });

    test('Should return HTTP 201 (Created)', () => {
      expect(response.status).toBe(201);
    });

    test('Response body should echo back all submitted fields', () => {
      expect(response.data.title).toBe(payload.title);
      expect(response.data.body).toBe(payload.body);
      expect(response.data.userId).toBe(payload.userId);
    });

    test('Response body should contain a generated id (id=101 for JSONPlaceholder)', () => {
      expect(typeof response.data.id).toBe('number');
      expect(response.data.id).toBe(101);
    });
  });

  // TEST 5: POST /todos
  describe('POST /todos — Create a new todo', () => {
    const payload = {
      title: 'Write Axios test suite',
      completed: false,
      userId: 3,
    };
    let response;

    beforeAll(async () => {
      response = await client.post('/todos', payload);
    });

    test('Should return HTTP 201 (Created)', () => {
      expect(response.status).toBe(201);
    });

    test('Response body should match the Todo schema', () => {
      expect(isValidTodo(response.data)).toBe(true);
    });

    test('Response body should echo back all submitted fields', () => {
      expect(response.data.title).toBe(payload.title);
      expect(response.data.completed).toBe(payload.completed);
      expect(response.data.userId).toBe(payload.userId);
    });

    test('Response body should contain a generated id', () => {
      expect(typeof response.data.id).toBe('number');
      expect(response.data.id).toBeGreaterThan(0);
    });
  });
});
