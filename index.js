const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const params = {
        TableName: 'PeopleTable'
    };

    try {
        const data = await dynamo.scan(params).promise();
        const response = {
            statusCode: 200,
            body: JSON.stringify(data.Items)
        };
        return response;
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not fetch data' })
        };
    }
};
