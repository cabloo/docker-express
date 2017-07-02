FROM synergycp/deb-8-supervised

RUN apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_6.x | bash && \
    apt-get install -y nodejs && \
    useradd www

ADD api /api
ADD etc/supervisor.d /etc/supervisor/conf.d

WORKDIR /api

RUN npm i --production && \
    cp src/config.example.js src/config.js
