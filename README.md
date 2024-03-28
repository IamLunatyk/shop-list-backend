## How to run

Backend - cd backend
uruchom polecenie node app.js lub npm start

przekierowanie do innej strony html:

import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const \_\_dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.get("/", (req, res) => {
res.sendFile(\_\_dirname + "/public/index.html");
});

w app ejs, w requescie dodajesz properties np:

res.render("index.ejs", {
dayType: type,
advice: adv
})

    a potem mozesz ich je wrzucic w pliku ejs za pomoca <%= %>
