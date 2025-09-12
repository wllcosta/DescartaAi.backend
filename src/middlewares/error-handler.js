function errorHandler(err, req, res, next) {
    console.error("ERRO:", err.stack);

    const statusCode = err.statusCode || 500;
    const message = err.message || "Ocorreu um erro inesperado no servidor.";

    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message
    });
}

module.exports = errorHandler;