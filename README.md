# Bucket Zip

Download a directory from an Amazon S3 bucket as zip file.

## Install

```
npm install bucket-zip --save
```

## Usage

```javascript

var BucketZip = require('bucket-files');
var bucketZip = BucketZip.connect({
  key: 's3-key',
  secret: 's3-secret'
  bucket: 'name-of-the-s3-bucket'
});


// Stream a zip file of a directory
// "res" is a node response object

bucketZip('some_dirctory_in_a_bucket').pipe(res);

```
