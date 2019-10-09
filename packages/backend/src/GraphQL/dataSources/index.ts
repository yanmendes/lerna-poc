import { stuff } from './schemas'
import { MongoDataSource } from 'apollo-datasource-mongo'

class DefaultMongooseCollection extends MongoDataSource {
  collections
  debug = true
  mongoose = true
}

class Stuff extends DefaultMongooseCollection {
  collections = [stuff]

  get() {
    return stuff.find()
  }

  create(s) {
    return stuff.create(s)
  }
}

export default () => ({
  stuff: new Stuff()
}) as any
