const admin = require("../config/firebase-config").getFirebaseAdmin();

exports.isAuth = async function (req, res, next) {
  const authHeader = req.headers.Authorization;
  if (authHeader === undefined) {
    const err = new Error("Missing required authorization header");
    err.statusCode = 404;
    next(err);
  }
  if (authHeader.split(" ").length > 1) {
    const tkn = authHeader.split(" ")[1];
  } else {
    const err = new Error("Missing required authorization token");
    err.statusCode = 404;
    next(err);
  }

  admin
    .auth()
    .verifyIdToken(tkn)
    .then((decodeTkn) => {
      if (decodeTkn) {
        return next();
      }
      const error = new Error("Not authorized - Invalid token.");
      error.statusCode = 401;
      next(error);
    })
    .catch((err) => {
      console.log(err);
      err.statusCode = 500;
      next(err);
    });
};
