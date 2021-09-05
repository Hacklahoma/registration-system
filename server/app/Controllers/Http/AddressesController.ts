import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Address from 'App/Models/Address';
import CreateAddressValidator from 'App/Validators/CreateAddressValidator';

export default class AddressesController {

    public async getAllAddresses() {

    }

    public async getAddress() {
        
    }

    public async createAddress({ request }: HttpContextContract) {
        const data = await request.validate(CreateAddressValidator);
        const newAddress = await Address.create(data);
        await newAddress.save();
        return newAddress.toJSON();
    }

    public async editAddress() {
        
    }

    public async deleteAddress() {
        
    }
}
