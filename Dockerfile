FROM node:alpine

#Criando os diretórios com as informações do app
RUN mkdir -p /home/app
COPY ./app /home/app

#Setando qual diretório ele vai usar para rodar os próximos comandos
WORKDIR /home/app

#Instala dependencias 
RUN npm install

#Sobe a página
CMD ["node", "server.js"]
