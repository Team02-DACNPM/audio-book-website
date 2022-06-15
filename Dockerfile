# Pull Docker Hub base image
FROM node:lts

# Set working directory
WORKDIR /usr/app

# Install app dependencies
COPY package.json ./
RUN yarn

# Copy app to container
COPY . .

# Next Build
RUN yarn build

# Run the "start" script in package.json
CMD ["yarn", "dev"]