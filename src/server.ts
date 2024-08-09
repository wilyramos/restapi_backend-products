import express from 'express';
import router from './router';
import cors, { CorsOptions} from 'cors';
import morgan from 'morgan';
import db from './config/db';
import colors from 'colors';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec,  { swaggerUiOptions } from './config/swagger';

// Conectar a base de datos

export async function connection() {
    try {
        await db.authenticate();
        db.sync(); // Sincronizar modelos con la base de datos
    }
    catch (error) {
        console.log(colors.bgRed.white( 'Error connecting to the database'))
    }
}
connection();


// Instancia de express
const server = express();

// Permitir conexiones cruzadas (CORS)

const corsOptions : CorsOptions = {
    origin: function(origin, callback){
        if(origin === process.env.FRONTEND_URL){
            callback(null, true);
        }
        else {
            callback(new Error('No permitido por CORS'));
        }
    }
}

server.use(cors(corsOptions));


// Leer datos de formularios
server.use(express.json());

// morgan
server.use(morgan('dev'));

// routing
server.use('/api/products', router);

// Docs
server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, swaggerUiOptions));


export default server;