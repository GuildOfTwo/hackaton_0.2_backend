FROM node:lts-alpine as production
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
RUN npx prisma migrate deploy
RUN npx prisma generate

CMD ["npm", "start"]