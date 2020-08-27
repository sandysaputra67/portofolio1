const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const util = require("util")
const multer = require('multer')
const path = require('path')
//const upload = multer({ dest: 'uploads/'});//
const middleware = require('./config/authMiddleware.js');
const app = express()
const port = 3003
const {
    users,
    kategori,
    buku,
    orders,
} = require('./controller');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/static', express.static(path.join(__dirname, 'public')))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
      },
      filename: function (req, file, cb) {
        var fileObj = {
          "image/png": ".png",
          "image/jpeg": ".jpeg",
          "image/jpg": ".jpg"
        };
        if (fileObj[file.mimetype] == undefined) {
          cb(new Error("file format not valid"));
        } else {
            cb(null, file.fieldname + '-' + Date.now() + fileObj[file.mimetype])
        }
    }
  });

const imageFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
   storage: storage,
     limits: {
      fileSize: 1024 * 1024 * 5,
     },
//     fileFilter: imageFilter
 });

const uploadAsync = util.promisify(upload.single('image_url'));


app.use(cors())
app.get('/books', buku.get_list);
app.post('/books', middleware.userAuth,middleware.checkRole,  buku.create);
app.get('/books/:id', buku.get_by_id);
app.put('/books/:id', middleware.userAuth,middleware.checkRole, buku.update_by_id); 
app.delete('/books/:id', middleware.userAuth,middleware.checkRole, buku.delete_by_id); 



app.get('/', (req, res) => res.send('hello!'))
app.post('/register', users.register);
app.post('/login', users.login);

app.get('/kategori', kategori.get_list);
app.post('/kategori',middleware.userAuth, middleware.checkRole, kategori.create);
app.get('/kategori/:id', kategori.get_by_id);
app.put('/kategori/:id', middleware.userAuth,middleware.checkRole, kategori.update_by_id);
app.delete('/kategori/:id', middleware.userAuth,middleware.checkRole, kategori.delete_by_id);


app.post('/orders', middleware.userAuth,   orders.create);
app.get('/orders/:id', middleware.userAuth, orders.get_by_id);
app.get('/orders', middleware.userAuth, orders.get_list);
app.listen(port, () => console.log(`listening at http://localhost:${port}`))