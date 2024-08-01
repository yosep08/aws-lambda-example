const AWS = require('aws-sdk-mock');
const { handler } = require('./index');

describe('Lambda Function', () => {
    beforeAll(() => {
        AWS.mock('DynamoDB.DocumentClient', 'scan', (params, callback) => {
            callback(null, { Items: [{ id: '1', nama: 'stallman', alamat: 'new york' }] });
        });
    });

    afterAll(() => {
        AWS.restore('DynamoDB.DocumentClient');
    });

    test('returns data from DynamoDB', async () => {
        const event = {};
        const result = await handler(event);
        const expected = {
            statusCode: 200,
            body: JSON.stringify([{ id: '1', nama: 'stallman', alamat: 'new york' }])
        };

        expect(result).toEqual(expected);
    });
});
