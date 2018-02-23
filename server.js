var express = require('express');
var mongoose = require("mongoose");
var logger = require("morgan");
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var bcrypt = require('bcrypt');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session=require('express-session');
var MongoStore = require('connect-mongo')(session);

mongoose.connect('mongodb://localhost/test1');

var Post = require('./server/models/Post');
var User = require("./server/models/User");

var app = express();

app.set('port',process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));

app.use(session({ 
    secret: 'your secret here',
    resave:  true,
    saveUninitialized: true,
    key: 'jsessionid',
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));


passport.use(new LocalStrategy({usernameField: 'email'},
  function(email, password, done){
    User.findOne({email: email})
      .exec(function(err, user){
        if(err) return done(err);
        if(!user) return done(null, false);
        user.comparePassword(password, function(err, isMatch){
          if(err) return done(err);
          if(isMatch) return done(null, user);
          return done(null, false);
        });
      });
  }
));

passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  User.findById(id).exec(function(err, user){
    done(err, user);
  });
});

app.use(passport.initialize());
app.use(passport.session());			


app.post('/api/login', passport.authenticate('local'), function(req, res, next){
  res.cookie('user', req.sessionID);
  res.send(200).end();
});

app.post('/api/logout',function(req,res,next){
	req.logout();
	res.clearCookie('user');
	res.send(200);
});

app.post('/api/signup',function(req,res,next){
	var user = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	});

	user.save(function(err,user){
		if(err) { return next(err);}
		res.send(user);
		console.log('Sign up works');
	});
});
			
app.post('/api/posts',function(req,res){
	var post = new Post({
		author: req.body.author,
		name: req.body.name,
		content: req.body.content	
	});
	post.save(function(err){
		console.log("Your data is saved");
		if(err){
			return res.status(401).end();
		}
	});
});


app.get('/api/posts',function(req,res){
	Post.find({})
		.exec(function(err,posts){
			if(err) return res.status(400).end();
			res.send(posts);
		});
});

app.post('/api/posts',function(req,res,next){
	if(req.user){
		var post = new Post({
			title: req.body.title,
			content: req.body.content,
			author: req.user._id
		});

		post.save(function(err,post){
			if(err) return res.status(401).end();
				
				User.findById(req.user._id)
					.exec(function(err,user){
						if(err) return res.status(401).end();
						user.posts.push(post._id);

						user.save(function(err,user){
							if(err) return res.status(401).end();
							res.send(200);
						});

					});

		})

	}else{
		res.send(401).end('You have to log in!');
	}
});
	
app.get('/news',function(req,res){
	Post.find({})
	.exec(function(err,posts){
		if(err) return res.status(400).end();
		res.send(posts);
	});
});



app.get('/api/profile',function(req,res,next){
	User.findById(req.user._id).populate('posts')
		.exec(function(err,user){
			if(err) return res.status(401).end();
			res.send(user);

			});
});

app.post('*',function(req,res,next){
	res.redirect('/#'+req.originalUrl);
});

app.get('*',function(req,res,next){
	res.redirect('/#'+req.originalUrl);
});

var server = app.listen(app.get('port'),function(){
	console.log("Express,server listening on port: "+app.get('port'));







});