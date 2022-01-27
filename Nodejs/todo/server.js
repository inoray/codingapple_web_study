const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true}))
const MongoClient = require('mongodb').MongoClient;

var db;
let dburl = 'mongodb+srv://sunghunk:qwer@cluster0.eyhv3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
MongoClient.connect(dburl, { useUnifiedTopology: true }, function(에러, client){
    if (에러) return console.log(에러)
    db = client.db('todoapp');

    db.collection('post').insertOne( {이름 : 'John', _id : 100} , function(에러, 결과){
	    console.log('저장완료');
	});

    app.listen(8080, function() {
      console.log('listening on 8080')
    })
})

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get('/pet', function (요청, 응답) {
    응답.send('펫용품 쇼핑할 수 있는 페이지 입니다.');
});

app.get('/beauty', function (req, res) {
    res.send('뷰티용품 사세요');
});

app.get('/write', function(요청, 응답) {
    응답.sendFile(__dirname +'/write.html')
});

app.post('/add', function(req, res){
    console.log(req.body);
});