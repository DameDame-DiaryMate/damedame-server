const express = require("express");
const router = express.Router();
const userCtrl = require("../controller/user.controller");
const diaryCtrl = require("../controller/diary.controller");

/**
 * auth
 */
router.put("/v1/auth/login", userCtrl.PUT.sociallogin); //OK
router.get("/v1/auth/validate/:nickName", userCtrl.GET.checkname); //OK
router.post("/v1/auth/sign-up", userCtrl.POST.register); //OK

/**
 * user
 */
router.put("/v1/user/minion", userCtrl.PUT.choiceminion); //OK
router.post("/v1/user/minion", userCtrl.POST.pushminion);
router.get("/v1/user/home/:userId", userCtrl.GET.home); //OK
router.get("/v1/user/profile/:userId", userCtrl.GET.userinfo); //OK
router.delete("/v1/user/profile/:userId", userCtrl.DELETE.friend); //TODO
router.get("/v1/user/friend/:userId", userCtrl.GET.friendinfo); //OK
router.get("/v1/user/setting/:userId", userCtrl.GET.setting); //OK
//router.get("/v1/user/notification/:userid", userCtrl.get.notice); //TODO: API 쪼개기 + DB 수정.
router.get("/v1/user/search", userCtrl.GET.search);
router.get("/v1/user/minion/home/:userId", userCtrl.GET.minionhome);
/**
 * diary
 */
router.post("/v1/diary", diaryCtrl.POST.diary); //OK
router.get("/v1/diary/:userId/:diaryId", diaryCtrl.GET.diary); //OK
router.get("/v1/diarys/profile/:userId", diaryCtrl.GET.diaryarray); //-> 왜  diary로 하면 적용이 안되는 것인지

//TODO: 친구 검색, API 쪼개기 등의 API 추가적으로 필요.

module.exports = router;
