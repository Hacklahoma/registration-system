import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Team from 'App/Models/Team';
import CreateTeamValidator from 'App/Validators/CreateTeamValidator';

export default class TeamsController {
    /**
     * @name getAllTeams
     * @description Grabs an array of all teams stored on the database
     * @type GET
     * @route /endpoints/team/getAllTeams
     * 
     * @returns An array of all teams stored on the database
     */
     public async getAllTeams({ response }: HttpContextContract) {
        const teams = await Team.all();

        //No teams found case
        if (!teams || teams.length == 0) {
            return response.badRequest({error: "No teams found."});
        }

        return teams;
    }

    /**
     * @name getTeam
     * @description Grabs a target team from the database
     * @type GET
     * @route /endpoints/team/getTeam
     * 
     * @param id The id of the target team 
     * 
     * @returns A JSON representation of the target team
     */
    public async getTeam({ response, request }: HttpContextContract) {
        const targetTeam = await Team.findBy('id', request.param('id'));

        //Team not found case
        if (!targetTeam) {
            return response.badRequest({error: "No team found."});
        }

        return targetTeam.toJSON();
    }

    /**
     * @name createTeam
     * @description Creates a new team
     * @type POST
     * @route /endpoints/team/createTeam
     * 
     * @param 
     * 
     * @returns A JSON of the new team
     */
    public async createTeam({ auth, response, request }: HttpContextContract) {
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
        
        //Read in data and create a new team with the created data
        const data = await request.validate(CreateTeamValidator);
        const newTeam = await Team.create(data);

        //Save the new team and return its JSON
        await newTeam.save();
        return newTeam.toJSON();
    }

    /**
     * @name editTeam
     * @description Edits a target team
     * @type POST
     * @route /endpoints/team/editTeam
     * 
     * @param id The id of the target team
     * @param 
     * 
     * @returns A JSON of the edited team
     */
    public async editTeam({ auth, response, request }: HttpContextContract) {
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
        
        const targetTeam = await Team.findBy('id', request.input('id'));

        //Team not found case
        if (!targetTeam) {
            return response.badRequest({error: "The target team was not found."});
        }

        //Read in new data and overwrite the old team's data
        const newData = await request.validate(CreateTeamValidator);
        targetTeam.merge(newData).save();

        //Return the edited team's JSON
        return targetTeam.toJSON();
    }

    /**
     * @name deleteTeam
     * @description Deletes a target team
     * @type POST
     * @route /endpoints/team/deleteTeam
     * 
     * @param  id The id of the target team
     * 
     * @returns A JSON of the deleted team
     */
    public async deleteTeam({ auth, response, request }: HttpContextContract) {
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

        const targetTeam = await Team.findBy('id', request.input('id'));

        //Team not found case
        if (!targetTeam) {
            return response.badRequest({error: "The target team was not found."});
        }

        //Delete the team and return its JSON
        //This is helpful in the case that we still need to access
        //the deleted team temporarily
        await targetTeam.delete();
        return targetTeam.toJSON();
    }
}
