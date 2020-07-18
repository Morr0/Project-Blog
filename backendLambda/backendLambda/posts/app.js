// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {
    try {
        // const ret = await axios(url);
        console.log(event);

        const _return = routeBasedOnResource(event);
        response = {
            'statusCode': _return.status || 404,
            'body': JSON.stringify(_return.body || undefined)
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};

const returnObject = {
    status: 200,
    body: undefined,
}

function routeBasedOnResource(event){
    const _retrun = returnObject;

    // /posts/{id}
    if (event.resource.contains("{id}")){
        const pathArray = event.path.split("/");
        const id = pathArray[pathArray.length - 1];

        _return.body = id;
        return _retrun;
    }
    // 
    else if (event.resource.contains("posts")) {
        _retrun.body = "All";
        return _return;
    }
}
