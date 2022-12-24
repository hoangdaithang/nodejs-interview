
export default class ObjectUtils {
    static deleteFields(object, ...fields) {
        fields.forEach((item) => {
            delete object[`${item}`];
        });
        return object;
    }
}
