const express = require('express');
const Article = require('./../models/article')
const router = express.Router();

router.get('/new', (req, resp) => {
    resp.render('articles/new', {article: new Article()})
});

router.get('/:title', async (req, res) => {
    const article = await Article.get({"title": req.params.title})
    if(article == null) res.redirect('/')
    res.render('articles/show', {article: article})
});

router.post('/', async(req, res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    try{
        article = await article.save()
        res.redirect(`/articles/${article.title}`)
    }
    catch(e){
        console.log(e)
        res.render('articles/new', {article: article})
    }

})

module.exports = router