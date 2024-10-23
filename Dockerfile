FROM node:18-slim

# Make working directories
WORKDIR /usr/app/front

EXPOSE 3000
COPY ./ ./

RUN npm i

RUN npm run build

CMD ["npm", "run", "start"]
