FROM node:lts-alpine AS node
ADD demo /usr/local/web
ADD server /usr/local/server
#WORKDIR /usr/local/server
#RUN npm install
#WORKDIR /usr/local/web
#RUN yarn
WORKDIR /usr/local
RUN printf "ls\ncd /usr/local/server \nnpm install \nnpm start --prefix /usr/local/server &\ncd /usr/local/web \nyarn \nyarn --cwd /usr/local/web run start"  > entrypoint.sh
EXPOSE 4000
EXPOSE 3000
CMD ["/bin/sh", "entrypoint.sh"]
