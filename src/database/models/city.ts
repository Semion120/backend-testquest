import {
  Entity,
  ObjectId,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from '@mikro-orm/mongodb'

@Entity()
export default class City {
  @PrimaryKey()
  _id!: ObjectId

  @SerializedPrimaryKey()
  id!: number

  @Property()
  name: string

  @Property()
  data: string

  constructor(id: number, name: string, data: string) {
    this.id = id
    this.name = name
    this.data = data
  }
}
