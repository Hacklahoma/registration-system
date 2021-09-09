import { DateTime } from 'luxon'
import { 
  BaseModel, 
  column,
  BelongsTo,
  belongsTo,
  HasMany,
  hasMany
} from '@ioc:Adonis/Lucid/Orm'
import Address from './Address'
import User from './User'
import Form from './Form'

export default class Event extends BaseModel {
  /* Columns */
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
  public currentNumberOfApplicants: number

  @column()
  public acceptanceDays: number

  @column()
  public numberOfGroups: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  /* References */
  @column()
  public addressId?: number

  @belongsTo(() => Address, {localKey: 'id', foreignKey: 'addressId'})
  public address: BelongsTo<typeof Address>

  @column()
  public createdBy: number

  @belongsTo(() => User, {localKey: 'id', foreignKey: 'createdBy'})
  public createdByUser: BelongsTo<typeof User>

  @column()
  public updatedBy: number

  @belongsTo(() => User, {localKey: 'id', foreignKey: 'updatedBy'})
  public updatedByUser: BelongsTo<typeof User>

  @hasMany(() => Form)
  public forms: HasMany<typeof Form>
}
