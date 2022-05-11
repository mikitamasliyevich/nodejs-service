const { request: unauthorizedRequest, routes } = require('../lib');
const debug = require('debug')('rs:test:boards');
const {
  createAuthorizedRequest,
  shouldAuthorizationBeTested
} = require('../utils');

const TEST_BOARD_DATA = {
  title: 'Autotest board',
  columns: [
    { title: 'Backlog', order: 1 },
    { title: 'Sprint', order: 2 }
  ]
};
describe('Boards suite', () => {
  let request = unauthorizedRequest;
  let testBoardId;

  beforeAll(async () => {
    if (shouldAuthorizationBeTested) {
      request = await createAuthorizedRequest(unauthorizedRequest);
    }

    await request
      .post(routes.boards.create)
      .set('Accept', 'application/json')
      .send(TEST_BOARD_DATA)
      .then(res => (testBoardId = res.body.id));
  });

  afterAll(async () => {
    await request
      .delete(routes.boards.delete(testBoardId))
      .then(res => expect(res.status).oneOf([200, 204]));
  });

  describe('GET', () => {
    it('should get all boards', async () => {
      await request
        .get(routes.boards.getAll)
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          debug(res.body);
          expect(res.body).to.be.an('array');
          jestExpect(res.body).not.toHaveLength(0);
        });
    });

    it('should get a board by id', async () => {
      // Setup
      let expectedBoard;

      await request
        .get(routes.boards.getAll)
        .expect(200)
        .then(res => {
          jestExpect(Array.isArray(res.body)).toBe(true);
          jestExpect(res.body).not.toHaveLength(0);
          jestExpect(res.body.find(e => e.id === testBoardId)).not.toBe(
            undefined
          );
          expectedBoard = res.body.find(e => e.id === testBoardId);
        });

      // Test
      await request
        .get(routes.boards.getById(testBoardId))
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          jestExpect(res.body).toEqual(expectedBoard);
        });
    });
  });

  describe('POST', () => {
    it('should create board successfully', async () => {
      let boardId;

      await request
        .post(routes.boards.create)
        .set('Accept', 'application/json')
        .send(TEST_BOARD_DATA)
        .expect(201)
        .expect('Content-Type', /json/)
        .then(res => {
          boardId = res.body.id;
          expect(res.body.id).to.be.a('string');
          jestExpect(res.body).toMatchObject(TEST_BOARD_DATA);
        });

      // Teardown
      await request.delete(routes.boards.delete(boardId))
          .then(res => expect(res.status).oneOf([200, 204]));
    });
  });

  describe('PUT', () => {
    it('should update board successfully', async () => {
      // Setup
      let boardToUpdate;

      await request
        .post(routes.boards.create)
        .set('Accept', 'application/json')
        .send(TEST_BOARD_DATA)
        .then(res => {
          boardToUpdate = res.body;
        });

      const updatedBoard = {
        ...boardToUpdate,
        title: 'Autotest updated board'
      };

      // Test
      await request
        .put(routes.boards.update(boardToUpdate.id))
        .set('Accept', 'application/json')
        .send(updatedBoard)
        .expect(200)
        .expect('Content-Type', /json/);

      await request
        .get(routes.boards.getById(updatedBoard.id))
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => jestExpect(res.body).toMatchObject(updatedBoard));

      // Teardown
      await request.delete(routes.boards.delete(updatedBoard.id))
          .then(res => expect(res.status).oneOf([200, 204]));
    });
  });
});
