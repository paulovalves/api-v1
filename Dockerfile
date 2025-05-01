FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Optional: install Liquibase CLI if needed
RUN apt-get update && \
    apt-get install -y unzip curl && \
    curl -sSL https://github.com/liquibase/liquibase/releases/download/v4.25.1/liquibase-4.25.1.zip -o liquibase.zip && \
    unzip liquibase.zip -d /opt/liquibase && \
    ln -s /opt/liquibase/liquibase /usr/local/bin/liquibase && \
    rm liquibase.zip

RUN npm run build
