# Use an official Node.js image as the base image
FROM node:16-alpine

# Install curl using apk (since Alpine is used)
RUN apk add --no-cache curl

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install the app dependencies
RUN npm install --silent

# Copy the rest of the application files
COPY . .

# Expose port 3000 for the React app
EXPOSE 3000

# Start the application
CMD ["npm", "start"]