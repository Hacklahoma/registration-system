import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
//import Application from '@ioc:Adonis/Core/Application'


export default class IndexSeeder extends BaseSeeder {
  private async runSeeder(seeder: { default: typeof BaseSeeder }) {
    /**
     * Do not run when not in dev mode and seeder is development
     * only
     *
    if (seeder.default.developmentOnly && !Application.inDev) {
      return
    }*/

    await new seeder.default(this.client).run()
  }

  public async run() {
    await this.runSeeder(await import('../User'))
    await this.runSeeder(await import('../Address'))
    await this.runSeeder(await import('../Event'))
    await this.runSeeder(await import('../Form'))
    await this.runSeeder(await import('../Team'))
    await this.runSeeder(await import('../Application'))
    await this.runSeeder(await import('../ConfirmEmail'))
  }

}
