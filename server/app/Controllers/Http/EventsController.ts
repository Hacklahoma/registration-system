import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from 'App/Models/Event';
import CreateEventValidator from 'App/Validators/CreateEventValidator';

export default class EventsController {
    /**
     * @name getAllEvents
     * @description Grabs an array of all events stored on the database
     * @type GET
     * @route /endpoints/event/getAllEvents
     * 
     * @returns An array of all events stored on the database
     */
    public async getAllEvents({ response }: HttpContextContract) {
        const events = await Event.all();

        //No events found case
        if (!events || events.length == 0) {
            return response.badRequest({error: "No events found."});
        }

        return events;
    }

    /**
     * @name getEvent
     * @description Grabs a target event from the database
     * @type GET
     * @route /endpoints/event/getEvent
     * 
     * @param id The id of the target event 
     * 
     * @returns A JSON representation of the target event
     */
    public async getEvent({ response, request }: HttpContextContract) {
        const targetEvent = await Event.findBy('id', request.param('id'));

        //Event not found case
        if (!targetEvent) {
            return response.badRequest({error: "No event found."});
        }

        return targetEvent.toJSON();
    }

    /**
     * @name createEvent
     * @description Creates a new event
     * @type POST
     * @route /endpoints/event/createEvent
     * 
     * @param name The name of the event
     * @param description The description of the event
     * @param eventDate The date of the event
     * @param registrationCutOff The registration cutoff for the event
     * @param type The type for the event
     * @param currentNumberOfApplicants The current number of applicants for the event
     * @param acceptanceDays The number of acceptance days for the event
     * @param numberOfGroups The number of groups for the event
     * @param addressId The id of the address of the event
     * @param createdBy The id of the user who created this event
     * @param updatedBy The id of the user who updated this event
     * 
     * @returns A JSON of the new event
     */
    public async createEvent({ auth, response, request }: HttpContextContract) {
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
        
        //Read in data and create a new event with the created data
        const data = await request.validate(CreateEventValidator);
        const newEvent = await Event.create(data);

        //Save the new event and return its JSON
        await newEvent.save();
        return newEvent.toJSON();
    }

    /**
     * @name editEvent
     * @description Edits a target event
     * @type POST
     * @route /endpoints/event/editEvent
     * 
     * @param id The id of the target event
     * @param name The name of the event
     * @param description The description of the event
     * @param eventDate The date of the event
     * @param registrationCutOff The registration cutoff for the event
     * @param type The type for the event
     * @param currentNumberOfApplicants The current number of applicants for the event
     * @param acceptanceDays The number of acceptance days for the event
     * @param numberOfGroups The number of groups for the event
     * @param addressId The id of the address of the event
     * @param createdBy The id of the user who created this event
     * @param updatedBy The id of the user who updated this event
     * 
     * @returns A JSON of the edited event
     */
    public async editEvent({ auth, response, request }: HttpContextContract) {
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
        
        const targetEvent = await Event.findBy('id', request.input('id'));

        //Event not found case
        if (!targetEvent) {
            return response.badRequest({error: "The target event was not found."});
        }

        //Read in new data and overwrite the old event's data
        const newData = await request.validate(CreateEventValidator);
        targetEvent.merge(newData).save();

        //Return the edited event's JSON
        return targetEvent.toJSON();
    }

    /**
     * @name deleteEvent
     * @description Deletes a target event
     * @type POST
     * @route /endpoints/event/deleteEvent
     * 
     * @param  id The id of the target event
     * 
     * @returns A JSON of the deleted event
     */
    public async deleteEvent({ auth, response, request }: HttpContextContract) {
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

        const targetEvent = await Event.findBy('id', request.input('id'));

        //Event not found case
        if (!targetEvent) {
            return response.badRequest({error: "The target event was not found."});
        }

        //Delete the event and return its JSON
        //This is helpful in the case that we still need to access
        //the deleted event temporarily
        await targetEvent.delete();
        return targetEvent.toJSON();
    }
}
