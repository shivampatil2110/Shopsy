# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy backend files
COPY package*.json ./
RUN npm install
COPY . .

# Expose the backend port
EXPOSE 35000

# Start the backend
CMD ["npm", "start"]
