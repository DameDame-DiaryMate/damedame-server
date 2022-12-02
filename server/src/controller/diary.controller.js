const Diary = require("../model/diary");

const GET = {
  diary: async (req, res) => {
    const diary = new Diary(req.params);
    const response = await diary.getDiary();
    console.log("GET /diary Req");
    return res.json(response);
  },
  diaryarray: async (req, res) => {
    const diary = new Diary(req);
    const response = await diary.getArray();
    console.log("GET /diaryarray Req");
    return res.json(response);
  },
};

const POST = {
  diary: async (req, res) => {
    const diary = new Diary(req.body);
    //console.log(req.body);
    const response = await diary.pushDiary();
    console.log("POST /diary Req");
    return res.json(response);
  },
};

module.exports = { GET, POST };
