export default (req, res, next) => {
    const suppportLanguages = ['en', 'nl'];
    const ns = req.headers[`accept-language`];
    req.ns = suppportLanguages.includes(ns) ? ns : process.env.LANGUAGE;
    req.timezone = req.headers[`timezone`] || process.env.TIMEZONE;
    req.deviceId = req.headers[`deviceid`];

    next();
};
