const db = require("../../config/db");

class UserModel {
  //회원가입 시 프로필이름 중복 여부 체크
  static getMatchName(nickname) {
    return new Promise((resolve, reject) => {
      const query = "SELECT nickname FROM User WHERE nickname=?";
      db.query(query, [nickname], (err, result) => {
        if (resolve) {
          if (result[0] === undefined) {
            resolve({
              status: 200,
              message: "중복되지 않은 회원입니다.",
              data: { available: true },
            });
          } else {
            resolve({
              //No Content
              status: 204,
              message: "중복된 이름입니다.",
              data: { available: false },
            });
          }
        } else reject(err);
      });
    });
  }

  //소셜로그인 시 유저가 회원가입인지 로그인인지 판별하기 위해 accesstoken 검사
  static getAccessToken(token) {
    return new Promise((resolve, reject) => {
      const query = `SELECT accesstoken FROM User WHERE accesstoken=?`;
      console.log(token);
      db.query(query, [token], (err, result) => {
        if (err) reject(err);
        resolve(result[0]);
      });
    });
  }

  //회원가입 후 유저 정보를 DB에 푸시
  static pushUserInfo(request) {
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO User(nickName,profileImageUrl,accessToken,platform) VALUES(?,?,?,?)";
      db.query(
        query,
        [
          request.nickName,
          request.profileImageUrl,
          request.socialToken,
          request.platform,
        ],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  }

  //회원가입 즉시 userid 반환하기 위함
  static getUserIDMax() {
    return new Promise((resolve, reject) => {
      const query = "SELECT MAX(userid) FROM User";
      db.query(query, (err, result) => {
        if (resolve) resolve(result[0]);
        else reject(err);
      });
    });
  }

  //해당 userid가 있는지 확인 ()
  static getUserID(userid) {
    return new Promise((resolve, reject) => {
      const query = "SELECT userid FROM User WHERE userid=?";
      db.query(query, [userid], (err, result) => {
        if (resolve) {
          resolve({
            status: 200,
            message: "해당 유저가 존재합니다.",
          });
        } else reject(err);
      });
    });
  }

  //유저의 id와 fcmtoken을 DB에 푸시
  static pushUserFCM(userId, fcmToken) {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO UserFCMToken(userId, fcmToken) VALUES(?,?);";
      db.query(query, [userId, fcmToken], (err) => {
        if (err) reject;
        resolve({
          status: 201,
          message: "fcmtoken 푸시 완료",
        });
      });
    });
  }

  //캐릭터 선택 후 DB에 선택을 반영
  static selectMinion(request) {
    return new Promise((resolve, reject) => {
      const query = "UPDATE User SET minion=? WHERE userid=?";
      db.query(query, [request.minionId, request.userId], (err) => {
        if (resolve) {
          resolve({
            status: 200,
            message: "캐릭터 선택을 완료했습니다.",
            data: null,
          });
        } else reject(err);
      });
    });
  }

  //minion을 도감에 추가
  static pushMinion(userid, minionid) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO Minion(userid, minionid) VALUES(?,?)`;
      db.query(query, [userid, minionid], (err) => {
        if (resolve)
          resolve({
            status: 201,
            message: "캐릭터 도감 추가 완료",
            data: null,
          });
        else reject(err);
      });
    });
  }

  //현재 내 minion이 뭔지 가져오기
  static getMinion(userId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT minion FROM User WHERE userid=?`;
      db.query(query, [userId], (err, result) => {
        if (resolve) resolve(result[0]);
        else reject(err);
      });
    });
  }

  //홈화면에 필요한 캐릭터정보와 알림 온오프 값 DB에서 받아오기
  static getHome(userId) {
    return new Promise((resolve, reject) => {
      const query = "SELECT minion, notice FROM User WHERE userId=?";
      db.query(query, [userId], (err, result) => {
        if (resolve) {
          resolve(result[0]);
        } else reject(err);
      });
    });
  }

  //유저의 프로필에 보여지는 정보를 DB에서 가져오기
  static getUserInfo(userId) {
    return new Promise((resolve, reject) => {
      const query =
        "SELECT userId,nickName,profileImageurl FROM User WHERE userId=?";
      db.query(query, [userId], (err, result) => {
        if (resolve) {
          resolve(result);
        } else reject(err);
      });
    });
  }

  //유저의 현재 캐릭터를 DB에서 가져오기
  static getUserMinion(userid) {
    return new Promise((resolve, reject) => {
      const query = `SELECT minion FROM User WHERE userid=?`;
      db.query(query, [userid], (err, result) => {
        if (err) reject(err);
        resolve(result[0]);
      });
    });
  }

  //유저의 친구 목록을 조회하기
  static getFriendInfo(userId, size, page) {
    return new Promise((resolve, reject) => {
      const query = `SELECT friendId FROM Friend WHERE userId=? LIMIT ${size} OFFSET ?`;
      db.query(query, [userId, (page - 1) * size], (err, result) => {
        if (resolve) {
          resolve(result);
        } else reject(err);
      });
    });
  }

  //유저의 친구 수를 가져오기
  static getFriendCount(userId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT COUNT(*) FROM Friend WHERE userId=?`;
      db.query(query, [userId], (err, result) => {
        if (resolve) {
          resolve(result[0]);
        } else reject(err);
      });
    });
  }

  //유저의 설정 정보 가져오기
  static getSettingInfo(userid) {
    return new Promise((resolve, reject) => {
      const query = "SELECT notice FROM User WHERE userid=?";
      db.query(query, [userid], (err, result) => {
        if (resolve) {
          resolve(result[0]);
        } else reject(err);
      });
    });
  }

  //검색한 이름이 포함된 유저 검색
  static searchNickName(name) {
    return new Promise((resolve, reject) => {
      const query = `SELECT userId,nickName,profileImageUrl FROM User WHERE nickName LIKE '%${name}%'`;
      db.query(query, (err, result) => {
        if (resolve) resolve(result);
        else reject(err);
      });
    });
  }

  //유저에게 온 알림 목록 가져오기
  static getNotice(userid) {}
}

module.exports = UserModel;
