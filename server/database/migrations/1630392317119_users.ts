import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('email', 255).notNullable().unique().index()
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()

      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.enum('status', ['Unactivated', 'Inactive', 'Active', 'Registered']).notNullable().defaultTo('Unactivated')
      table.enum('account_type', ['Hacker', 'Mentor', 'Volunteer', 'Judge', 'Admin']).notNullable().defaultTo('Hacker')
      table.bigInteger('discord_id')

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('last_login', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
