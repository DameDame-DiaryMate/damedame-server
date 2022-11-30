const User = require("../model/user");

const GET = {
  checkname: async (req, res) => {
    //console.log(req.params.profilename);
    const user = new User(req.params.nickname);
    const response = await user.nameCheck();
    return res.json(response);
  },
  home: async (req, res) => {
    const user = new User(req.params.userId);
    const response = await user.home();
    return res.json(response);
  },
  userinfo: async (req, res) => {
    console.log(req.params.userId);
    const user = new User(req.params.userId);
    const response = await user.userInfo();
    return res.json(response);
  },
  friendinfo: async (req, res) => {
    const user = new User(req);
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

const POST = {
  register: async (req, res) => {
    //console.log(req.body);
    const user = new User(req.body);
    const response = await user.register();
    return res.json(response);
  },
  pushminion: async (req, res) => {
    const user = new User(req.body);
    const response = await user.pushMinion();
    return res.json(response);
  },
};

const PUT = {
  sociallogin: async (req, res) => {
    const user = new User(req.body);
    const response = await user.login();
    console.log(response);
    return res.json(response);
  },
  choiceminion: async (req, res) => {
    const user = new User(req.body);
    const response = await user.choiceminion();
    return res.json(response);
  },
};

const DELETE = {
  friend: async (req, res) => {
    const user = new User(req.params.userId);
  },
};
module.exports = { GET, POST, PUT, DELETE };
