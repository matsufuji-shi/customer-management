import express from "express";
import cors from "cors";
import db from "./config/db";
import customersRouter from "./routes/customerRoutes";

const app = express();

// ミドルウェア設定
app.use(express.json());
app.use(cors());

// タスク管理用のAPIルートを追加
app.use("/api/customers", customersRouter);

// データベース接続
db.getConnection((err:string, connection:any) => {
    if (err) {
        console.error("データベース接続エラー:", err);
        process.exit(1); // 接続失敗時にサーバを終了
    } else {
        console.log("データベース接続成功");
        connection.release(); // 接続が成功したらリリース
    }
});

// サーバーの起動
app.listen(3001, () => {
    console.log('Server running on port 3001');
});

export default app;