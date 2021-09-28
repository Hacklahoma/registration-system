import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Event from './Event'

export default class Form extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public formType: 'In-Person' | 'Online' | 'Hybrid'

  @column()
  public formQuestions: Object

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  /* References */
  @column()
  public eventId: number

  @belongsTo(() => Event)
  public event: BelongsTo<typeof Event>
}
