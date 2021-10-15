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
    Route.post('create', 'EventsController.createEvent');
    Route.post('edit', 'EventsController.editEvent');
    Route.post('delete', 'EventsController.deleteEvent');
  }).prefix('event');

<<<<<<< HEAD
  //Application Routes
  Route.group(() => {
    Route.get('/', 'ApplicationsController.getAllApplications');
    Route.get('/:id', 'ApplicationsController.getApplication');
    Route.post('create', 'ApplicationsController.createApplication');
    Route.post('edit', 'ApplicationsController.editApplication');
    Route.post('delete', 'ApplicationsController.deleteApplication');
  }).prefix('application');

  //Team Routes
  Route.group(() => {
    Route.get('/', 'TeamsController.getAllTeams');
    Route.get('/:id', 'TeamsController.getTeam');
    Route.post('create', 'TeamsController.createTeam');
    Route.post('edit', 'TeamsController.editTeam');
    Route.post('delete', 'TeamsController.deleteTeam');
  }).prefix('team');
=======
  //Form Routes
  Route.group(() => {
    Route.get('/', 'FormsController.getAllForms');
    Route.get('/:id', 'FormsController.getForm');
    Route.post('create', 'FormsController.createForm');
    Route.post('edit', 'FormsController.editForm');
    Route.post('delete', 'FormsController.deleteForm');
  }).prefix('form');
>>>>>>> f2f8186187f45b4e91f7afa792de1edb5c1966b8
}).prefix('api');