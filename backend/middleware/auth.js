const admin = require("../config/firebase-config");

exports.decodeToken = async function (req, res, next) {
  const tkn = req.header.accessToken;
  admin.auth
    .verifyIdToken(tkn)
    .then((decodeTkn) => {
      if (decodeTkn) {
        res.json({message : "authorized"});
      }
      res.json({ message: "unauthorized" });
    })
    .catch((error) => {
      console.log(error);
    });
};
