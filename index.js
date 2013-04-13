var assert = require('assert');
var Stream = require('stream');
var BucketFiles = require('bucket-files');
var archiver = require('archiver')

exports.connect = function (opts) {
  assert.ok(opts, 'AWS S3 options must be defined.');
  assert.notEqual(opts.key, undefined, 'Requires S3 AWS Key.');
  assert.notEqual(opts.secret, undefined, 'Requres S3 AWS Secret');
  assert.notEqual(opts.bucket, undefined, 'Requires AWS S3 bucket name.');
  
  //
  return function (path, callback) {
    if (!path) {
      return null;
    }
    
    var archive = archiver('zip');
    var bucketFiles = BucketFiles.connect(opts);
    var stream = new Stream();
    
    //
    bucketFiles(path).on('data', function (file) {
      archive.append(file.data, {name: file.path});
    }).on('end', function () {
      archive.finalize(function (err, written) {
        if (err) {
          throw err;
        }
      });
    });
    
    //
    archive.on('error', function (err) {
      throw err;
    });
    
    return archive;
  };
};