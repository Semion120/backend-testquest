import { Citizen } from '@/database/models'
import { Request, Response, Router } from 'express'
import { AppInterface } from '../server'
import tools from '../tools'
import cityzens from './data/citizens'

const CityzensController = Router()

interface ICitizenResult {
  _id: string
  id: number
  name: string
  city_id: number
  groups: { [key: string]: string }
}
CityzensController.get('/', async (req: Request, res: Response) => {
  const cityzensBd = await AppInterface.citizen.findAll()

  const result: ICitizenResult[] = cityzensBd.map((el: any) => {
    const groupsNew: { [key: string]: string } = {}
    el.groups.forEach((el: any) => {
      groupsNew[el.type] = el.name
    })
    el.groups = groupsNew
    return el
  })
  res.json(result)
})

CityzensController.post('/add', async (req: Request, res: Response) => {
  const item = AppInterface.citizen.create(req.body)

  try {
    await AppInterface.em.persist(item).flush()
    res.json({ massage: 'Done' })
  } catch (e) {
    res.status(500).json({ message: 'Error', data: e })
  }
})

CityzensController.get('/start', async (req: Request, res: Response) => {
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

CityzensController.get('/randomize', async (req: Request, res: Response) => {
  const cityzensBd = await AppInterface.citizen.findAll()

  const cityzensRes: Citizen[] = cityzensBd.map((el) => {
    const randomCountry = tools.randomFromArr(['Россия', 'Казахстан'])
    const randomHouse = tools.randomFromArr([
      'Дом 23',
      'Дом 15',
      'Дом 12',
      'Дом 36',
      'Дом 105',
    ])

    el.groups.push(
      { type: 'country', name: randomCountry },
      { type: 'house', name: randomHouse }
    )
    return el
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
