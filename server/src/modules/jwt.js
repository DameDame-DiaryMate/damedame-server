const randToken = require("rand-token");
const jwt = require("jsonwebtoken");
const secretKey = require("../../config/secretKey").normal.secretKey;
const option = require("../../config/secretKey").normal.option;
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

const normal = {
  sign: async (id) => {
    const payLoad = {
      userId: id,
    };
    const result = {
      token: jwt.sign(payLoad, secretKey, option),
      refreshToken: randToken.uid(256),
    };
    return {
      jwtToken: jwt.sign(payLoad, secretKey, option),
    };
  },
  verify: async (token) => {
    let decoded;
    try {
      decoded = jwt.verify(token, secretKey);
    } catch (err) {
      if (err.message === "TOKEN EXPIRED") {
        console.log("TOKEN EXPIRED");
        return TOKEN_EXPIRED;
      } else if (err.message === "TOKEN INVALID") {
        console.log("TOKEN INVALID");
        return TOKEN_INVALID;
      } else {
        console.log("TOKEN INVALID");
        return TOKEN_INVALID;
      }
    }
    return decoded;
  },
};

module.exports = normal;
