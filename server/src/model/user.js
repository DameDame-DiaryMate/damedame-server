const UserModel = require("./user.model");
const MinionModel = require("./minion.model");
const DiaryModel = require("./diary.model");
const jwt = require("../modules/jwt");

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

      //회원가입과 동시에 userId에 맞는 fcmToken도 DB에 추가
      const fcm = await UserModel.pushUserFCM(getId, this.body.fcmToken);

      //처음 회원가입을 하면 자동으로 캐릭터1을 도감에 추가한다.
      const getMinion = parseInt(
        Object.values(
          JSON.parse(JSON.stringify(await UserModel.getMinion(getId)))
        )[0]
      );
      const pushMinion = await UserModel.pushMinion(getId, getMinion);
      //console.log(getId, getMinion);

      const jwtToken = await jwt.sign(getId);
      console.log(jwtToken.jwtToken);
      if (response === undefined) {
        return {
          status: 201,
          message: "Created",
          data: { userId: getId, jwtToken: jwtToken.jwtToken },
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
              isNewUser: true,
            },
          };
        } else {
          return {
            status: 200,
            message: "기존에 가입된 유저입니다.",
            data: {
              isNewUser: false,
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
      const isOK = await MinionModel.isUnLockMinion(
        this.body.userId,
        this.body.minionId
      );
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

  async pushMinion() {
    try {
      //console.log(this.body);
      const response = await MinionModel.pushMinion(this.body);
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

      const exp = JSON.parse(
        JSON.stringify(
          await MinionModel.getHomeInfo(this.body, response.minion)
        )
      );
      if (exp !== undefined) {
        return {
          status: 200,
          code: "OK",
          data: {
            minion: response.minion,
            notice: response.notice,
            exp: exp.exp,
          },
        };
      }
    } catch (err) {
      console.error(err);
    }
  }

  async userInfo() {
    try {
      //닉네임, 프로필 사진 가져오기
      const userResp = JSON.parse(
        JSON.stringify(await UserModel.getUserInfo(this.body))
      )[0];

      //도감수 가져오기
      const minionCount = parseInt(
        Object.values(
          JSON.parse(
            JSON.stringify(await MinionModel.getMinionCount(this.body))
          )
        )[0]
      );

      //일기수 가져오기
      const diaryCount = parseInt(
        Object.values(
          JSON.parse(JSON.stringify(await DiaryModel.getDiaryCount(this.body)))
        )[0]
      );

      //친구수 가져오기
      const friendCount = parseInt(
        Object.values(
          JSON.parse(JSON.stringify(await UserModel.getFriendCount(this.body)))
        )[0]
      );

      return {
        status: 200,
        message: "OK",
        data: {
          userId: userResp.userId,
          nickName: userResp.nickName,
          profileImageUrl: userResp.profileImageurl,
          diaryCount: diaryCount,
          minionCount: minionCount,
          friendCount: friendCount,
        },
      };
    } catch (err) {
      console.error(err);
    }
  }

  async friendInfo() {
    try {
      const userId = this.body.params.userId;
      const size = this.body.query.size;
      const page = parseInt(this.body.query.page);

      const response = JSON.parse(
        JSON.stringify(await UserModel.getFriendInfo(userId, size, page))
      );
      //console.log(response);

      let friendInfos = [];
      for (let i = 0; i < Object.values(response).length; i++) {
        const friendId = Object.values(response[i])[0];
        const friendInfo = JSON.parse(
          JSON.stringify(await UserModel.getUserInfo(friendId))
        )[0];
        friendInfos.push(friendInfo);
      }

      let next, prev;
      let max = Object.values(
        JSON.parse(JSON.stringify(await UserModel.getFriendCount(userId)))
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
          results: friendInfos,
        },
      };
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
          status: 200,
          message: "OK",
          data: [response, { message: "푸시 알람 정보" }],
        };
      } else {
        return {
          status: 404,
          message: "NOT FOUND",
          data: [{ message: "알람 정보 못찾음" }],
        };
      }
    } catch (err) {
      console.error(err);
    }
  }

  async search() {
    try {
      const response = JSON.parse(
        JSON.stringify(await UserModel.searchNickName(this.body))
      );

      return {
        status: 200,
        message: "OK",
        data: response,
      };
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

  async minionhome() {
    try {
      const response = await MinionModel.getMinionHome(this.body);
      return response;
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = User;
