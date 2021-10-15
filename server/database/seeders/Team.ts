import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Team from 'App/Models/Team'

export default class TeamSeeder extends BaseSeeder {
  public async run () {
    await Team.create({
      name: 'Test Team',
      public: false,
    })
  }
}
