import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Form from './Form'
import User from './User'
import Team from './Team'

export default class Application extends BaseModel {
  /* COLUMNS */
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public status: 'InProgress'| 'Submitted' | 'Waitlisted'| 'Admitted'  | 
                 'Confirmed' | 'Declined'  | 'CheckedIn' | 'Expired'

  @column()
  public questionResponses: Object

  @column()
  public group: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  /* REFERENCES */
  @column()
  public formId: number

  @belongsTo(() => Form)
  public form: BelongsTo<typeof Form>

  @column()
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column()
  public teamId: number

  @belongsTo(() => Team)
  public team: BelongsTo<typeof Team>
}
