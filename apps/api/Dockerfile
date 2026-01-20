FROM node:20-slim

RUN apt-get update -y && apt-get install -y openssl postgresql-client && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json* ./
COPY apps/api/package.json apps/api/
COPY apps/api/prisma apps/api/prisma/

RUN npm install --workspace=apps/api

COPY apps/api/src apps/api/src/
COPY apps/api/tsconfig.json apps/api/

WORKDIR /app/apps/api

RUN npx prisma generate

COPY apps/api/docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ARG PORT=29790
ENV PORT=${PORT}

EXPOSE ${PORT}

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["npm", "run", "dev"]