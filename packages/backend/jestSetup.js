const { mongoUri } = require('./src/config')
const db = require('./src/db')['default']
const conn = db.openUri(mongoUri, { useNewUrlParser: true, useFindAndModify: false })

beforeAll(ready => conn.once('open', () => ready()).on('error', console.error))

afterAll(done => conn.dropDatabase(() => conn.close().then(() => done())))
