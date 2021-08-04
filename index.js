import { createServer } from 'http';
import { createConnection } from 'mysql';
import { readFileSync } from 'fs';
import  express  from 'express';
import path from 'path'
import url from 'url'
import methodOverride from 'method-override';
import bodyParser from 'body-parser';
const __dirname = path.resolve();

const app = express();
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended : false }));
var connection = createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'qwopaskl1234!'
});

connection.query('use study');
//connection.query('INSERT INTO post(id, user, text) VALUES(10, '홍길동', '가나다');');
//connection.query('delete from post where id=10;');


const hostname = '127.0.0.1';
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.get('/postall', (req, res) => {
    connection.query('SELECT * FROM post', (error, rows, fields)=>{
        if(error) throw error;
        res.send(rows);
    });
})

app.get('/post/1', (req, res) => {
    connection.query('SELECT text FROM post WHERE id = 1', (error, rows, fields)=>{
        if(error) throw error;
        res.send(rows);
    });
})


app.get('/post/:id', (req, res) => {
    connection.query('SELECT text FROM post WHERE id = ?', [req.params.id] ,(error, rows, fields)=>{
        if(error) throw error;
        res.send(rows);
    });
})

app.delete('/post/:id', (req,res) => {
    connection.query('DELETE FROM post WHERE id = ?', [req.params.id], (error, rows, fields) =>{
        if(error) throw error;
        console.log('삭제');
        res.redirect('/');
    });
})

app.post('/post',(req,res) => {
    connection.query('UPDATE post SET text = ? WHERE id = ?', [req.body.text, req.body.id], (error, rows, fields) =>{
        if(error) {
            console.log(req.params.id);
            throw error;
        }
        console.log('수정완료');
        res.redirect('/');
    });
})

app.put('/post',(req,res) => {
    connection.query('INSERT INTO post (id,user,text) VALUES (?,?,?)', [req.body.id, req.body.user, req.body.text], (error, rows, fields) =>{
        if(error) {
            console.log(req.params.id);
            throw error;
        }
        console.log('추가');
        res.redirect('/');
    });
})


app.listen(port, () => {
    console.log('App listening on port 3000');
})