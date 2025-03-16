import express from "express";
import cors from "cors";

import homeRouter from './routes/home';

const api = express();

export async function initalizeApi(){
    api.use(cors());
    api.use(express.json());

    // use the different routers defined in ./routes
    api.use('/', homeRouter);
}


export default api;