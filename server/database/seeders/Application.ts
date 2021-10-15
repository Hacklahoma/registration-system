import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Application from 'App/Models/Application'
import Form from 'App/Models/Form'
import User from 'App/Models/User'
import Team from 'App/Models/Team'

export default class ApplicationSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    const user = await User.find(2)
    const form = await Form.find(1)
    const team = await Team.find(1) 

    await Application.create({
      status: 'InProgress',
      questionResponses: {
        "event_id": 1,
        "num_of_question": 5,
        "form_type": "Hybrid",
        "questions": [
          {
            "type": "input",
            "title": "Test Input"
          },
          {
            "type": "text",
            "title": "Test Text Box"
          },
          {
            "type": "radio",
            "title": "Test Radio Choice",
            "other": true,
            "answers": [
              "answer 1",
              "answer 2",
              "answer 3"
            ]
          },
          {
            "type": "grid",
            "title": "Test Checkbox Grid",
            "other": false,
            "answers": [
              "answer 1",
              "answer 2",
              "answer 3"
            ]
          },
          {
            "type": "checkbox",
            "title": "Checkbox Test"
          }
        ]
      },
      group: 1,
      formId: form?.id,
      userId: user?.id,
      teamId: team?.id
    })
  }
}
