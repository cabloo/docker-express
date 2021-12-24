FROM synergycp/debian-supervised:10

RUN apt-get update && \
    apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_16.x | bash && \
    apt-get install -y nodejs build-essential && \
    useradd www

ADD api /api
ADD etc/supervisor.d /etc/supervisor/conf.d

WORKDIR /api

RUN npm i --production --unsafe-perm && \
    cp src/config.example.js src/config.js
