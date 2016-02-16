FROM orionstein/sp-ub-node:onbuild
# replace this with your application's default port

WORKDIR /usr/src/app

RUN mkdir /opt/build

RUN ls /opt/build

RUN gulp


