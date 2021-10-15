import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Form from 'App/Models/Form'
import Event from 'App/Models/Event'

export default class FormSeeder extends BaseSeeder {
  public async run () {
    const event = await Event.find(1)

    await Form.createMany([
      {
        formType: 'In-Person',
        formQuestions: {
          question1: {
            type: 'Dropdown',
            title: 'Q1',
            responses: ['1', '2', '3', '4']
          },
          question2: {
            type: 'text',
            title: 'Q2',
            placeholder: 'Test Question 2'
          }
        },
        eventId: event?.id
      },
      {
        formType: 'Online',
        formQuestions: {
          question1: {
            type: 'Dropdown',
            title: 'Q1',
            responses: ['1', '2', '3', '4']
          },
          question2: {
            type: 'text',
            title: 'Q2',
            placeholder: 'Test Question 2'
          }
        },
        eventId: event?.id
      }
    ])
  }
}
