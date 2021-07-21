const http = require('http');
const mysql = require('mysql');
const fs = require('fs');

var connection = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'qwopaskl1234!'
});

connection.connect();
connection.query('use study');
//connection.query('INSERT INTO post(id, user, text) VALUES(10, '홍길동', '가나다');');
//connection.query('delete from post where id=10;');


connection.end();

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.end(fs.readFileSync(__dirname + '/index.html'));
})

server.listen(port, hostname, () =>{
    console.log(`Server running at http://${hostname}:${port}/`);
});