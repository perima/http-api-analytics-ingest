
import { DateTime } from "luxon";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import flatten from 'flat';

/**
 * 
 * Simple http api endpoint that stores events it receives in S3
 * 
 * @param {String} key 
 * @param {Object} data 
 * @returns {Object}
 */

async function putObjectToS3(key, data) {
    let dt = DateTime.now();
    let datestr = dt.toFormat('yyyy-MM-dd').toString();
    console.log('folder date', datestr);

    try {
        const client = new S3Client({});
        const command = new PutObjectCommand({
            Bucket: 's3-bucket-used-to-store-events',
            Key: datestr + '/' + key,
            Body: JSON.stringify(data),
        });

        const response = await client.send(command);

        return {
            status: 201,
            message: response
        };
    } catch (err) {
        return {
            status: err.status,
            message: err.message
        }
    }
}

/**
 * 
 * @param {
 * 
 * } headers {Object}
 * @returns {Boolean}
 */
function authorise(headers) {
    /*
   //  add your header auth here 
   // make sure you have an authoriser in place for your API before deploying!

    for example 
    if (
            event.headers['x-api-key'] !== 'api-key'
            || event.headers['x-app-id'] !== 'dsadsadsadsa'
        ) {
            statusCode = 400;
            body = JSON.stringify({ error: 'request unauthorized' });
            console.error('unauthorised');

            return {
                statusCode,
                body,
                headers,
            };
        }

     */

    // this will block all requests by default, if you set to true it will allow all (not recommended)
    return false;
}

// Lambda function handler
export const handler = async (event, context) => {
    console.log('event', JSON.stringify(event, null, 2));

    let body = { "message": "not found" };
    let statusCode = 404;
    const headers = {
        "Content-Type": "application/json",
    };

    if (authorise === false) {
        statusCode = 401;
        body = { "message": "Unauthorized" }
    } else if (authorise === true) {
        try {
            switch (event.routeKey) {
                case "DELETE /items/{id}":
                    // do nothing
                    break;
                case "GET /items/{id}":
                    // do nothing 
                    break;
                case "GET /items":
                    // do nothing
                    break;
                case "PUT /items/{id}":
                    let requestJSON = JSON.parse(event.body);
                    body = `Put item ${requestJSON.id}`;
                    let flatJson = await flatten(requestJSON);
                    await putObjectToS3(requestJSON.id + '.json', flatJson);
                    break;
                default:
                    throw new Error(`Unsupported route: "${event.routeKey}"`);
            }
        } catch (err) {
            statusCode = 500;
            body = err.message;
            return {
                statusCode,
                body,
                headers,
            }
        } finally {
            body = JSON.stringify(body);
        }
    }
    return {
        statusCode,
        body,
        headers,
    }
};