const { DynamoDBClient, ScanCommand } = require('@aws-sdk/client-dynamodb');
const { mockClient } = require('aws-sdk-client-mock');
const { handler } = require('./index');

const ddbMock = mockClient(DynamoDBClient);

describe('Lambda Function', () => {
  beforeEach(() => {
    ddbMock.reset();
  });

  it('should return success response', async () => {
    const event = {}; // define your test event if needed
    const expectedResult = { id: '1', name: 'Test Item' };
    
    ddbMock.on(ScanCommand).resolves({
      Items: [expectedResult],
      Count: 1,
      ScannedCount: 1,
      $metadata: {
        httpStatusCode: 200,
        requestId: 'VGBQT5R1G9C9G670410LJNVGUJVV4KQNSO5AEMVJF66Q9ASUAAJG',
        attempts: 1,
        totalRetryDelay: 0
      }
    });

    const result = await handler(event);

    expect(result).toEqual({
      statusCode: 200,
      body: JSON.stringify([expectedResult])
    });
  });
});
