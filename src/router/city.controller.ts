import { City } from '@/database/models'
import { Request, Response, Router } from 'express'
import { AppInterface } from '../server'
import cities from './data/cities'

const CityController = Router()

CityController.get('/', async (req: Request, res: Response) => {
  const citysBd = await AppInterface.city.findAll()
  res.json(citysBd)
})

CityController.get('/start', async (req: Request, res: Response) => {
  const cityRes: City[] = []
  cities.forEach((el) => {
    const item = AppInterface.city.create(el)
    cityRes.push(item)
  })

  try {
    await AppInterface.em.persist(cityRes).flush()
    res.json({ massage: 'Done' })
  } catch (e) {
    res.json({ message: 'Error', data: e })
  }
})

export default CityController
