const express = require('express');
app = express();

multer = require('multer');
path = require('path');

// cria uma instância do middleware configurada
// destination: lida com o destino
// filename: permite deifnir o nome do arquivo gravado
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //error first callback
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // error first callback
        // mantém extensão original
        cb(null, `${file.fieldname}-${Date.now()}.${path.extname(file.originalname)}`)
    }
});

// utiliza storage para configurar a instância do multer
const upload = multer(storage);

app.use(express.static('public'));

app.listen(3000, () => console.log('App na porta 3000'));

// rota indicado no atributo action do formulário
// file = mesmo name do form
app.post('/file/upload', upload.single('file'),
    (req, res) => res.send('<h2>Upload realizado com sucesso</h2>'));