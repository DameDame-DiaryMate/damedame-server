const db = require("../config/db");

class MinionModel {
  //새로운 캐릭터 DB에 추가
  static pushMinion(request) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO Minion(minionId, userId) VALUES(?,?);`;
      db.query(query, [request.minionId, request.userId], (err, result) => {
        if (resolve)
          resolve({
            status: 201,
            message: "Created",
            data: null,
          });
        else reject(err);
      });
    });
  }

  //현재 나의 캐릭터의 수 가져오기
  static getMinionCount(userId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT COUNT(minionId) FROM Minion WHERE userId=?`;
      db.query(query, [userId], (err, result) => {
        if (resolve) resolve(result[0]);
        else reject(err);
      });
    });
  }

  //캐릭터가 열려있는지 확인
  static isUnLockMinion(userId, minionId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT onLock FROM Minion WHERE userId=? AND minionId=?`;
      db.query(query, [userId, minionId], (err, result) => {
        if (resolve) resolve(result[0]);
        else reject(err);
      });
    });
  }

  //현재 선택된 캐릭터의 경험치 가져오기
  static getMinionExp(userId, minionId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT exp FROM Minion WHERE userId=? AND minionId=?`;
      db.query(query, [userId, minionId], (err, result) => {
        if (resolve) resolve(result[0]);
        else reject(err);
      });
    });
  }

  //선택된 캐릭터의 lock 풀어주기
  static unLockMinion(userId, minionId) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE Minion SET onLock=true WHERE userid=? AND minionId=?`;
      db.query(query, [userId, minionId], (err, result) => {
        if (reject) reject(err);
      });
    });
  }

  //일기 작성 후 증가된 exp를 DB에 반영
  static updateMinionExp(exp, userId, minionId) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE Minion SET exp=? WHERE userId=? AND minionId=?`;
      db.query(query, [exp, userId, minionId], (err, result) => {
        if (resolve)
          resolve({
            status: 201,
            message: "Created",
            data: null,
          });
        else reject(err);
      });
    });
  }
}

module.exports = MinionModel;
