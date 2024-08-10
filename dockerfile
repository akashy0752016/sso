FROM node:lts-alpine AS node
ADD demo /usr/local/web
ADD server /usr/local/server
WORKDIR /usr/local/server
RUN npm install
WORKDIR /usr/local/web
RUN yarn
WORKDIR /usr/local
RUN printf "ls\nnpm start --prefix /usr/local/server &\nyarn --cwd /usr/local/web run start"  > entrypoint.sh
EXPOSE 4000
EXPOSE 3000
CMD ["/bin/sh", "entrypoint.sh"]
