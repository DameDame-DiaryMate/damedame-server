const express = require("express");
const router = express.Router();
const userCtrl = require("../controller/user.controller");
const diaryCtrl = require("../controller/diary.controller");
const minionCtrl = require("../controller/minion.controller");

/**
 * auth
 */
router.put("/v1/auth/login", userCtrl.put.sociallogin); //OK
router.get("/v1/auth/validate/:profilename", userCtrl.get.checkname); //OK
router.post("/v1/auth/sign-up", userCtrl.post.register); //OK

/**
 * user
 */
router.put("/v1/user/minion", userCtrl.put.choiceminion); //OK
router.get("/v1/user/home/:userid", userCtrl.get.home); //OK
router.get("/v1/user/profile/:userid", userCtrl.get.userinfo); //OK
router.get("/v1/user/friend/:userid/:page", userCtrl.get.friendinfo); //TODO: DB Table 수정 후 손봐야 함.
router.get("/v1/user/setting/:userid", userCtrl.get.setting); //OK
//router.get("/v1/user/notification/:userid", userCtrl.get.notice); //TODO: API 쪼개기 + DB 수정.

/**
 * minion
 */
router.get("/v1/minion/home/:userid/:minionid", minionCtrl.get.home); //OK
router.get("/v1/minion/profile/:userid", minionCtrl.get.minioninfo); //OK

/**
 * diary
 */
router.post("/v1/diary", diaryCtrl.post.diary); //TODO: 일기 작성시 minion exp 증가에 대한 resp 필요.
router.get("/v1/diary/:userid/:diaryid", diaryCtrl.get.diary); //TODO: API 쪼개기 대상.

//TODO: 친구 검색, API 쪼개기 등의 API 추가적으로 필요.

module.exports = router;
