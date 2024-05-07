const express = require('express');
const app = express();
const cors = require("cors");

app.set('port', process.env.PORT || 4300);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
//app.set('view engine', 'ejs');
app.get("/", (req,res)=> res.send("Hello World"))
//app.get('/', (req, res, next) => {
//    res.render('index');
//});

//app.get('/api/comments', (req, res, next) => {
 //   res.render('comment');
//});

const db = require("./app/models/index.js");
db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch(err => {
        console.error("Failed to sync db: " + err);
    })

require("./app/routes/table.routes.js")(app);

app.listen(app.get('port'), () => {
    console.info(`Server listen on port ${app.get('port')}`);
});
