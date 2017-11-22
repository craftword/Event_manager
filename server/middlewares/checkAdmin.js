
const checkAdmin = (request, response, next) => {
    if (request.decoded.role != 'admin') {
        response.json({message: 'Permission denied.' });
    }
    else {
        next();
    }
};

export default checkAdmin;
