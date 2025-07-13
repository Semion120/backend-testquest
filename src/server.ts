import {
  EntityManager,
  EntityRepository,
  MikroORM,
  RequestContext,
} from '@mikro-orm/mongodb'
import cors from 'cors'
import express from 'express'
import http from 'http'
import config from './database/config'
import { Citizen, City } from './database/models'
import { CityController, CityzenController } from './router'

export const AppInterface = {} as {
  server: http.Server
  orm: MikroORM
  em: EntityManager
  citizen: EntityRepository<Citizen>
  city: EntityRepository<City>
}

export const app = express()
const corsOptions = {
  origin: [
    'https://convert-file.ru',
    'https://api.convert-file.ru',
    'http://convert-file.ru',
    'http://api.convert-file.ru',
    'http://localhost:5173',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200,
  allowedHeaders: [
    'Accept-Version',
    'Authorization',
    'Credentials',
    'Content-Type',
  ],
}
app.use(cors(corsOptions))
const port = process.env.PORT || 3000

export const init = (async () => {
  AppInterface.orm = await MikroORM.init(config)
  AppInterface.em = AppInterface.orm.em
  AppInterface.citizen = AppInterface.orm.em.getRepository(Citizen)
  AppInterface.city = AppInterface.orm.em.getRepository(City)

  app.use(express.json())
  app.use((req, res, next) => RequestContext.create(AppInterface.orm.em, next))

  app.get('/', (req, res) => res.json({ message: 'Полет нормальный' }))
  app.use('/cityzen', CityzenController)
  app.use('/city', CityController)

  app.use((req, res) =>
    res.status(404).json({ message: 'Таких роутов не имеем' })
  )

  AppInterface.server = app.listen(port, () => {
    console.log(`Запущено по адресу: http://localhost:${port}`)
  })
})()
