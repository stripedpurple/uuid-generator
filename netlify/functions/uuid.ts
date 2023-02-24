import {genUUIDsServer}  from '../../src/utils/serverUUID'

exports.handler = async (event) => {  
    let {rawQuery} = event

    rawQuery = new Map(rawQuery.split('&').map(q => q.split('=')))

    return {
      statusCode: 200,
      body: JSON.stringify(genUUIDsServer(rawQuery.get('count') ?? 5)),  
    };
};