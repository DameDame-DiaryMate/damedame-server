const db = require("../config/db");

class MinionModel {
  static getHomeInfo(request) {
    return new Promise((resolve, reject) => {
      const query = `SELECT exp FROM Minion WHERE userid=? AND minionid=?`;
      db.query(query, [request.userid, request.minionid], (err, result) => {
        if (resolve) resolve(result[0]);
        else reject(err);
      });
    });
  }

  static getMinionReps(userid) {
    return new Promise((resolve, reject) => {
      const query = `SELECT COUNT(minionid) FROM Minion WHERE userid=?`;
      db.query(query, [userid], (err, result) => {
        if (resolve) resolve(result[0]);
        else reject(err);
      });
    });
  }
}

module.exports = MinionModel;
