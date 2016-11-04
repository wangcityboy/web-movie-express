var express = require('express');
var path = require('path');
var mongoose = require('mongoose')
var _ = require('underscore')
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000

var app = express();
var Movie = require('./models/movie')

mongoose.connect('mongodb://localhost/imooc')

app.set('views', './views/pages');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.urlencoded({extended:true}))
app.locals.moment = require('moment')
app.listen(port)

console.log('immoc started on port' + port)

app.get('/',function(req,res){
    Movie.fetch(function(err,movies){
        if(err){
            console.log(err)
        }
        res.render('index',{
            title:'影院热度播报',
            movies:movies
        })
    })
})

app.get('/movie/:id',function(req,res){
    var id = req.params.id
    Movie.findById(id,function(err,movie){
        res.render('detail',{
            title:'immoc ' + movie.title,
            movie:movie
        })
    })
})



app.get('/admin/movie',function(req,res){
    res.render('admin',{
        title:'immoc 后台录入页',
        movie:{
            title:'',
            doctor:'',
            country:'',
            year:'',
            poster:'',
            flash:'',
            summary:'',
            language:''
        }
    })
})

app.post('/admin/movie/new',function(req,res){
    console.log(req.body)
    //console.log(res)

    var id = req.body.movie._id
    var movieObj = req.body.movie
    var _movie
    if (id !== 'undefined'){
        Movie.findById(id,function(err,movie){
            if(err){
                console.log(err)
            }
            _movie = _.extend(movie,movieObj)
            _movie.save(function(err,movie){
                if(err){
                    console.log(err)
                }
                res.redirect('/movie/' + movie._id)
            })
        })
    }else{//新的一部电影
        _movie = new Movie({
            title:movieObj.title,
            doctor:movieObj.doctor,
            country:movieObj.country,
            language:movieObj.language,
            year:movieObj.year,
            poster:movieObj.poster,
            summary:movieObj.summary,
            flash:movieObj.flash
        })
        _movie.save(function(err,movie){
            if(err){
                console.log(err)
            }
            res.redirect('/movie/' + movie._id)
        })
    }
})

app.get('/admin/update/:id',function(req,res){
    var id = req.params.id
    if(id){
        Movie.findById(id,function(err,movie){
            res.render('admin',{
                title:'immooc 后台更新页',
                movie:movie
            })
        })
    }
})

app.get('/admin/list',function(req,res){
    Movie.fetch(function(err,movies){
        if(err){
            console.log(err)
        }
        res.render('list',{
            title:'imooc 列表页',
            movies:movies
        })
    })
})


app.delete('/admin/list',function(req,res){
    var id = req.query.id
    if (id){
        Movie.remove({_id:id},function(err,movie){
            if(err){
                console.log(err)
            }else{
                res.json({success:1})
            }
        })
    }
})
