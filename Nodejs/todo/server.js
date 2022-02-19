const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }))
const MongoClient = require('mongodb').MongoClient;
app.set('view engine', 'ejs');
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

app.use(session({ secret: '비밀코드', resave: true, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

require('dotenv').config()

app.use('/public', express.static('public'))
app.use('/board/sub', require('./routes/board_sub'));

const { ObjectId } = require('mongodb');

var db;
MongoClient.connect(process.env.DB_URL, { useUnifiedTopology: true }, function (에러, client) {
  if (에러) return console.log(에러)
  db = client.db('todoapp');

  // db.collection('post').insertOne( {이름 : 'John', _id : 100} , function(에러, 결과){
  //     console.log('저장완료');
  // });

  app.listen(process.env.PORT, function () {
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

app.get('/write', function (req, res) {
  // 응답.sendFile(__dirname +'/write.html')
  res.render('write.ejs');
});

app.post('/add', function (req, res) {
  console.log(req.user);
  db.collection('count').findOne({ name: '게시물갯수' }, function (err, result) {
    let cnt = parseInt(result.total);
    db.collection('post').insertOne({ _id: cnt + 1, user: req.user._id, user_id: req.user.id, title: req.body.title, date: req.body.date, reg_date: new Date() }, function (err, result) {
      db.collection('count').updateOne({ name: '게시물갯수' }, { $inc: { total: 1 } }, function (err, result) {
        if (err) { return console.log(err) }
        res.send("전송완료");
      })
    })
  })
});

app.get('/list', function (req, res) {
  console.log(req.user._id);
  db.collection('post').find().toArray(function (err, result) {
    console.log(result);
    res.render('list.ejs', { posts: result, user: req.user });
  })
})

app.delete('/delete', function (req, res) {
  req.body._id = parseInt(req.body._id);
  console.log(req.body._id);
  db.collection('post').deleteOne({ _id: req.body._id, user: req.user._id }, function (err, result) {
    console.log('삭제완료');
    res.status(200);
  });
  res.send("삭제완료");
})

app.get('/detail/:id', function (req, res) {
  db.collection('post').findOne({ _id: parseInt(req.params.id) }, function (err, result) {
    if (err) { return console.log(err) }
    console.log(result);
    res.render('detail.ejs', { data: result });
  })
})

app.get('/edit/:id', function (req, res) {
  db.collection('post').findOne({ _id: parseInt(req.params.id) }, function (err, result) {
    if (err) { return console.log(err) }
    res.render('edit.ejs', { post: result });
  })
})

app.put('/edit', function (req, res) {
  console.log(req.body);
  db.collection('post').updateOne({ _id: parseInt(req.body.id), user: req.user._id }, { $set: { title: req.body.title, date: req.body.date } }, function (err, result) {
    if (err) { return console.log(err) }
    console.log('수정완료');
    res.redirect('/list');
  })
})

let multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/image')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

var upload = multer({ storage: storage });

app.get('/upload', function (req, res) {
  res.render('upload.ejs');
})

app.post('/upload', upload.single('profile'), function (req, res) {
  console.log(req.file.filename);
  //res.send("업로드 완료");
  res.redirect('/image/' + req.file.filename);
})

app.get('/image/:imagename', function (req, res) {
  res.sendFile(__dirname + "/public/image/" + req.params.imagename);
})

app.get('/login', function (req, res) {
  res.render('login.ejs');
})

app.post('/login', passport.authenticate('local', { failureRedirect: '/fail' }), function (req, res) {
  res.redirect('/');
})

passport.use(new LocalStrategy({
  usernameField: 'id',
  passwordField: 'pw',
  session: true,
  passReqToCallback: false,
}, function (입력한아이디, 입력한비번, done) {
  //console.log(입력한아이디, 입력한비번);
  db.collection('login').findOne({ id: 입력한아이디 }, function (에러, 결과) {
    if (에러) return done(에러)

    if (!결과) return done(null, false, { message: '존재하지않는 아이디요' })
    if (입력한비번 == 결과.pw) {
      return done(null, 결과)
    } else {
      return done(null, false, { message: '비번틀렸어요' })
    }
  })
}));

passport.serializeUser(function (user, done) {
  done(null, user.id)
});

passport.deserializeUser(function (아이디, done) {
  console.log("func deserializeUser");
  db.collection('login').findOne({ id: 아이디 }, function (에러, 결과) {
    done(null, 결과)
  })
});

app.get('/mypage', 로그인했니, function (req, res) {
  res.render('mypage.ejs', { user: req.user });
})

function 로그인했니(요청, 응답, next) {
  console.log("func 로그인했니");
  if (요청.user) {
    next()
  }
  else {
    응답.send('로그인안하셨는데요?')
  }
}

app.post('/register', function (req, res) {
  console.log(req.body);
  db.collection('login').findOne({ id: req.body.id }, function (err, result) {
    if (err) { return console.log(err) };

    if (!result) {
      db.collection('login').insertOne({ id: req.body.id, pw: req.body.pw }, function (err, result) {
        if (err) { return console.log(err) }

        console.log('정상가입');
      })
    } else {
      res.send('이미가입된 id입니다.');
    }
  });
})

app.post('/chatroom', 로그인했니, function (req, res) {
  console.log(req.user._id);
  let title = req.body._id + '_' + req.body.user + '_' + req.user._id;
  let chatRoom = {
    member: [ObjectId(req.body.user), req.user._id],
    date: new Date(),
    title: title
  }

  db.collection('chatroom').findOne({ title: title }, function (err, result) {
    if (err) { return console.log(err) };
    if (!result) {
      db.collection('chatroom').insertOne(chatRoom).then((result2) => {
        console.log('채팅방 생성 완료');
      });
    }
  });
})

app.get('/chat', 로그인했니, function (req, res) {
  console.log(req.user._id);

  db.collection('chatroom').find({ member: req.user._id }).toArray(function (err, result) {
    if (err) { return console.log(err) };

    console.log(result);
    res.render('chat.ejs', { data: result });
  })
})