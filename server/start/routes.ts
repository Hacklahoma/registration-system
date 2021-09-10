/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  //Authorization Routes
  Route.group(() => {
    Route.post('login', 'AuthController.login');
    Route.post('logout', 'AuthController.logout').middleware('auth:api');
    Route.post('signup', 'AuthController.signUp');
  }).prefix('auth')

  //Address Routes
  Route.group(() => {
    Route.get('/', 'AddressesController.getAllAddresses');
    Route.get('/:id', 'AddressesController.getAddress');
    Route.post('create', 'AddressesController.createAddress');
    Route.post('edit', 'AddressesController.editAddress');
    Route.post('delete', 'AddressesController.deleteAddress');
  }).prefix('address');

  //Event Routes
  Route.group(() => {
    Route.get('/', 'EventsController.getAllEvents');
    Route.get('/:id', 'EventsController.getEvent');
    Route.get('create', 'EventsController.createEvent');
    Route.get('edit', 'EventsController.editEvent');
    Route.get('delete', 'EventsController.deleteEvent');
  }).prefix('event');

}).prefix('api');