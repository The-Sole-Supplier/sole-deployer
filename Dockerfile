FROM node:14-alpine

COPY package.json package-lock.json ./

RUN apk add --update --no-cache curl python3 py3-pip gettext libintl
RUN pip3 install --upgrade pip
RUN pip3 install awscli
RUN rm -rf /var/cache/apk/*

RUN curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl
RUN chmod +x ./kubectl
RUN mv ./kubectl /usr/bin/kubectl

RUN curl -LO https://releases.hashicorp.com/terraform/0.14.0/terraform_0.14.0_linux_amd64.zip
RUN unzip terraform_0.14.0_linux_amd64.zip
RUN mv terraform /usr/bin/terraform

RUN npm ci

COPY /src ./src/

RUN echo $KUBE_CONFIG_DATA | base64 -d > /tmp/config
ENV KUBECONFIG=/tmp/config

ENTRYPOINT ["node", "/src/index.js"]
