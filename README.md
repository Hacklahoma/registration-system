# Registration System
This is the system used in order to Hackers to apply to our Hackathons.

## Developing Using Docker
One way to set up this up is to use Docker. You must have the ability to enable Virtualization on your motherboard in order to use this method if you are using Windows however.

### Installation
 The download links can be found at https://docs.docker.com/get-docker/. Follow the instructions after downloading the file corresponding to your operating system. I would reccomend using WSL 2 however Hyper-V works too.

### Set Up
Bash scripts have been made in order to get the project up and running faster. You can use either the terminal or your file explorer in order to setup and run the project.

To set up inside your terminal:

1. Navigate to the projects folder
2. Migrate the database by running `./docker-migrate.sh`
3. Start the project by running either `docker-compose up` or `./docker-start.sh`

To set up using a file explorer:

1. Navigate to the projects folder
2. Migrate the database by running `docker-migrate.sh`
3. Start the project by running `docker-start.sh`


## Developing Using Nodejs
In the case that you are not able to use Docker, it is possible to use Nodejs in order to get the project running. I will write the rest later
