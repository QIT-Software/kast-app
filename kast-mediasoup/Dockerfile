FROM node:14.0.0 as build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lock
COPY tsconfig.json tsconfig.build.json ./
COPY src src
RUN yarn build

FROM node:14.0.0
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --prod --frozen-lock
COPY --from=build /app/dist dist
COPY config config
COPY .env* ./
CMD ["yarn", "start:prod"]
