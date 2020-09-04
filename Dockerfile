####################################
## Base image
####################################
FROM node:12-alpine AS base

# Create app directory
WORKDIR /usr/src/app


####################################
## Front-end Build
####################################
FROM base AS frontbuild

# Install app dependencies
COPY ./client/package*.json ./
RUN npm install

# Copy source files
COPY ./client .
# Build
RUN npm run build


####################################
## Back-end Base
####################################
FROM base AS backbase

# Install app dependencies
COPY ./server/package*.json ./
RUN npm install


####################################
## Back-end Build
####################################
FROM backbase AS backbuild

# Copy server files
COPY ./server .

# Copy frontend build to backend public folder
COPY --from=frontbuild /usr/src/app/build ./src/public

# Build back-end
RUN npm run build


###############################################
## Back-end Final Image
## Contains installed packages + built backend
###############################################
FROM backbase

COPY --from=backbuild /usr/src/app/build ./
COPY --from=frontbuild /usr/src/app/build ./public

EXPOSE 3001
CMD [ "node", "bin/www.js" ]