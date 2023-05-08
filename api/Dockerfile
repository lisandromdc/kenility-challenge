FROM node:alpine
WORKDIR /usr/app
COPY package*.json .

RUN npm ci

COPY . .

CMD if [ "$NODE_ENV" = "production" ] ; \
    then npm run start ; \
    else npm run seed-and-dev ; \
    fi
