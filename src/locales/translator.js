import I18Next from 'i18next';
import I18NBackend from 'i18next-node-fs-backend';
import Path from 'path';
import { AppDir } from '../constants';

console.log(AppDir);

export default class Translator {
    static configure() {
        I18Next.use(I18NBackend).init({
            ns: ['en', 'fr'],
            defaultNS: 'en',
            backend: {
                loadPath: Path.resolve(AppDir, 'src', 'locales', '{{ns}}.json')
            },
            fallbackLng: 'en',
            preload: ['en', 'fr'],
            saveMissing: false
        });
    }

    static translate(message, params = null) {
        return I18Next.exists(message) ? I18Next.t(message, params) : message;
    }
}
