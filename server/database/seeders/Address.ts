import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Address from 'App/Models/Address'

export default class AddressSeeder extends BaseSeeder {
  public async run () {
    // Addresses Test
    await Address.create({
      streetAddress1: '1234',
      streetAddress2: '1234',
      city: 'test',
      state: 'OK',
      zipcode: '73014-1234'
    })
  }
}
