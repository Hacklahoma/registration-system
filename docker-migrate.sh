docker-compose up -d --build
docker-compose run server node ace migration:run
docker-compose down