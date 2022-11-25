const User = require("../model/user");

const get = {
  checkname: async (req, res) => {
    //console.log(req.params.profilename);
    const user = new User(req.params.nickname);
    const response = await user.nameCheck();
    return res.json(response);
  },
  home: async (req, res) => {
    const user = new User(req.params.userid);
    const response = await user.home();
    return res.json(response);
  },
  userinfo: async (req, res) => {
    //console.log(req.params);
    const user = new User(req.params);
    const response = await user.userInfo();
    return res.json(response);
  },
  friendinfo: async (req, res) => {
    const user = new User(req.params);
    const response = await user.friendInfo();
    return res.json(response);
  },
  setting: async (req, res) => {
    const user = new User(req.params.userid);
    const response = await user.setting();
    return res.json(response);
  },

  //TODO: notice 테이블로 유저의 알림 목록 가져오기
  //   notice: async (req, res) => {
  //     const user = new User(req.params.userid);
  //     const response = await user.notice();
  //     return res.json(response);
  //   },
};

const post = {
  register: async (req, res) => {
    //console.log(req.body);
    const user = new User(req.body);
    const response = await user.register();
    return res.json(response);
  },
};

const put = {
  choiceminion: async (req, res) => {
    const user = new User(req.body);
    const response = await user.choice();
    return res.json(response);
  },
  sociallogin: async (req, res) => {
    const user = new User(req.body);
    const response = await user.login();
    console.log(response);
    return res.json(response);
  },
};

module.exports = { get, post, put };
