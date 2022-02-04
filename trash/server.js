const http = require("http");

http.createServer((request, response) => {
   response.writeHead(200, {'Content-Type': 'application/json'}); //writeHead -> qual é o status da requisição '200' -> contente-type -> qual é o tipo de retor
   
   if(request.url === '/produto'){
      response.end(JSON.stringify({
         message: 'rota de pruduto'
      }))
   }

   if(request.url === '/usuario'){
      response.end(JSON.stringify({
         message: 'routes the users'
      }))
   }
   
   response.end(JSON.stringify({  //.end -> que vai enviar algo para quem fez a requisição
      data: 'hello!'  // no browser -> {"data":"hello!"}
   }))
}).listen(4001, () => console.log('Servidor 4001')); //listen -> função que mostra / chama a porta

