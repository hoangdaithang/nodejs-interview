import Response from './response';

export default class Wrapper {
    static sucsses(func) {
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

    static created(func) {
        return async (req, res) => {
            try {
                const data = await func(req, res);
                if (!data) {
                    return Response.created(res, data);
                }
                return Response.created(
                    res,
                    data.pageInfo ? data.data || data : data,
                    data.pageInfo
                );
            } catch (error) {
                Response.error(req, res, error);
            }
        };
    }

    static logout(func) {
        return async (req, res) => {
            try {
                const data = await func(req, res);
                if (!data) {
                    return Response.logout(res, data);
                }
                return Response.logout(
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
