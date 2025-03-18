import express from 'express';
import argsUtils from './utils/args.utils.js';
import loggerUtil from './utils/logger.util.js';

const server = express();
const port = 8080;

const ready = async () =>{
    const mode = argsUtils.mode;
    loggerUtil.INFO(`Server corriendo en puerto ${port} en modo ${mode}`)
}

server.get('/', (req, res) => {
    res.send('¡Hola, mundo desde Express con ES Modules!');
});

server.listen(port, ready);
