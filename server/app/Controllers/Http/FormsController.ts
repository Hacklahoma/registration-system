import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Form from 'App/Models/Form';
import CreateFormValidator from 'App/Validators/CreateFormValidator';

export default class FormsController {
    /**
     * @name getAllForms
     * @description Grabs an array of all forms stored on the database
     * @type GET
     * @route /endpoints/form/getAllForms
     * 
     * @returns An array of all forms stored on the database
     */
    public async getAllForms({ response }: HttpContextContract) {
        const forms = await Form.all();

        //No forms found case
        if (!forms || forms.length == 0) {
            return response.badRequest({error: "No forms found."});
        }

        return forms;
    }

    /**
     * @name getForm
     * @description Grabs a target form from the database
     * @type GET
     * @route /endpoints/form/getForm
     * 
     * @param id The id of the target form 
     * 
     * @returns A JSON representation of the target form
     */
    public async getForm({ response, request }: HttpContextContract) {
        const targetForm = await Form.findBy('id', request.param('id'));

        //Form not found case
        if (!targetForm) {
            return response.badRequest({error: "No form found."});
        }

        return targetForm.toJSON();
    }

    /**
     * @name createForm
     * @description Creates a new form
     * @type POST
     * @route /endpoints/form/createForm
     * 
     * @param 
     * 
     * @returns A JSON of the new form
     */
    public async createForm({ auth, response, request }: HttpContextContract) {
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
        
        //Read in data and create a new form with the created data
        const data = await request.validate(CreateFormValidator);
        const newForm = await Form.create(data);

        //Save the new form and return its JSON
        await newForm.save();
        return newForm.toJSON();
    }

    /**
     * @name editForm
     * @description Edits a target form
     * @type POST
     * @route /endpoints/form/editForm
     * 
     * @param id The id of the target form
     * 
     * @returns A JSON of the edited form
     */
    public async editForm({ auth, response, request }: HttpContextContract) {
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
        
        const targetForm = await Form.findBy('id', request.input('id'));

        //Event not found case
        if (!targetForm) {
            return response.badRequest({error: "The target form was not found."});
        }

        //Read in new data and overwrite the old form's data
        const newData = await request.validate(CreateFormValidator);
        targetForm.merge(newData).save();

        //Return the edited form's JSON
        return targetForm.toJSON();
    }

    /**
     * @name deleteForm
     * @description Deletes a target form
     * @type POST
     * @route /endpoints/form/deleteForm
     * 
     * @param  id The id of the target form
     * 
     * @returns A JSON of the deleted form
     */
    public async deleteForm({ auth, response, request }: HttpContextContract) {
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

        const targetForm = await Form.findBy('id', request.input('id'));

        //Form not found case
        if (!targetForm) {
            return response.badRequest({error: "The target form was not found."});
        }

        //Delete the form and return its JSON
        //This is helpful in the case that we still need to access
        //the deleted event temporarily
        await targetForm.delete();
        return targetForm.toJSON();
    }
}
