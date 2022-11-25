const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "11111111",
  database: "DameDame",
  // host: process.env.HOST,
  // port: process.env.PORT,
  // user: process.env.USER,
  // password: process.env.PASSWORD,
  // database: process.env.DATABASE,
});

db.connect((err) => {
  if (err) return console.error("Database Connected Error: " + err.message);

  let createTableUser = `CREATE TABLE IF NOT EXISTS User(
    userid int auto_increment primary key,
    nickname varchar(50) not null,
    profileimageurl varchar(500),
    minion int not null default 1,
    notice boolean not null default false,
    accesstoken varchar(500) not null,
    platform varchar(50) not null
  ) DEFAULT CHARACTER SET UTF8;`;

  let createTableUserFCMToken = `CREATE TABLE IF NOT EXISTS UserFCMToken(
        userid int not null,
        fcmtoken varchar(500) not null,
        primary key(userid, fcmtoken),
        foreign key(userid) references User(userid) on update cascade on delete cascade
    ) DEFAULT CHARACTER SET UTF8;`;

  let createTableDiary = `CREATE TABLE IF NOT EXISTS Diary(
        diaryid int auto_increment primary key,
        userid int not null,
        title varchar(100) not null,
        content varchar(500),
        positive double not null default 0.0,
        neutral double not null default 0.0,
        negative double not null default 0.0,
        visibility boolean not null default false,
        diarytime datetime default now(),
        foreign key(userid) references User(userid) on update cascade on delete cascade
    ) DEFAULT CHARACTER SET UTF8;`;

  let createTableFriend = `CREATE TABLE IF NOT EXISTS Friend(
        friendid int not null,
        userid int not null,
        primary key(userid, friendid),
        foreign key(userid) references User(userid) on update cascade on delete cascade
    ) DEFAULT CHARACTER SET UTF8;`;

  let createTableMinion = `CREATE TABLE IF NOT EXISTS Minion(
        minionid int not null,
        userid int not null,
        onlock boolean not null default true,
        exp double not null default 0.0,
        primary key(userid, minionid),
        foreign key(userid) references User(userid) on update cascade on delete cascade
    ) DEFAULT CHARACTER SET UTF8;`;

  let createTableNotification = `CREATE TABLE IF NOT EXISTS Notification(
        noticeid int auto_increment primary key,
        userid int not null,
        type varchar(20) not null,
        friendid int,
        emotion varchar(30),
        normal varchar(50),
        time datetime default now(),
        foreign key(userid) references User(userid) on update cascade on delete cascade
    ) DEFAULT CHARACTER SET UTF8;`;

  db.query(createTableUser, (err, result) => {
    if (err) throw err;
  });
  db.query(createTableUserFCMToken, (err, result) => {
    if (err) throw err;
  });
  db.query(createTableDiary, (err, result) => {
    if (err) throw err;
  });
  db.query(createTableFriend, (err, result) => {
    if (err) throw err;
  });
  db.query(createTableMinion, (err, result) => {
    if (err) throw err;
  });
  db.query(createTableNotification, (err, result) => {
    if (err) throw err;
  });
});

module.exports = db;
