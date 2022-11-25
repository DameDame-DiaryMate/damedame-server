const MinionModel = require("./minion.model");

class Minion {
  constructor(body) {
    this.body = body;
  }

  async getHome() {
    try {
      const resp = JSON.parse(
        JSON.stringify(await MinionModel.getHomeInfo(this.body))
      );
      if (resp !== undefined) {
        return {
          status: 200,
          message: "홈 화면에 필요한 캐릭터 정보",
          data: { resp },
        };
      }
    } catch (err) {
      console.error(err);
    }
  }

  async getMinionInfo() {
    try {
      const resp = parseInt(
        Object.values(
          JSON.parse(JSON.stringify(await MinionModel.getMinionReps(this.body)))
        )[0]
      );
      return {
        status: 200,
        message: "도감의 수",
        data: {
          minions: resp,
        },
      };
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = Minion;
