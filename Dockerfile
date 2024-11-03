# official node image
FROM node:20

# workspace in the container
WORKDIR /proveeagro/frontend

# Copy all files from the directory to the container
COPY . .

# Install dependencies and build the application
RUN npm install && npm run build

# start the application
CMD ["npm", "start"]
