FROM node:erbium-alpine

WORKDIR /usr/src/app
ENV NPM_CONFIG_LOGLEVEL=warn

RUN apk add -U --no-cache tini

COPY package*.json ./
RUN npm ci --production
COPY . ./

ENTRYPOINT [ "tini", "--", "/usr/src/app/index.js" ]
CMD [ "publish" ]