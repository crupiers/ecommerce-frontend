from node:20.18.0

workdir /app

#copio los dos archivos package que terminen en .json
copy package*.json .

run npm install

#copio todos los archivos
copy . . 

expose 5173

cmd ["npm", "run", "dev", "--", "--host"]
