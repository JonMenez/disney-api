const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger.json');
const { authRouter, characterRouter, contentRouter, genreControllers, userRouter } = require('../routes');
const db = require('../../config/database');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.paths = {
            auth: '/api/v1/auth',
            characters: '/api/v1/characters',
            contents: '/api/v1/contents',
            genres: '/api/v1/genres',
            users: '/api/v1/users',
        }

        this.connectDB()
        this.middlewares()
        this.routes()
    }

    async connectDB() {
        try {
            await db.sync({ alter: true });
            // await db.authenticate();
            console.log('Database connected');
        } catch (error) {
            console.log(error);
            console.log('It could not connect to the database');
        }
    }

    middlewares() {
        //CORS
        this.app.use(cors())
        //Static files
        this.app.use(express.static('public'));
        //Body parser
        this.app.use(express.json());
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    }

    routes() {
        this.app.use(this.paths.auth, authRouter);
        this.app.use(this.paths.characters, characterRouter);
        this.app.use(this.paths.contents, contentRouter);
        this.app.use(this.paths.genres, genreControllers);
        this.app.use(this.paths.users, userRouter);
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

module.exports = Server;