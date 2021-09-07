import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Events extends BaseSchema {
  protected tableName = 'events'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 256).notNullable()
      table.text('description')
      table.dateTime('event_date').notNullable()
      table.dateTime('registration_cut_off').notNullable()
      table.enum('type', ['In-Person', 'Online', 'Hybrid'])

      table.integer('address_id').unsigned().references('id').inTable('addresses')

      table.integer('current_number_of_applicants').notNullable()
      table.integer('acceptance_days').notNullable()
      table.integer('number_of_groups')
      
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.integer('created_by').unsigned().references('id').inTable('users')
      table.timestamp('updated_at', { useTz: true })
      table.integer('updated_by').unsigned().references('id').inTable('users')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
