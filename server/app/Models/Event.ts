import { DateTime } from 'luxon'
import { 
  BaseModel, 
  column,
  HasOne,
  hasOne,
  BelongsTo,
  belongsTo
} from '@ioc:Adonis/Lucid/Orm'
import Address from './Address'
import User from './User'

export default class Event extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description?: string

  @column()
  public eventDate: DateTime

  @column()
  public registrationCutOff: DateTime

  @column()
  public type: 'In-Person' | 'Online' | 'Hybrid'

  @column()
  public addressId: number

  @hasOne(() => Address, {localKey: 'address_id', foreignKey: 'id'})
  public address: HasOne<typeof Address>

  @column()
  public currentNumberOfApplicants: number

  @column()
  public acceptanceDays: number

  @column()
  public numberOfGroups: number

  @column()
  public createdBy: number

  @belongsTo(() => User)
  public createdByUser: BelongsTo<typeof User>

  @column()
  public updatedBy: number

  @belongsTo(() => User)
  public updatedByUser: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
