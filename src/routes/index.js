import Express from 'express';
import FS from 'fs-extra';
export default app => {
    const router = Express.Router();
    FS.readdirSync(__dirname).forEach(fileName => {
        fileName.endsWith('route.js') && require(`${__dirname}/${fileName}`).default(app, router);
    });
    return router;
};
