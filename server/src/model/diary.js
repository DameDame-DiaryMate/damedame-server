const DiaryModel = require("./diary.model");
const UserModel = require("./user.model");
const MinionModel = require("./minion.model");

class Diary {
  constructor(body) {
    this.body = body;
  }

  async pushDiary() {
    try {
      const curMinionId = parseInt(
        Object.values(
          JSON.parse(
            JSON.stringify(await UserModel.getMinion(this.body.userId))
          )
        )[0]
      );
      const response = await DiaryModel.pushDiary(this.body, curMinionId);

      //일기 작성 후 User에 minion exp 증가 반영
      const curMinionExp = parseInt(
        Object.values(
          JSON.parse(
            JSON.stringify(
              await MinionModel.getMinionExp(this.body.userId, curMinionId)
            )
          )
        )[0]
      );
      const updateExp = await MinionModel.updateMinionExp(
        curMinionExp + 5,
        this.body.userId,
        curMinionId
      );

      return response;
    } catch (err) {
      console.error(err);
    }
  }

  async getDiary() {
    try {
      const respDiary = await DiaryModel.getMyDiary(this.body.diaryid);
      console.log(respDiary);
      return {
        status: 200,
        message: "OK",
        data: {
          title: respDiary.title,
          content: respDiary.content,
          createdAt: respDiary.diarytime,
          minionId: respDiary.minionId,
        },
      };
    } catch (err) {
      console.error(err);
    }
  }

  async getArray() {
    try {
      const userId = this.body.params.userId;
      const size = parseInt(this.body.query.size);
      const page = parseInt(this.body.query.page);

      const response = JSON.parse(
        JSON.stringify(await DiaryModel.getDiaryInfo(userId, size, page))
      );
      //console.log(response);

      let diaryInfos = [];
      for (let i = 0; i < Object.values(response).length; i++) {
        const diaryId = Object.values(response[i])[0];
        //console.log(diaryId);
        const diaryInfo = JSON.parse(
          JSON.stringify(await DiaryModel.getMyDiary(diaryId))
        )[0];
        console.log(diaryInfo);
        diaryInfos.push(diaryInfo);
      }
      console.log(diaryInfos);

      let next, prev;
      let max = Object.values(
        JSON.parse(JSON.stringify(await DiaryModel.getDiaryCount(userId)))
      )[0];

      if (page == 1) {
        prev = null;
      } else {
        prev = page - 1;
      }
      if (page >= max / size) {
        next = null;
      } else {
        next = page + 1;
      }

      return {
        status: 200,
        message: "OK",
        data: {
          info: {
            next: next,
            prev: prev,
          },
          results: diaryInfos,
        },
      };
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = Diary;
