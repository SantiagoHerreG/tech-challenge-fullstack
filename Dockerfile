FROM node:18.16.0-buster
USER node
RUN mkdir /home/node/app
WORKDIR /home/node/app
COPY --chown=node:node package-lock.json package.json ./
RUN npm ci
COPY --chown=node:node . .
EXPOSE 3002
CMD ["npm", "run", "start"]