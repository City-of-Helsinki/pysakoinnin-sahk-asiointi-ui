# ===============================================
FROM node:gallium-alpine3.18 as appbase
# ===============================================
# Offical image has npm log verbosity as info. More info - https://github.com/nodejs/docker-node#verbosity
ENV NPM_CONFIG_LOGLEVEL warn

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

WORKDIR /usr/src/app
RUN chmod g+w /usr/src/app

# Global npm deps in a non-root user directory
ENV NPM_CONFIG_PREFIX=./.npm-global
ENV PATH=$PATH:./.npm-global/bin

# Yarn
ENV YARN_VERSION 1.19.1
RUN yarn policies set-version $YARN_VERSION

# Copy package.json and package-lock.json/yarn.lock files
COPY package*.json *yarn* ./

# Install npm depepndencies
ENV PATH ./node_modules/.bin:$PATH

RUN yarn config set network-timeout 300000
RUN yarn && yarn cache clean --force


# ===================================
FROM appbase as staticbuilder
# ===================================

COPY . .
RUN yarn build

# =============================
FROM registry.access.redhat.com/ubi8/nginx-118 as production
# =============================

COPY --from=staticbuilder /usr/src/app/build /usr/share/nginx/html

# Copy nginx config
COPY .prod/nginx.conf /etc/nginx/

# Copy default environment config and setup script
# Copy package.json so env.sh can read it
COPY ./scripts/env.sh /opt/env.sh
COPY .env /opt/.env
COPY package.json /opt/package.json
USER root
RUN chown -R nobody:root /opt/
RUN chmod +x /opt/env.sh
RUN chmod g+w /usr/share/nginx/html

CMD ["/bin/bash", "-c", "/opt/env.sh /opt /usr/share/nginx/html && nginx -g \"daemon off;\""]

USER nobody:0
EXPOSE 3000/tcp
