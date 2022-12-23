import Response from './response';

export default class Wrapper {
    static wrap(func) {
        return async (req, res) => {
            try {
                const data = await func(req, res);
                if (!data) {
                    return Response.success(res, data);
                }
                return Response.success(
                    res,
                    data.pageInfo ? data.data || data : data,
                    data.pageInfo
                );
            } catch (error) {
                Response.error(req, res, error);
            }
        };
    }
}
