import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Address from 'App/Models/Address';
import CreateAddressValidator from 'App/Validators/CreateAddressValidator';

export default class AddressesController {

    public async getAllAddresses({ response }: HttpContextContract) {
        const addresses = await Address.all();

        if (!addresses || addresses.length == 0) {
            return response.badRequest({error: "No addresses found."});
        }

        return addresses;
    }

    public async getAddress() {
        
    }

    public async createAddress({ request }: HttpContextContract) {
        const data = await request.validate(CreateAddressValidator);
        const newAddress = await Address.create(data);
        await newAddress.save();
        return newAddress.toJSON();
    }

    public async editAddress({ request, response }: HttpContextContract) {
        const targetAddress = await Address.findBy('id', request.input('id'));

        if (!targetAddress) {
            return await response.badRequest({error: "The target address was not found."});
        }

        const newData = await request.validate(CreateAddressValidator);

        targetAddress.streetAddress1 = newData.streetAddress1;
        targetAddress.streetAddress2 = newData.streetAddress2;
        targetAddress.city = newData.city;
        targetAddress.state = newData.state;
        targetAddress.zipcode = newData.zipcode;

        return targetAddress.toJSON();
    }

    public async deleteAddress({ request, response }: HttpContextContract) {
        const targetAddress = await Address.findBy('id', request.input('id'));

        if (!targetAddress) {
            return await response.badRequest({error: "The target address was not found."});
        }

        await targetAddress.delete();
        return targetAddress.toJSON();
    }
}
