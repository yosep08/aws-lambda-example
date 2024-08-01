const AWS = require('aws-sdk-mock');
const { handler } = require('./index');

describe('Lambda Function', () => {
  afterEach(() => {
    AWS.restore('DynamoDB.DocumentClient');
  });

  it('should return success response', async () => {
    AWS.mock('DynamoDB.DocumentClient', 'get', (params, callback) => {
      callback(null, { Item: { id: '1', name: 'Test Item' } });
    });

    const event = {}; // masukkan event yang sesuai
    const result = await handler(event);

    expect(result).toEqual({ statusCode: 200, body: JSON.stringify({ id: '1', name: 'Test Item' }) });
  });
});
