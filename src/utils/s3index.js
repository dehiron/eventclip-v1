import AWS from "aws-sdk";
require('dotenv').config();

const bucketName = "eventclip";

AWS.config.update({
  region: "ap-northeast-1",
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID
  })
});

const bucket = new AWS.S3({
  params: {
    Bucket: bucketName
  }
});

export function listObjects() {
  const listObjects = new Promise((resolve, reject) => {
    bucket.listObjects((error, data) => {
      if (error) {
        console.error("error: ", error);
        return;
      }

      resolve(data.Contents);
    });
  });

  return listObjects;
}

export function getSingleObject(key) {
  const getSingleObject = new Promise((resolve, reject) => {
    bucket.getObject(
      {
        Bucket: bucketName,
        Key: key
      },
      (error, data) => {
        if (error) {
          console.error("error: ", error);
          return;
        }

        resolve(data.Body.toString("base64"));
      }
    );
  });

  return getSingleObject;
}

export function saveObject(file) {
  const saveObject = new Promise((resolve, reject) => {
    bucket.putObject(
      {
        Key: file.name,
        Body: file,
        ACL: "public-read"
      },
      (error, data) => {
        if (error) {
          console.error("error: ", error);
          return;
        }

        resolve(data);
      }
    );
  });

  return saveObject;
}
