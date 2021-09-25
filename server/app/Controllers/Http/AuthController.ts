import Hash from '@ioc:Adonis/Core/Hash';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';
import ConfirmEmail from 'App/Models/ConfirmEmail';
import User from 'App/Models/User';
import SignUpValidator from 'App/Validators/SignUpValidator';
import Mail from '@ioc:Adonis/Addons/Mail'
import { DateTime } from 'luxon';

export default class AuthController {
  /**
   * @name login
   * @description Logs a user in
   * @type POST
   * @route /api/auth/login/
   *
   * @param email
   * @param password
   * @returns a json including the session token
   */
  public async login({ request, auth, response }: HttpContextContract) {
    const email = request.input('email');
    const password = request.input('password');

    // Find User
    const user = await User.findBy('email', email);

    // Check to see if the user was found and the password is correct
    if (!user || !(await Hash.verify(user.password, password))) {
      return response.badRequest({ error: 'Please provide a valid email and password.' });
    }

    // Check to see if the User has been activated yet
    if(user.status === 'Unactivated') {
      return response.badRequest({ error: 'User has not been confirmed yet.' });
    }

    user.lastLogin = DateTime.local();
    await user.save();

    // Revoke any tokens if they are found
    await Database.rawQuery(`DELETE FROM api_tokens WHERE user_id='${user.id}';`);

    // Log the User in and get the token
    const token = await auth.use('api').generate(user, { expiresIn: '10 days' });

    // Return the Token
    return token.toJSON();
  }

  /**
   * @name logout
   * @description logs the user out and revokes the token associated with the user
   * @type POST
   * @route /api/auth/logout/
   *
   * @returns status of the revoked token
   */
  public async logout({ auth }: HttpContextContract) {
    const user = await auth.use('api').authenticate();
    if (user) {
      await Database.rawQuery(`DELETE FROM api_tokens WHERE user_id='${user.id}';`);
    }
    await auth.use('api').revoke();

    return { logout: true };
  }

  /**
   * @name signUp
   * @description Creates a user from within the website
   * @type POST
   * @route /api/auth/createUser/
   *
   * @param email Email of the new user
   * @param firstName The first name of new user
   * @param lastName The last name of new user
   * @param password Password of new user
   *
   * @returns The new user's details
   */
  public async signUp({ request }: HttpContextContract) {
    await request.validate(SignUpValidator);

    const newUser = new User();

    newUser.email = request.input('email');
    newUser.password = request.input('password');
    newUser.firstName = request.input('firstName');
    newUser.lastName = request.input('lastName');
    newUser.status = 'Unactivated';
    newUser.accountType = 'Hacker';
    newUser.lastLogin = DateTime.local();

    await newUser.save();

    // Create a new email confirmation
    const confirmEmail = await ConfirmEmail.create({
      user_id: newUser.id
    });

    await Mail.send((message) => {
      message
        .from('team@hacklahoma.org')
        .to(newUser.email)
        .subject('Hello!')
        .htmlView('emails/welcome', { 
          user: {
            firstName: newUser.firstName,
            lastName: newUser.lastName
          },
          url: `http://localhost:3333/api/confirm_email?code=${confirmEmail.code}`
        })
    })
    

    return newUser.toJSON();
  }
}
