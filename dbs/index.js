// Set up mongoose connection
const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOST, MONGO_DATABASE } = process.env
const mongoose = require('mongoose');
const mongoDB = `mongodb://${MONGO_USERNAME}:${encodeURIComponent(MONGO_PASSWORD)}@${MONGO_HOST}/${MONGO_DATABASE}` // + encodeURIComponent("v5hTg$=g>gZZXS2:6\\") + '@ds243502.mlab.com:43502/hit-web-technologies' // process.env.MONGODB_URI || dev_db_url;process.env.MONGO_URL
mongoose.Promise = global.Promise;

async function connect (url) {
  return mongoose.connect(url).then(db => db.connection)
}

module.exports = async function() {
  return await connect(mongoDB)
}