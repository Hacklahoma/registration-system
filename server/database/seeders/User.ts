import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run () {
    // Create an admin and hacker account for testing
    await User.createMany([
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
  }
}
