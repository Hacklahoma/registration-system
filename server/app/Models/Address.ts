import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({columnName: 'street_address_1'})
  public streetAddress1: string

  @column({columnName: 'street_address_2'})
  public streetAddress2?: string

  @column()
  public city: string

  @column()
  public state: string

  @column()
  public zipcode: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
