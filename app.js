const express = require('express');
//const { randomUUID } = require("crypto");
const { request, response } = require('express');
const fs = require("fs");

const app = express();
app.use(express.json()); //vai funcionar como um midware

let products = [];  //mudado pra let pra alterar o valor   //Assignment to constant variable.

fs.readFile("products.json","utf-8", (err, data)=>{
   if(err){
      console.log(err);
   } else {
      products = JSON.parse(data); //parse traz de volta em formato objeto.
   }
})

/**
 * Body => sempre que eu quiser enviar dados para a aplicação
 * Parans => /products/id...123456 => parametros de rota
 * Query => faz parte da rota mas não obrigatório
 *    /products?id=234567654&&36754
 * 
 * browser só aceita requisições do tipo get.
 */

app.post("/products", (request, response) => {
   // Nome e preço => name and price
   const {name, price} = request.body;
   const product = {
      name,
      price,
      //id: randomUUID(),
   };

   products.push(product);

   createProductFile();

   return response.json(product);
});

app.get("/products", (request, response) =>{
   return response.json(products);
});

app.get("/products/:id", (request, response) => {
   const {id} = request.params;
   const product = products.find(product => product.id === id);
   return response.json(product)
});

app.put("/products/:id", (request, response)=>{
   const {id} = request.params;
   const {name, price} = request.body;

   const productIndex = products.findIndex(product => product.id === id);
   products[productIndex] = {
      ...products[productIndex],
      name, 
      price
   };

   createProductFile();

   return response.json({ message: "pruduto alterado"});
});

app.delete("/products/:id", (request, response) => {
   const {id} = request.params;
   const productIndex = products.findIndex(product => product.id === id);

   products.splice(productIndex, 1);

   createProductFile()

   return response.json({message: 'product removed'})
});

function createProductFile(){
   fs.writeFile("products.json", JSON.stringify(product), (err) => { //estava ---- product e deu erro 500
      if(err){
         console.log(err)
      }else{
         console.log('inserido')
      }
   });
}

app.listen(4009, ()=> console.log('porta 4009'));
