import { defineConfig } from '@mikro-orm/mongodb'
import { Citizen, City } from './models'
require('dotenv').config()

export default defineConfig({
  entities: [Citizen, City],
  dbName: 'MongoDbTest',
  clientUrl: process.env.MONGO,
})
