import {
  Entity,
  ObjectId,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from '@mikro-orm/mongodb'

@Entity()
export default class Citizen {
  @PrimaryKey()
  _id!: ObjectId

  @SerializedPrimaryKey()
  id!: number

  @Property()
  name: string

  @Property()
  city_id: number

  @Property()
  groups: Group[]

  constructor(id: number, name: string, city_id: number, groups: Group[]) {
    this.id = id
    this.name = name
    this.city_id = city_id
    this.groups = groups
  }
}

interface Group {
  type: string
  name: string
}
