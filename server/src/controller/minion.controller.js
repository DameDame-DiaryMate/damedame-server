const Minion = require("../model/minion");

const get = {
  home: async (req, res) => {
    const minion = new Minion(req.params);
    const resp = await minion.getHome();
    return res.json(resp);
  },
  minioninfo: async (req, res) => {
    const minion = new Minion(req.params.userid);
    const resp = await minion.getMinionInfo();
    console.log(resp);
    return res.json(resp);
  },
};

const post = {};

module.exports = { get, post };
