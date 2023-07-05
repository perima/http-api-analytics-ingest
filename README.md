# http-api-analytics-ingest

A simple serverless AWS http API that stores transmitted messages in S3.


# Deploy steps 

1. Setup the lambda function 

2. Set up AWS API gateway using the lambda as the integration (sample definition for API gateway below)


#  AWS API GateWay http definition. 

{
  "openapi" : "3.0.1",
  "info" : {
    "title" : "simple-http-api-ingent",
    "version" : "2023-07-01 01:24:55UTC"
  },
  "servers" : [ {
    "url" : "YOUR_API_GW_API_HTTP_END_POINT/{basePath}",
    "variables" : {
      "basePath" : {
        "default" : ""
      }
    }
  } ],
  "tags" : [  ],
  "paths" : {
    "/items" : {
      "get" : {
        "responses" : {
          "default" : {
            "description" : "Default response for GET /items"
          }
        },
        "x-amazon-apigateway-integration" : {
          "payloadFormatVersion" : "2.0",
          "type" : "aws_proxy",
          "httpMethod" : "POST",
          "uri" : "API GW Lambda integration endpoint",
          "connectionType" : "INTERNET"
        }
      }
    },
    "/items/{id}" : {
      "get" : {
        "responses" : {
          "default" : {
            "description" : "Default response for GET /items/{id}"
          }
        },
        "x-amazon-apigateway-integration" : {
          "payloadFormatVersion" : "2.0",
          "type" : "aws_proxy",
          "httpMethod" : "POST",
          "uri" : "API GW Lambda integration endpoint",
          "connectionType" : "INTERNET"
        }
      },
      "put" : {
        "responses" : {
          "default" : {
            "description" : "Default response for PUT /items/{id}"
          }
        },
        "x-amazon-apigateway-integration" : {
          "payloadFormatVersion" : "2.0",
          "type" : "aws_proxy",
          "httpMethod" : "POST",
          "uri" : "API GW Lambda integration endpoint",
          "connectionType" : "INTERNET"
        }
      },
      "parameters" : [ {
        "name" : "id",
        "in" : "path",
        "description" : "Generated path parameter for id",
        "required" : true,
        "schema" : {
          "type" : "string"
        }
      } ]
    }
  },
  "x-amazon-apigateway-importexport-version" : "1.0"
}