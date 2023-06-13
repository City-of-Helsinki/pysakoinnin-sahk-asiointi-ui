# ===============================================
FROM registry.access.redhat.com/ubi8/nodejs-18-minimal as appbase
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
RUN npm install --global yarn
ENV YARN_VERSION 1.19.1
RUN yarn policies set-version $YARN_VERSION

# Copy package.json and package-lock.json/yarn.lock files
COPY package*.json *yarn* ./

# Install npm depepndencies
ENV PATH ./node_modules/.bin:$PATH


RUN yarn config set network-timeout 300000
RUN yarn && yarn cache clean --force

# =============================
FROM appbase as development
# =============================

# Set NODE_ENV to development in the development container
ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

# copy in our source code last, as it changes the most
COPY --chown=appuser:appuser . .

# Bake package.json start command into the image
CMD ["react-scripts", "start"]

# =============================
FROM appbase as staticbuilder

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
RUN chmod +x /opt/env.sh

EXPOSE 8080
CMD ["/bin/bash", "-c", "/opt/env.sh /opt /usr/share/nginx/html && nginx -g \"daemon off;\""]

