const express = require('express');
const handlebars = require('express-handlebars');
const { Router } = express;

const app = express();
const router = Router();

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use('/api', router);

app.use(express.static('public'));


/*
app.get('/', function (req, res) {
    res.sendFile((__dirname + '/public/index.html'));
})
*/




























app.get('/', (req, res) => {
    res.render('main', {layout : 'index'});
    });
    


    



app.engine(
    "hbs", 
    handlebars.engine({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + "/views/layouts",
        partialsDir: __dirname + "/views/partials/"
    })
);
app.set('view engine', 'hbs');
app.set('views', './views');


const server = app.listen(8080, () => {
    console.log('La aplicacion express esta escuchando en el puerto 8080')
})






// GET Devuelve todos los productos


router.get('/productos', (req, resp) => {
    let disponibles = productos.getAll()
    resp.json(disponibles);
})




// GET Devuelve por ID

/*
router.get('/productos/:id', (req, resp) => {
    let seleccion = productos.getById(parseInt(req.params.id))

    if (seleccion != 0) {
        resp.json({
            result: 'get by id',
            producto: seleccion,
            id: req.params.id, 
        });
    } else {       
        resp.json({
            error: 'producto no encontrado',
        });
        // resp.status(404).send('Producto no encontrado');

    }
})
*/




// POST Recibe y agrega un prod y lo devuelve con su ID asignado.
router.post('/productos', (req, resp) => {
    new_index = productos.save(req.body) - 1;
    let disponibles = productos.getAll();
    let ultimo = disponibles[new_index];

    resp.redirect('/')

})



// PUT Recibe y actualiza un prod segun su id.
router.put('/productos/:id', (req, resp) => {
    productos.updateById(req.body);
    resp.json({
        control: req.body
    });
})




// DELETE Eminima un producto segun su id.
router.delete('/productos/:id', (req, resp) => {
    productos.deleteById(parseInt(req.params.id))
 
    resp.json({
        result: 'Delete by id',
        id: req.params.id
    });
})



router.get('/productos/vista', (req, resp) => {
    let prods = productos.getAll()

    resp.render("vista", {
        products: prods,
        hayProductos: prods.length
    });
});








const fs = require('fs');

class Contenedor {

    constructor (path, name, price, id, thumbnail) {
        this.name = name;
        this.price = price;
        this.id = 1;
        this.thumbnail = thumbnail;
        this.route=path
    }

    save(Object) {
        Object.id = this.id++;
        let temp = [];

        try {
            let data = fs.readFileSync(this.route, 'utf-8');
            temp = JSON.parse(data);
        } catch (err) {
        }

        temp.push(Object);
        fs.writeFileSync(this.route, JSON.stringify(temp));
        return Object.id;
    }

    getById(Number) {
        let temp = [];
        let prod_id = Number;
        try {
            let data = fs.readFileSync(this.route, 'utf-8');
            temp = JSON.parse(data);
        } catch (err) {
        }
        let sel = temp.filter(elegido => {
            return elegido.id === prod_id;
        })
        return sel
    }

    getAll() {
        let temp = [];
        try {
            let data = fs.readFileSync(this.route, 'utf-8');
            temp = JSON.parse(data);
        } catch (err) {
        }
        return temp;
    }

    deleteById(Number) {
        let temp = [];
        let prod_id = Number;
        try {
            let data = fs.readFileSync(this.route, 'utf-8');
            temp = JSON.parse(data);
        } catch (err) {
        }
        let sel = temp.filter(elegido => {
            return elegido.id != prod_id;
        })
        fs.writeFileSync(this.route, JSON.stringify(sel));
    }


    deleteAll() {
        let temp = [];
        let erase = [];
        try {
            let data = fs.readFileSync(this.route, 'utf-8');
            temp = JSON.parse(data);
        } catch (err) {
        }
        fs.writeFileSync(this.route, JSON.stringify(erase));
    }

    updateById(put_producto) {
        let temp = [];
        let prod_id = put_producto.id;
        try {
            let data = fs.readFileSync(this.route, 'utf-8');
            temp = JSON.parse(data);
        } catch (err) {
        }


        let sel = temp.map(elegido => {
            if (elegido.id === prod_id) {
                elegido = put_producto;
            }
            return elegido;
        })




        fs.writeFileSync(this.route, JSON.stringify(sel));
    }


}

let productos = new Contenedor('./productos.json');
let prod1 = {nombre: 'taza', price: 10, thumbnail: 'img1.png'};
let prod2 = {nombre: 'vaso', price: 20, thumbnail: 'img2.png'};
let prod3 = {nombre: 'plato', price: 30, thumbnail: 'img3.png'};

productos.save(prod1)
productos.save(prod2)
productos.save(prod3)

