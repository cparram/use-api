# Base image
FROM node:11

# Set working directory
ENV APP_ROOT /app
RUN mkdir $APP_ROOT
WORKDIR $APP_ROOT

# Install and cache app dependencies
COPY ./package*.json ./
# COPY ./audit-resolv.json ./

RUN npm install -g npm-audit-resolver
# Installing peer dependencies
RUN npm install --save react@^16.8.3 react-redux@7.1.0-alpha.4 redux@^4.0.0-0

# Install dependencies
RUN npm install
