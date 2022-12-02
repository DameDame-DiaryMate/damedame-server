const db = require("../../config/db");

class DiaryModel {
  //DB에 작성한 일기 push
  static pushDiary(request, minionId) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO Diary(userId,title,content,positive,neutral,negative,minionId) VALUES(?,?,?,?,?,?,?);`;
      db.query(
        query,
        [
          request.userId,
          request.title,
          request.content,
          request.emotion.positive,
          request.emotion.neutral,
          request.emotion.negative,
          minionId,
        ],
        (err) => {
          if (err) reject(err);
          resolve({
            status: 201,
            message: "Created",
            data: null,
          });
        }
      );
    });
  }

  //방금 쓴 다이어리 번호 찾아오기 -> 일기 중 가장 큰 번호가 방금 쓴 일기일 것임.
  static getMaxDiary(userid) {
    return new Promise((resolve, reject) => {
      const query = `SELECT MAX(diaryid) FROM Diary;`;
      db.query(query, [userid], (err, result) => {
        if (err) reject(err);
        resolve(result[0]);
      });
    });
  }

  //userid에 맞는 diaryid 조회하기
  static getDiaryId(userid) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM Diary WHERE userid=?`;
      db.query(query, [userid], (err, results) => {
        if (resolve) resolve(results);
        else reject(err);
      });
    });
  }

  //diaryid 페이지 수에 맞게 가져오기
  static getDiaryInfo(userId, size, page) {
    return new Promise((resolve, reject) => {
      const query = `SELECT diaryId FROM Diary WHERE userId=? LIMIT ${size} OFFSET ?`;
      db.query(query, [userId, (page - 1) * size], (err, result) => {
        if (resolve) resolve(result);
        else reject(err);
      });
    });
  }

  //다이어리 하나 열람하기
  static getMyDiary(diaryId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM Diary WHERE diaryId=?`;
      db.query(query, [diaryId], (err, result) => {
        if (resolve) resolve(result);
        else reject(err);
      });
    });
  }

  //유저가 쓴 일기 개수 가져오기
  static getDiaryCount(userId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT COUNT(diaryId) FROM Diary WHERE userId=?`;
      db.query(query, [userId], (err, result) => {
        if (resolve) resolve(result[0]);
        else reject(err);
      });
    });
  }
}

module.exports = DiaryModel;
