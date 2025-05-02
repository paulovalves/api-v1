# se for para resetar o banco de dados
#docker-compose down -v

# se for para manter os dados
docker-compose down &&

# montar todas as imagens
docker-compose build --no-cache &&

# subir apenas o banco de dados
#docker-compose up -d db

# subir o backend
#docker-compose build --no-cache app

# subir o Liquibase
#docker-compose build --no-cache liquibase

#docker-compose run --rm liquibase

# subir os containers
docker-compose up