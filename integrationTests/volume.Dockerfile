FROM ubuntu:latest

ARG ARG_TIMEZONE=America/New_York
ENV ENV_TIMEZONE ${ARG_TIMEZONE}

RUN mkdir -p /app/
COPY ../ /app/

RUN timedatectl set-timezone ${ENV_TIMEZONE}

#RUN echo "deb-src http://deb.debian.org/debian stretch main" >> /etc/apt/sources.list
RUN apt-get update -y
RUN apt-get install -y libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
