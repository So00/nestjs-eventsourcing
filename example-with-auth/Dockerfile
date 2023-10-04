FROM node:20-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i --global pnpm

COPY . .

RUN pnpm install --frozen-lockfile

RUN pnpm build

FROM node:20-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i --global pnpm

COPY . .

RUN pnpm install --frozen-lockfile --production

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]