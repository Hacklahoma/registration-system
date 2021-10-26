import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from 'App/Models/Application';
import CreateApplicationValidator from 'App/Validators/CreateApplicationValidator';

export default class ApplicationsController {
    /**
     * @name getAllApplications
     * @description Grabs an array of all applications stored on the database
     * @type GET
     * @route /endpoints/application/getAllApplications
     * 
     * @returns An array of all applications stored on the database
     */
     public async getAllApplications({ response }: HttpContextContract) {
        const applications = await Application.all();

        //No applications found case
        if (!applications || applications.length == 0) {
            return response.badRequest({error: "No applications found."});
        }

        return applications;
    }

    /**
     * @name getApplication
     * @description Grabs a target application from the database
     * @type GET
     * @route /endpoints/application/getApplication
     * 
     * @param id The id of the target application 
     * 
     * @returns A JSON representation of the target application
     */
    public async getApplication({ response, request }: HttpContextContract) {
        const targetApplication = await Application.findBy('id', request.param('id'));

        //Application not found case
        if (!targetApplication) {
            return response.badRequest({error: "No application found."});
        }

        return targetApplication.toJSON();
    }

    /**
     * @name createApplication
     * @description Creates a new application
     * @type POST
     * @route /endpoints/application/createApplication
     * 
     * @param 
     * 
     * @returns A JSON of the new application
     */
    public async createApplication({ auth, response, request }: HttpContextContract) {
        // In order to check if the token is actually legit
        await auth.use('api').authenticate();
        // Get the user from that token
        const user = auth.use('api').user;

        //Admin Check
        if (user) {
            if (user.accountType !== 'Admin') {
                return response.badRequest({error: "User must be an admin."});
            }
        } else {
            return response.badRequest({error: "User not found."});
        }
        
        //Read in data and create a new application with the created data
        const data = await request.validate(CreateApplicationValidator);
        const newApplication = await Application.create(data);

        //Save the new application and return its JSON
        await newApplication.save();
        return newApplication.toJSON();
    }

    /**
     * @name editApplication
     * @description Edits a target application
     * @type POST
     * @route /endpoints/application/editApplication
     * 
     * @param id The id of the target application
     * @param 
     * 
     * @returns A JSON of the edited application
     */
    public async editApplication({ auth, response, request }: HttpContextContract) {
        // In order to check if the token is actually legit
        await auth.use('api').authenticate();
        // Get the user from that token
        const user = auth.use('api').user;

        //Admin Check
        if (user) {
            if (user.accountType !== 'Admin') {
                return response.badRequest({error: "User must be an admin."});
            }
        } else {
            return response.badRequest({error: "User not found."});
        }
        
        const targetApplication = await Application.findBy('id', request.input('id'));

        //Application not found case
        if (!targetApplication) {
            return response.badRequest({error: "The target application was not found."});
        }

        //Read in new data and overwrite the old application's data
        const newData = await request.validate(CreateApplicationValidator);
        targetApplication.merge(newData).save();

        //Return the edited application's JSON
        return targetApplication.toJSON();
    }

    /**
     * @name deleteApplication
     * @description Deletes a target application
     * @type POST
     * @route /endpoints/application/deleteApplication
     * 
     * @param  id The id of the target application
     * 
     * @returns A JSON of the deleted application
     */
    public async deleteApplication({ auth, response, request }: HttpContextContract) {
        // In order to check if the token is actually legit
        await auth.use('api').authenticate();
        // Get the user from that token
        const user = auth.use('api').user;

        //Admin Check
        if (user) {
            if (user.accountType !== 'Admin') {
                return response.badRequest({error: "User must be an admin."});
            }
        } else {
            return response.badRequest({error: "User not found."});
        }

        const targetApplication = await Application.findBy('id', request.input('id'));

        //Application not found case
        if (!targetApplication) {
            return response.badRequest({error: "The target application was not found."});
        }

        //Delete the application and return its JSON
        //This is helpful in the case that we still need to access
        //the deleted application temporarily
        await targetApplication.delete();
        return targetApplication.toJSON();
    }
}
