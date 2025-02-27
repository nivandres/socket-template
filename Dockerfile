ARG BUN_VERSION=1.2.3
FROM oven/bun:${BUN_VERSION}-slim AS base

LABEL name="socket"

WORKDIR /app

ENV NODE_ENV="production"

FROM base AS build

COPY package.json ./
RUN bun install --production 

FROM base

COPY . .
COPY --from=build /app /app

EXPOSE 3000
CMD [ "bun", "run", "start" ]
