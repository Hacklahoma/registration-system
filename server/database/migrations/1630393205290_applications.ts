import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Applications extends BaseSchema {
  protected tableName = 'applications'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('form_id').unsigned().references('id').inTable('forms').onDelete('CASCADE');
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.enum('status', [
        'InProgress',
        'Submitted',
        'Waitlisted',
        'Admitted',
        'Confirmed',
        'Declined',
        'CheckedIn',
        'Expired'
      ]).notNullable().defaultTo('InProgress')
      
      table.jsonb('question_responses')
      
      table.integer('team_id').unsigned().references('id').inTable('teams')
      table.integer('group')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
