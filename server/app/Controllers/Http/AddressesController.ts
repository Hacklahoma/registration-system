import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Address from 'App/Models/Address';
import CreateAddressValidator from 'App/Validators/CreateAddressValidator';

export default class AddressesController {

    /**
     * @name getAllAddresses
     * @description Grabs an array of all addresses stored on the database
     * @type GET
     * @route /endpoints/addresses/getAlAddresses
     * 
     * @returns An array of all addresses stored on the database
     */
    public async getAllAddresses({ response }: HttpContextContract) {
        const addresses = await Address.all();

        //No addresses found case
        if (!addresses || addresses.length == 0) {
            return response.badRequest({error: "No addresses found."});
        }

        return addresses;
    }

    /**
     * @name getAddress
     * @description Grabs a target address from the database
     * @type GET
     * @route /endpoints/addresses/getAddress
     * 
     * @param id The id of the target address
     *  
     * @returns A JSON representation of the target address
     */
    public async getAddress({ request, response }: HttpContextContract) {
        const targetAddress = await Address.findBy('id', request.param('id'));

        //Address not found case
        if (!targetAddress) {
            return response.badRequest({error: "No address found."});
        }

        return targetAddress.toJSON();
    }

    /**
     * @name createAddress
     * @description Creates a new address
     * @type POST
     * @route /endpoints/addresses/createAddress
     * 
     * @param streetAddress1 The first line of the street address
     * @param streetAddress2 The optional second line of the street address
     * @param city The city of the address
     * @param state The state abbreviation of the address
     * @param zipcode The zipcode of the address
     * 
     * @returns A JSON of the new address
     */
    public async createAddress({ request }: HttpContextContract) {
        //Read in data and create a new address with the created data
        const data = await request.validate(CreateAddressValidator);
        const newAddress = await Address.create(data);

        //Save the new address and return its JSON
        await newAddress.save();
        return newAddress.toJSON();
    }

    /**
     * @name editAddress
     * @description Edits a target address
     * @type POST
     * @route /endpoints/addresses/editAddress
     * 
     * @param id The id of the target address
     * @param streetAddress1 The first line of the new street address
     * @param streetAddress2 The optional second line of the new street address
     * @param city The city of the new address
     * @param state The state abbreviation of the new address
     * @param zipcode The zipcode of the new address
     *  
     * @returns A JSON of the edited address
     */
    public async editAddress({ request, response }: HttpContextContract) {
        const targetAddress = await Address.findBy('id', request.input('id'));

        //Address not found case
        if (!targetAddress) {
            return response.badRequest({error: "The target address was not found."});
        }

        //Read in new data
        const newData = await request.validate(CreateAddressValidator);
        targetAddress.merge(newData).save();

        //Return the edited addresses JSON
        return targetAddress.toJSON();
    }

    /**
     * @name deleteAddress
     * @description Deletes a taret address
     * @type POST
     * @route /endpoints/addresses/deleteAddress
     * 
     * @param id The id of the target address
     *  
     * @returns A JSON of the deleted address
     */
    public async deleteAddress({ request, response }: HttpContextContract) {
        const targetAddress = await Address.findBy('id', request.input('id'));

        //Address not found case
        if (!targetAddress) {
            return response.badRequest({error: "The target address was not found."});
        }

        //Delete the address and return its JSON
        //This is helpful in the case that we still need to access
        //the deleted address temporarily
        await targetAddress.delete();
        return targetAddress.toJSON();
    }
}
