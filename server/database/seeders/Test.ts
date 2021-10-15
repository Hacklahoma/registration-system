import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Address from 'App/Models/Address'
import ConfirmEmail from 'App/Models/ConfirmEmail'
import Event from 'App/Models/Event'
import Form from 'App/Models/Form'
import User from 'App/Models/User'
import { DateTime } from 'luxon'

export default class TestSeeder extends BaseSeeder {
  public async run () {
    const user = await User.createMany([
        {
            email: 'admin@test.com',
            password: 'p4ssw0rd',
            firstName: 'admin',
            lastName: 'admin',
            status: 'Active',
            accountType: 'Admin',
            discordId: 1n
        },
        {
            email: 'hacker@test.com',
            password: 'p4ssw0rd',
            firstName: 'hacker',
            lastName: 'thon',
            status: 'Active',
            accountType: 'Hacker',
            discordId: 2n
        },

    ])
    // User Creation Test
    /*const user = await User.create({
      email: 'test@test.com',
      password: 'p4ssw0rd',
      firstName: 'test',
      lastName: 'test',
      status: 'Active',
      accountType: 'Admin',
      discordId: 1n
    })

    // Addresses Test
    const address = await Address.create({
      streetAddress1: '1234',
      streetAddress2: '1234',
      city: 'test',
      state: 'OK',
      zipcode: '73014-1234'
    })

    // Event Creation Test

    const event = await Event.create({
      name: 'Hacklahoma 22',
      description: 'something goes here',
      eventDate: DateTime.local(),
      registrationCutOff: DateTime.local(),
      type: 'Hybrid',
      currentNumberOfApplicants: 10,
      acceptanceDays: 10,
      numberOfGroups: 4,
      addressId: address.id,
      createdBy: user.id,
      updatedBy: user.id
    })

    const forms = await Form.createMany([
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
        eventId: event.id
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
        eventId: event.id
      }
    ])

    const eventTest = await Event.query().where('id', 1).preload('address').preload('forms').first();

    console.log(eventTest?.address.streetAddress1);
  }
}
