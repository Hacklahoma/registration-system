import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  hasMany,
  HasMany
} from '@ioc:Adonis/Lucid/Orm'
import Application from './Application'
import Team from './Team'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column({columnName: 'first_name'})
  public firstName: string

  @column()
  public lastName: string

  @column()
  public status: 'Unactivated' | 'Inactive' | 'Active' | 'Registered'

  @column()
  public accountType: 'Hacker' | 'Mentor' | 'Volunteer' | 'Judge' | 'Admin'

  @column()
  public discordId?: BigInt

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true })
  public lastLogin: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  /* REFERENCES */
  @hasMany(() => Application)
  applications: HasMany<typeof Application>

  @hasMany(() => Team)
  teams: HasMany<typeof Team>
}
