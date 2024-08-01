const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { ScanCommand } = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient();

exports.handler = async (event) => {
    const params = {
        TableName: 'PeopleTable',
    };

    try {
        const data = await client.send(new ScanCommand(params));
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not fetch data' }),
        };
    }
};
