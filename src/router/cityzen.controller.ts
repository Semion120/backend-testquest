import { Citizen } from '@/database/models'
import { Request, Response, Router } from 'express'
import { AppInterface } from '../server'
import cityzens from './data/citizens'

const CityzensController = Router()

CityzensController.get('/', async (req: Request, res: Response) => {
  const cityzensBd = await AppInterface.citizen.findAll()
  res.json(cityzensBd)
})

CityzensController.post('/add', async (req: Request, res: Response) => {
  const item = AppInterface.citizen.create(req.body)

  try {
    await AppInterface.em.persist(item).flush()
    res.json({ massage: 'Done' })
  } catch (e) {
    res.json({ message: 'Error', data: e })
  }
})

CityzensController.get('/restart', async (req: Request, res: Response) => {
  const cityzensRes: Citizen[] = []
  cityzens.forEach((el) => {
    const item = AppInterface.citizen.create(el)
    cityzensRes.push(item)
  })

  try {
    await AppInterface.em.persist(cityzensRes).flush()
    res.json({ massage: 'Done' })
  } catch (e) {
    res.json({ message: 'Error', data: e })
  }
})

CityzensController.get('/clear', async (req: Request, res: Response) => {
  const cityzensBd = await AppInterface.citizen.findAll()

  try {
    cityzensBd.forEach((el) => {
      AppInterface.em.removeAndFlush(el)
    })
    cityzensBd.forEach((el) => {
      AppInterface.em.removeAndFlush(el)
    })
    res.json({ massage: 'Done' })
  } catch (e) {
    res.json({ message: 'Error', data: e })
  }
})

export default CityzensController
