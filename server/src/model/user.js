const UserModel = require("./user.model");

class User {
  constructor(body) {
    this.body = body;
  }

  async nameCheck() {
    try {
      //console.log(this.body);
      const response = await UserModel.getMatchName(this.body);
      return response;
    } catch (err) {
      console.error(err);
    }
  }

  async register() {
    try {
      const response = await UserModel.pushUserInfo(this.body);
      const getId = parseInt(
        Object.values(
          JSON.parse(JSON.stringify(await UserModel.getUserIDMax()))
        )[0]
      );

      //처음 회원가입을 하면 자동으로 캐릭터1을 도감에 추가한다.
      const getMinion = parseInt(
        Object.values(
          JSON.parse(JSON.stringify(await UserModel.getMinion(getId)))
        )[0]
      );
      const pushMinion = await UserModel.pushMinion(getId, getMinion);
      //console.log(getId, getMinion);

      if (response === undefined) {
        return {
          status: 201,
          message: "회원가입 완료",
          data: { userid: getId },
        };
      }
    } catch (err) {
      console.error(err);
    }
  }

  async login() {
    try {
      if (this.body.platform === "kakao") {
        const checkAccessToken = await UserModel.getAccessToken(
          this.body.socialtoken
        );
        //console.log(checkAccessToken);
        if (checkAccessToken === undefined) {
          return {
            status: 200,
            message: "신규 유저입니다.",
            data: {
              jwttoken: "asdf",
              isnewuser: true,
            },
          };
        } else {
          return {
            status: 200,
            message: "기존에 가입된 유저입니다.",
            data: {
              jwttoken: "asdf",
              isnewuser: false,
            },
          };
        }
      } else {
        return {
          status: 404,
          message: "찾을 수 없습니다.",
        };
      }
    } catch (err) {
      console.error(err);
    }
  }

  async choiceminion() {
    try {
      const isOK = await UserModel.isOpenMinion(this.body);
      let response;
      if (isOK === undefined) {
        response = {
          status: 200,
          message: "고를 수 없는 캐릭터",
          data: null,
        };
      } else {
        response = await UserModel.selectMinion(this.body);
      }
      return response;
    } catch (err) {
      console.error(err);
    }
  }

  async home() {
    try {
      const response = JSON.parse(
        JSON.stringify(await UserModel.getHome(this.body))
      );
      console.log(response);
      return response;
    } catch (err) {
      console.error(err);
    }
  }

  async userInfo() {
    try {
      const resp = JSON.parse(
        JSON.stringify(await UserModel.getUserInfo(this.body))
      );
      console.log(resp);
      return resp;
    } catch (err) {
      console.error(err);
    }
  }

  async friendInfo() {
    try {
      const response = await UserModel.getFriendInfo(this.body);
      return response;
    } catch (err) {
      console.error(err);
    }
  }

  async setting() {
    try {
      const response = JSON.parse(
        JSON.stringify(await UserModel.getSettingInfo(this.body))
      );
      console.log(response);
      if (response !== undefined) {
        return {
          status: "OK",
          code: 200,
          data: [response, { message: "푸시 알람 정보" }],
        };
      } else {
        return {
          status: "Not Found",
          code: 404,
          data: [{ message: "알람 정보 못찾음" }],
        };
      }
    } catch (err) {
      console.error(err);
    }
  }

  async notice() {
    try {
      const response = await UserModel.getNotice(this.body);
      return response;
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = User;
