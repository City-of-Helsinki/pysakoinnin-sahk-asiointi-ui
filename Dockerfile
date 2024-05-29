# ===============================================
FROM registry.access.redhat.com/ubi9/nodejs-18 as appbase
# ===============================================
# Offical image has npm log verbosity as info. More info - https://github.com/nodejs/docker-node#verbosity
ENV NPM_CONFIG_LOGLEVEL warn

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

USER root
RUN useradd --uid 1000 --system --gid 0 --create-home --shell /bin/bash appuser

WORKDIR /usr/src/app
RUN chmod g+w /usr/src/app

# Global npm deps in a non-root user directory
ENV NPM_CONFIG_PREFIX=./.npm-global
ENV PATH=$PATH:./.npm-global/bin

# Install npm depepndencies
ENV PATH ./node_modules/.bin:$PATH

# Yarn
USER root
RUN npm install --global yarn
ENV YARN_VERSION 1.19.1
RUN yarn policies set-version $YARN_VERSION

# Copy package.json and package-lock.json/yarn.lock files
COPY --chown=appuser:0 package*.json *yarn* ./
COPY --chown=appuser:0 ./scripts ./scripts
COPY --chown=appuser:0 ./public ./public

RUN yarn config set network-timeout 300000
RUN yarn && yarn cache clean --force


# ===================================
FROM appbase as staticbuilder
# ===================================

COPY --chown=appuser:0 . .
RUN yarn build

# =============================
FROM registry.access.redhat.com/ubi8/nginx-122 as production
# =============================
USER root
RUN useradd --uid 1000 --system --gid 0 --create-home --shell /bin/bash appuser

COPY --chown=appuser:0 --from=staticbuilder /usr/src/app/build /usr/share/nginx/html

# Copy nginx config
COPY --chown=appuser:0 .prod/nginx.conf /etc/nginx/

# Copy default environment config and setup script
# Copy package.json so env.sh can read it
COPY --chown=appuser:0 ./scripts/env.sh /opt/env.sh
COPY --chown=appuser:0 .env /opt/.env
COPY --chown=appuser:0 package.json /opt/package.json
RUN chown -R appuser /opt/
RUN chmod +x /opt/env.sh
RUN chmod g+w /usr/share/nginx/html

CMD ["/bin/bash", "-c", "/opt/env.sh /opt /usr/share/nginx/html && nginx -g \"daemon off;\""]

USER appuser:0
EXPOSE 3000/tcp
