###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:21-alpine AS development
LABEL stage=development \
      description="Local development environment"
WORKDIR /app
COPY package.json ./
RUN yarn install --frozen-lockfile --network-timeout 1000000 -ddd
COPY . .

###################
# BUILD FOR PRODUCTION
###################

FROM node:21-alpine AS build
LABEL stage=build \
      description="Production build environment"
WORKDIR /app
COPY --from=development /app ./
RUN yarn run build
ENV NODE_ENV production
RUN yarn install --production --frozen-lockfile --network-timeout 1000000 -ddd && yarn cache clean --force
USER node

###################
# PRODUCTION
###################

FROM node:21-alpine AS production
LABEL stage=production \
      description="Production environment"
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
CMD ["node", "dist/main.js"]