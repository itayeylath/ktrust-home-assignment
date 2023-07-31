# Use an appropriate base image for your frontend (e.g., Node.js)
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first for better caching
COPY frontend/package.json frontend/package-lock.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend files
COPY frontend/ ./

# Start the frontend application
CMD ["npm", "start"]