const admin = require("../config/firebase-config").getFirebaseAdmin();

exports.isAuth = async function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    let token;
    if (authHeader === undefined) {
      const err = new Error("Missing required authorization header");
      err.statusCode = 404;
      next(err);
    }
    if (authHeader.split(" ").length > 1) {
      token = authHeader.split(" ")[1];

      const decodeToken = await admin.auth().verifyIdToken(token);
      if (decodeToken) {
        return next();
      }
      const error = new Error("Not authorized - Invalid token.");
      error.statusCode = 401;
      next(error);
    } else {
      const err = new Error("Missing required authorization token");
      err.statusCode = 404;
      next(err);
    }
  } catch (error) {
    const err = new Error("Not authorized - Invalid token.");
    err.statusCode = 401;
    err.message = error.message;
    next(err);
  }
};
