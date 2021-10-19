docker-compose up -d --build
docker-compose run server node ace migration:run
docker-compose run server node ace db:seed
docker-compose down