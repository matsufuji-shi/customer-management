const mysql = require("mysql2");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "company"
});

db.connect((err:string) => {
  if (err) {
    console.error('データベース接続エラー:', err);
    process.exit(1);
  } else {
    console.log('データベース接続成功');
  }
});

export default db;
