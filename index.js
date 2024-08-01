const { DynamoDBClient, ScanCommand } = require('@aws-sdk/client-dynamodb');

const client = new DynamoDBClient();

exports.handler = async (event) => {
  const params = {
    TableName: 'PeopleTable',
  };

  try {
    const data = await client.send(new ScanCommand(params));
    const items = data.Items.map(item => ({
      id: item.id,
      name: item.name,
    }));
    return {
      statusCode: 200,
      body: JSON.stringify(items),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not fetch data' }),
    };
  }
};
