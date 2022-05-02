FROM node:10
ARG branch=iwanlab/iwan-dev
RUN git clone https://github.com/Iwan-lab/rollup.git
WORKDIR /rollup
RUN git checkout $branch
RUN npm install
WORKDIR /rollup/rollup-operator/src
RUN npm install

CMD ["sh","-c","node server-proof.js $PROOF_TIME"]