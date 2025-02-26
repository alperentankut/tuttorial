const express = require("express");
const dotenv = require("dotenv")
const connectDatabase = require("./helpers/database/connectDatabase")
const customErrorHandler = require("./middlewares/errors/customErrorHandler")
const routers = require("./routers")
const path = require("path")



//Enviroment Variables

dotenv.config({
    path : "./config/env/config.env"
})

//MongoDb Connections

connectDatabase()

const app = express();

//Express - Body Middleware

app.use(express.json())

const PORT = process.env.PORT;


//Routers Middleware

app.use("/api",routers)

//Error Handler

app.use(customErrorHandler)

//Static Files

app.use(express.static(path.join(__dirname,"public")))


//Bizim statik dosyalarımızı express biz belirtmeden
//göremiyor. Bundan dolayı bu middleware ile public
//klasörümüzü tanıtıyoruz.
//dirname ve public birleştirilip expresse bildiriliyor.


app.listen(PORT,()=>{
    console.log(`App Started on ${PORT} : ${process.env.NODE_ENV}`)
});


// //Normalde dotenv.config config klasöründeki config.env
// //dosyasına bakıyor fakat bizim bi alt klasörümüz 
// //olduğu için yolu tanımlıyoruz

// //yukardaki yazdığımız process.env.PORT projemiz
// //başka bilgisayarlarda çalışırken 5000 portunda çalış-
// //amazsa uygun portta çalışmasını sağlıyor.

// //Biz yukarda /api/questions yoluna gidildiğinde yapılmasını
// //istediğimiz şeyleri yazacağız.



//Biz bütün route larımızı buraya yazdığımız takdirde ilerde kodun
//bakımı zorlaşacaktır. Bundan dolayı modüler hale getirmek daha 
//kullanışlı olacaktır. Bunu da routers klasörü oluşturup burda yapabiliriz.


//biz yapımızı daha moduler hale getirmek adına 
//bu middleware lerimizi index.js içinde yazacağız.