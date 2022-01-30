const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true}))
const MongoClient = require('mongodb').MongoClient;
app.set('view engine', 'ejs');
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

var db;
let dburl = 'mongodb+srv://sunghunk:qwer@cluster0.eyhv3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
MongoClient.connect(dburl, { useUnifiedTopology: true }, function(에러, client){
    if (에러) return console.log(에러)
    db = client.db('todoapp');

    // db.collection('post').insertOne( {이름 : 'John', _id : 100} , function(에러, 결과){
	//     console.log('저장완료');
	// });

    app.listen(8080, function() {
      console.log('listening on 8080')
    })
})

app.get('/', function (req, res) {
    // res.sendFile(__dirname + "/index.html");
    res.render('index.ejs');
});

app.get('/pet', function (요청, 응답) {
    응답.send('펫용품 쇼핑할 수 있는 페이지 입니다.');
});

app.get('/beauty', function (req, res) {
    res.send('뷰티용품 사세요');
});

app.get('/write', function(req, res) {
    // 응답.sendFile(__dirname +'/write.html')
    res.render('write.ejs');
});

app.post('/add', function(req, res){
    //console.log(req.body);
    db.collection('count').findOne({name: '게시물갯수'}, function(err, result){
        let cnt = parseInt(result.total);
        db.collection('post').insertOne({_id: cnt + 1, title: req.body.title, date: req.body.date }, function(err, result){
            db.collection('count').updateOne({name: '게시물갯수'}, {$inc: {total:1}}, function(err, result){
                if (err) {return console.log(err)}
                res.send("전송완료");
            })
        })
    })
});

app.get('/list', function(req, res){
    db.collection('post').find().toArray(function(err, result){
        console.log(result);
        res.render('list.ejs', {posts: result});
    })
})

app.delete('/delete', function(req, res){
    req.body._id = parseInt(req.body._id);
    console.log(req.body._id);
    db.collection('post').deleteOne(req.body, function(err, result){
        console.log('삭제완료');
        res.status(200);
    });
    res.send("삭제완료");
})

app.get('/detail/:id', function(req, res){
    db.collection('post').findOne({_id: parseInt(req.params.id) }, function(err, result){
        if (err) {return console.log(err)}
        console.log(result);
        res.render('detail.ejs', {data: result});
    })
})

app.get('/edit/:id', function(req, res){
    db.collection('post').findOne({_id: parseInt(req.params.id)}, function(err, result){
        if (err) {return console.log(err)}
        res.render('edit.ejs',{post:result});
    })
})

app.put('/edit', function(req, res){
    console.log(req.body);
    db.collection('post').updateOne({_id: parseInt(req.body.id) },{ $set : {title: req.body.title, date: req.body.date} },function(err, result){
        if (err) {return console.log(err)}
        console.log('수정완료');
        res.redirect('/list');
    })
})