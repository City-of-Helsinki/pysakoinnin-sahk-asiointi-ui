# ===============================================
FROM helsinkitest/node:14-slim as appbase
# ===============================================
# Offical image has npm log verbosity as info. More info - https://github.com/nodejs/docker-node#verbosity
ENV NPM_CONFIG_LOGLEVEL warn

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# Global npm deps in a non-root user directory
ENV NPM_CONFIG_PREFIX=/app/.npm-global
ENV PATH=$PATH:/app/.npm-global/bin

# Yarn
ENV YARN_VERSION 1.19.1
RUN yarn policies set-version $YARN_VERSION

# Use non-root user
USER appuser

# Copy package.json and package-lock.json/yarn.lock files
COPY package*.json *yarn* ./

# Install npm depepndencies
ENV PATH /app/node_modules/.bin:$PATH

USER root

RUN bash /tools/apt-install.sh build-essential

USER appuser
RUN yarn config set network-timeout 300000
RUN yarn && yarn cache clean --force

USER root
RUN bash /tools/apt-cleanup.sh build-essential

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

# ===================================
FROM appbase as staticbuilder
# ===================================

COPY . /app
RUN yarn build

# =============================
FROM registry.access.redhat.com/ubi8/nginx-118 as production
# =============================

USER root

RUN chgrp -R 0 /usr/share/nginx/html && \
    chmod -R g=u /usr/share/nginx/html

COPY --from=staticbuilder /app/build /usr/share/nginx/html

# Copy nginx config
COPY .prod/nginx.conf /etc/nginx/

# Copy default environment config and setup script
# Copy package.json so env.sh can read it
COPY ./scripts/env.sh /opt/env.sh
COPY .env /opt/.env
COPY package.json /opt/package.json
RUN chmod +x /opt/env.sh

EXPOSE 8080

CMD ["/bin/bash", "-c", "/opt/env.sh /opt /usr/share/nginx/html && nginx -g \"daemon off;\""]
