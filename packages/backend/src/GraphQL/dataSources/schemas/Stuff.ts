import { Schema } from 'mongoose'
import db from '../../../db'

export default db.models.stuff || db.model('stuff', new Schema({
  name: String,
  type: String
}, { timestamps: true }))
