const express = require("express");
const req = require("express/lib/request");
const logger = require("morgan");
const app = express();

//Express middlewares - EL ORDEN DE LOS MIDDLEWARES IMPORTA!!
// llega el request -> middlerware -> next() -> va a buscar la ruta que le corresponde
app.use("/", (req, res, next) => {
  console.log("Hicieron un request a " + req.url);
  next(); //continue, avanza al prox paso
});

app.use(logger("dev"));

app.get("/", (req, res) => {
  //status code 200
  res.send("Hello");
});

app.get("/home", (req, res) => {
  res.send("Home");
});

//POR PARAMETROS
//Con el ":" podemos hacer uso de parametros de url en la misma, con .params, corriendo con req. (envio de informacion por parametros)
app.get("/welcome/:name/:lastName", (req, res) => {
  // req.params en este caso guarda el nombre o name que se pase por url. abajo hacemos destructuring del objeto params
  let { name, lastName } = req.params;
  //localhost:3000/welcome/Fede/Iglesia
  http: res.send(JSON.stringify(req.params) + `\n ${name} \n${lastName} `);
});

// POR QUERY
app.get("/nombre", (req, res) => {
  let { name, lastName, age } = req.query;
  //el query no se declara en la ruta, como los params, se declara en la url:
  //localhost:3000/nombre?name=Fede&lastName=Iglesia&age=30
  if (name && lastName && age) {
    res.send(`${name} ${lastName} tiene ${age} años`);
  } else {
    res.send("Falta informacion");
  }
});

//el elemento que antecede al signo de pregunta puede o no pertenecer a la ruta. abcd o acd serian ambas validas en este caso, y devolveria "abcd"
app.get("/ab?cd", (req, res) => {
  console.log("test");
  res.send("abcd");
});

//el   elemento que antecede al asterisco se puede repetir tantas veces como quiera (minimo una vez). En este caso abbbbbcd abcd devolveria lo mismo
app.get("/ab*cd", (req, res) => {
  console.log("test");
  res.send("abcd con muchas b");
});

// Publicar un valor en el servidor
app.post("/", (req, res) => {
  console.log(req.body);
  res.send("done");
});

//en caso de no encontrar ninguna ruta, atrapar el error
app.get("*", (req, res) => {
  res.send("error");
});

app.listen(3000);
