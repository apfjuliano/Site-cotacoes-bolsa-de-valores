const path = require('path')
const express = require('express')
const hbs = require('hbs')


const app = express()
const cotacao = require('./util/cotacao')

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs') //O segundo parâmetro é a extensão do arquivo
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectoryPath))

//O get é o método que faz a interceptação da rota
app.get('', (req, res) => {  //Rota a ser requisitada (neste caso, '' =  raiz)
    res.render('index', { //Nome do arquivo hbs a ser renderizado
        title: 'Cotações', 
        author: 'Juliano'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Sobre',
        author: 'Juliano Costa Silva'
    })
})

app.get('/help', (req, res) => { //Rota a ser requisitada
    res.render('help', {   //Nome do arquivo hbs a ser renderizado
        title: 'Ajuda ',
        author: 'Juliano Costa'
    })
})

// app.get('/cotacao', (req, res) => {
//     cotacao('BBAS3.SA', (data)=>{
//         res.send(data)
//     })
// })

// app.get('/cotacao', (req, res) => {
//     let aux
//     aux = cotacao('BBAS3.SA', (data)=>{
//         return data
//     })
//     res.render('cotacao', {
//         stoke: aux,
//         title: 'Cotação ',
//         author: 'Juliano Costa'
//     })
// })
app.get('/cotacao', (req, res) => {
    if(!req.query.ativo){
        return res.status(400).json({
            error: {
                message: 'O ativo deve ser informado como query parameter',
                code: 400
            }
        })
    }
    
    const symbol = req.query.ativo.toUpperCase() 

    cotacao(symbol, (err, data) => {
        if(err){

            return res.status(err.code).json({error: {
                message: err.message,
                code: err.code
            }})
        }
        console.log(data)
        res.status(200).json(data)
    })
})


app.get('/help/*', (req, res) => {
    //res.send('404 do help')
    res.render('404', {
        title: '404',
        errorMessage: 'Não existe página depois de /help !',
        author: 'Juliano Costa'
    })
})

app.get('*', (req, res) => {
    //res.send('404')
    res.render('404', {
        title: '404',
        errorMessage: 'Página não encontrada !',
        author: 'Juliano Costa'
    })
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    //console.log{`server is up. Port: ${port}`}
    console.log(`server is up on port ${port}`)
})