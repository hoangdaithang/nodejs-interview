import BodyParser from 'body-parser';
import CookieParser from 'cookie-parser';
import Express from 'express';
import Path from 'path';
import Cors from 'cors';
import { Translator } from './locales';
import { ErrorHandler, NotFoundHander } from './error-handlers';
import Router from './routes';
import { LanguageMiddleware } from './middlewares';
import { AppDir } from './constants';
const sessionSecret = 'sessionSecret';
import Http from 'http';
import Moment from 'moment-timezone';
Moment.tz.setDefault('UTC');
Translator.configure();

const app = Express();

app.use(Express.static(Path.join(AppDir, 'public')));
app.use(CookieParser(sessionSecret));
app.use(Cors());
app.use(BodyParser.json());
app.use('/api', LanguageMiddleware, Router(app));
app.use('*', NotFoundHander);
app.use(ErrorHandler);

const server = Http.createServer(app);
process.on('uncaughtException', function (err) {
    global.logger.error(err);
});

server.listen(process.env.PORT, async () => {
    console.log('Server run in port:' + process.env.PORT);
});

