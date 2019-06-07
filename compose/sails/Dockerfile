FROM node:latest

RUN npm install -g sails grunt npm-check-updates

COPY ./package.json /package.json
RUN npm install
RUN npm install --save sails-postgresql

COPY ./compose/sails/entrypoint.sh /entrypoint.sh
RUN sed -i 's/\r//' /entrypoint.sh
RUN chmod +x /entrypoint.sh

COPY ./compose/sails/start-dev.sh /start-dev.sh
RUN sed -i 's/\r//' /start-dev.sh
RUN chmod +x /start-dev.sh

WORKDIR /app

ENTRYPOINT ["/entrypoint.sh"]
