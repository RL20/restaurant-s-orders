# Use the official Node.js 17 image
FROM node:17

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
# COPY package*.json ./

# Copy the rest of the application code
COPY . /usr/src/app

# Install dependencies
RUN npm run full-build

# Expose the port specified in the Node.js application (default is 9000)
EXPOSE 3000 9000

# Command to run the application
CMD ["npm", "run", "dev"]
