import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from 'App/Models/Event';
import CreateEventValidator from 'App/Validators/CreateEventValidator';

export default class EventsController {
    public async getAllEvents({ response }: HttpContextContract) {
        const events = await Event.all();

        //No events found case
        if (!events || events.length == 0) {
            return response.badRequest({error: "No events found."});
        }

        return events;
    }

    public async getEvent({ response, request }: HttpContextContract) {
        const targetEvent = await Event.findBy('id', request.param('id'));

        //Event not found case
        if (!targetEvent) {
            return response.badRequest({error: "No event found."});
        }

        return targetEvent.toJSON();
    }

    public async createEvent({ auth, request }: HttpContextContract) {
        //Check if there is a User, and if there is, if they are an admin
        if (auth.user) {
            if (auth.user.accountType != 'Admin') {
                return;
            }
        } else {
            return;
        }
        
        //Read in data and create a new event with the created data
        const data = await request.validate(CreateEventValidator);
        const newEvent = await Event.create(data);

        //Save the new event and return its JSON
        await newEvent.save();
        return newEvent.toJSON();
    }

    public async editEvent({ auth, response, request }: HttpContextContract) {
        //Check if there is a User, and if there is, if they are an admin
        if (auth.user) {
            if (auth.user.accountType != 'Admin') {
                return;
            }
        } else {
            return;
        }
        
        const targetEvent = await Event.findBy('id', request.input('id'));

        //Event not found case
        if (!targetEvent) {
            return response.badRequest({error: "The target address was not found."});
        }

        //Read in new data and overwrite the old event's data
        const newData = await request.validate(CreateEventValidator);
        targetEvent.merge(newData).save();

        //Return the edited event's JSON
        return targetEvent.toJSON();
    }

    public async deleteEvent({ auth, response, request }: HttpContextContract) {
        //Check if there is a User, and if there is, if they are an admin
        if (auth.user) {
            if (auth.user.accountType != 'Admin') {
                return;
            }
        } else {
            return;
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
