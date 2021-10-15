import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Event from 'App/Models/Event'
import Address from 'App/Models/Address'
import User from 'App/Models/User'
import { DateTime } from 'luxon'

export default class EventSeeder extends BaseSeeder {
  public async run () {
    // Event Creation Test

    const user = await User.find(1);
    const address = await Address.find(1);

    await Event.create({
      name: 'Hacklahoma 22',
      description: 'something goes here',
      eventDate: DateTime.local(),
      registrationCutOff: DateTime.local(),
      type: 'Hybrid',
      currentNumberOfApplicants: 10,
      acceptanceDays: 10,
      numberOfGroups: 4,
      addressId: address?.id,
      createdBy: user?.id,
      updatedBy: user?.id
    })
  }
}
