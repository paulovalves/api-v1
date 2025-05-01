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
    apt-get install -y unzip curl tree \
    netcat-openbsd postgresql-client openjdk-17-jre && \
    curl -sSL https://github.com/liquibase/liquibase/releases/download/v4.25.1/liquibase-4.25.1.zip -o liquibase.zip && \
    unzip liquibase.zip -d /opt/liquibase && \
    ln -s /opt/liquibase/liquibase /usr/local/bin/liquibase && \
    rm liquibase.zip


RUN npm run build
#COPY ./liquibase.properties /app/src/database/liquibase/.liquibase.properties
COPY ./liquibase-run.sh /app/liquibase-run.sh
RUN chmod +x /app/liquibase-run.sh
# Expose the port the app runs on
EXPOSE 8080
CMD ["/app/liquibase-run.sh"]
