FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Set environment variables
ENV TEST_NODE_ENV=development
ENV DEFAULT_PORT=8080
ENV POSTGRES_LOCALHOST_HOST=postgres
ENV POSTGRES_LOCALHOST_PORT=5432
ENV POSTGRES_LOCALHOST_USER=postgres
ENV POSTGRES_LOCALHOST_PASSWORD=secret
ENV POSTGRES_LOCALHOST_DATABASE=teste
ENV POSTGRES_LOCALHOST_SYNC=false
ENV POSTGRES_LOCALHOST_LOGGING=false
ENV MIGRATIONS_LOCALHOST_PATH=/app/src/database/migrations
ENV CHANGELOGFILE_LOCALHOST_PATH=/database/liquibase/changelog/db.changelog-main.yaml
ENV CLASSPATH_LOCALHOST_PATH=/app/src/database/liquibase/drivers/postgresql-42.7.3.jar
ENV CHANGELOG_FOLDER_LOCALHOST_PATH=/app/src/database/liquibase/changelog

# ✅ Use apt-get only
RUN apt-get update && \
    apt-get install -y \
    curl \
    netcat-openbsd \
    openjdk-17-jre \
    postgresql-client \
    tree \
    unzip && \
    apt clean


COPY ./public ./public
COPY ./views ./views
RUN npm run build

COPY ./views ./dist/views
COPY ./public ./dist/public

EXPOSE 8080
