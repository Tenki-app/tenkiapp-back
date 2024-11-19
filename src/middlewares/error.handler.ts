import { NextFunction } from "express";

function logs(err: Error, req: any, res: any, next: NextFunction) {
	console.error(err);
	next(err);
}

function errorHandler(err: Error, req: any, res: any, next: NextFunction) {
	res.status(500).json({
		message: err.message,
		stack: err.stack,
	});
}
module.exports = { logs, errorHandler };
