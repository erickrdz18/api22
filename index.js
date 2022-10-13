const express= require('express');
const app = express();
const cors= require('cors');
const cookieSession = require('cookie-session');
const path = require('path');
const session= require('express-session');
const multer= require('multer');
const upload=multer();

app.use(cors());

app.set('port', process.env.PORT || 1234);
app.listen(app.get('port'), ()=>{console.log('server escuchando por el puerto', app.get('port'))});
console.log('server funcionando')

//middlewares- antes de llegar a rutas

app.use(express.json());

app.use(cookieSession({name: 'Session', keys:['clasedeProgramacion']}));

app.use(express.urlencoded({extended: false}));
app.use (require('./rutas/cliente'));
app.use (require('./rutas/auto'));


app.get('/login', (request, response, next) => {
    if (request.session.usuario && request.session.usuario !== ""){
        next();
    }
    else{
        response.sendFile(path.join(__dirname, "/Estatico/login.html"));
    }
});

app.post("/login", (request, response, next) => {
    if (request.body.usuario == "erick" && request.body.password == "password"){
        request.session.usuario = "erick";
        response.redirect("/Estatico/pagina.html");
    }
    else{
        response.redirect("/login");
    }
});

app.get('/logout', (request, response, next) => {
    request.session = null;
    response.redirect("/login");
});

app.use((request, response, next) => {
    if (request.session.usuario){
        if (request.session.usuario !== ""){
            return next();
        }
    }
    response.redirect("/login");
});



app.use('/sitio',express.static(path.join(__dirname, "/Estatico")));

app.get('*', (request, response) => {
    response.redirect('/sitio');
});
