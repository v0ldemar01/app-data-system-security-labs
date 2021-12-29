FROM node:14.18.0

ARG WORK_DIR=MySecuritySystem

RUN mkdir -p ${WORK_DIR}
WORKDIR ${WORK_DIR}

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]
