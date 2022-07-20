#FROM --platform=linux/amd64 node:16-alpine as react-build
#RUN mkdir /app
#WORKDIR /app
#COPY ["package.json", "/app/"]
#COPY ./ /app
#RUN cd /app && npm install
#RUN npm -s run build

# Stage 2, based on Nginx
FROM --platform=linux/amd64 nginx
COPY ./build /usr/share/nginx/html
COPY ./conf.d/default.conf /etc/nginx/conf.d/default.conf
#COPY --from=react-build /app/build /usr/share/nginx/html:ro
EXPOSE 80