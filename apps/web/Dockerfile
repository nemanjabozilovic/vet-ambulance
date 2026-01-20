FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
COPY apps/web/package.json apps/web/

RUN npm install --workspace=apps/web

COPY apps/web/src apps/web/src/
COPY apps/web/index.html apps/web/
COPY apps/web/vite.config.ts apps/web/
COPY apps/web/tsconfig.json apps/web/
COPY apps/web/tsconfig.node.json apps/web/
COPY apps/web/tailwind.config.ts apps/web/
COPY apps/web/postcss.config.js apps/web/

WORKDIR /app/apps/web

ARG VITE_PORT=20193
ARG VITE_API_URL=http://localhost:29790
ENV VITE_PORT=${VITE_PORT}
ENV VITE_API_URL=${VITE_API_URL}

EXPOSE ${VITE_PORT}

CMD ["npm", "run", "dev", "--", "--host"]

