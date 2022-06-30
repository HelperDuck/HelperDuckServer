import request from 'supertest';
import Express from 'express';
import Cors from 'cors';
import router from '../src/router/router';

const app = Express();
app.use(Cors()).use(Express.json());

export const supertest = request(app.use(router));
