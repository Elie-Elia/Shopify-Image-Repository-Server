const gcs = require('@google-cloud/storage');

const storage = new gcs.Storage({
    projectId: "meta-sanctum-301915",
    keyFilename: "./firebase-credentials.json"
});
const bucket = storage.bucket("shopify-image-repository");

module.exports = {
  bucket
}