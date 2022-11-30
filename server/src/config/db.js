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
    userId int auto_increment primary key,
    nickName varchar(50) not null,
    profileImageurl varchar(500),
    minion int not null default 1,
    notice boolean not null default false,
    accessToken varchar(500) not null,
    platform varchar(50) not null,
    createdAt datetime default now()
  ) DEFAULT CHARACTER SET UTF8;`;

  let createTableUserFCMToken = `CREATE TABLE IF NOT EXISTS UserFCMToken(
        userId int not null,
        fcmToken varchar(500) not null,
        primary key(userId, fcmToken),
        foreign key(userId) references User(userId) on update cascade on delete cascade
    ) DEFAULT CHARACTER SET UTF8;`;

  let createTableDiary = `CREATE TABLE IF NOT EXISTS Diary(
        diaryId int auto_increment primary key,
        userId int not null,
        title varchar(100) not null,
        content varchar(500),
        positive double not null default 0.0,
        neutral double not null default 0.0,
        negative double not null default 0.0,
        visibility boolean not null default false,
        diaryTime datetime default now(),
        foreign key(userId) references User(userId) on update cascade on delete cascade
    ) DEFAULT CHARACTER SET UTF8;`;

  let createTableFriend = `CREATE TABLE IF NOT EXISTS Friend(
        friendId int not null,
        userId int not null,
        primary key(userId, friendId),
        foreign key(userId) references User(userId) on update cascade on delete cascade
    ) DEFAULT CHARACTER SET UTF8;`;

  let createTableMinion = `CREATE TABLE IF NOT EXISTS Minion(
        minionId int not null,
        userId int not null,
        onLock boolean not null default true,
        exp double not null default 0.0,
        primary key(userId, minionId),
        foreign key(userId) references User(userId) on update cascade on delete cascade
    ) DEFAULT CHARACTER SET UTF8;`;

  let createTableNotification = `CREATE TABLE IF NOT EXISTS Notification(
        noticeId int auto_increment primary key,
        userId int not null,
        type varchar(20) not null,
        friendId int,
        emotion varchar(30),
        normal varchar(50),
        noticeTime datetime default now(),
        foreign key(userId) references User(userId) on update cascade on delete cascade
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
