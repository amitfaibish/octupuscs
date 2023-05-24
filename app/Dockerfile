# Use an official Node.js runtime as the base image
FROM node:13

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the application code to the working directory
COPY . .

# Expose the application port
EXPOSE 3000

# Start the Node.js application
CMD [ "node", "app.js" ]