import express, { Request, Response } from 'express';
import db from '../config/db';
import { Customer,Items } from "../types/customer";

const router = express.Router();

// 顧客一覧を取得 (GET /customers)
router.get('/', (req: Request, res: Response) => {
  const sql = 'SELECT * FROM customers';
  db.query(sql, (err:string, result:Customer[]) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'タスクの取得に失敗しました', error: err });
    }
    res.json(result);
  });
});

// // 特定の顧客を取得 (GET /customers/:id)
// router.get('/:id', (req: Request, res: Response) => {
//   const { id } = req.params;
//   const sql = 'SELECT * FROM customers WHERE id = ?';
//   db.query(sql, [id], (err:string, result:Customer[]) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ message: 'タスクの取得に失敗しました', error: err });
//     }
//     if (result.length === 0) {
//       return res.status(404).json({ message: '顧客が見つかりません' });
//     }
//     res.json(result[0]);
//   });
// });

// // 新しい顧客を追加 (POST /customers)
// router.post('/', (req: Request, res: Response) => {
//   const { name, email, phone, address, company_name } = req.body;

//   if (!name || !email || !phone || !address || !company_name) {
//     return res.status(400).json({ message: '全ての必須項目を入力してください。' });
//   }

//   const created_at = new Date();
//   const updated_at = new Date();

//   const sql = `
//     INSERT INTO customers (name, email, phone, address, company_name, created_at, updated_at)
//     VALUES (?, ?, ?, ?, ?, ?, ?)
//   `;
//   db.query(sql, [name, email, phone, address, company_name, created_at, updated_at], (err, result) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ message: '顧客の追加に失敗しました', error: err });
//     }

//     const insertedCustomer = {
//       id: result.insertId,
//       name,
//       email,
//       phone,
//       address,
//       company_name,
//       created_at,
//       updated_at,
//     };

//     res.status(201).json(insertedCustomer);
//   });
// });

// // 特定の顧客を更新 (PUT /customers/:id)
// router.put('/:id', (req: Request, res: Response) => {
//   const { name, email, phone, address, company_name } = req.body;
//   const { id } = req.params;

//   if (!name || !email || !phone || !address || !company_name) {
//     return res.status(400).json({ message: '名前・メールアドレス・電話番号・住所・会社名の入力が必要です' });
//   }

//   const getSql = 'SELECT created_at FROM customers WHERE id = ?';
//   db.query(getSql, [id], (err, results) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ message: 'データ取得に失敗しました', error: err });
//     }

//     if (results.length === 0) {
//       return res.status(404).json({ message: '指定された顧客が見つかりません' });
//     }

//     const created_at = results[0].created_at;
//     const updated_at = new Date();

//     const updateSql = `
//       UPDATE customers
//       SET name = ?, email = ?, phone = ?, address = ?, company_name = ?, created_at = ?, updated_at = ?
//       WHERE id = ?
//     `;
//     db.query(updateSql, [name, email, phone, address, company_name, created_at, updated_at, id], (err, result) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ message: '顧客の更新に失敗しました', error: err });
//       }
//       res.status(200).json({ message: '顧客情報を更新しました' });
//     });
//   });
// });

// // 特定の顧客を削除 (DELETE /customers/:id)
// router.delete('/:id', (req: Request, res: Response) => {
//   const { id } = req.params;
//   const sql = 'DELETE FROM customers WHERE id = ?';

//   db.query(sql, [id], (err, result) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ message: '顧客の削除に失敗しました', error: err });
//     }
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: '顧客が見つかりません' });
//     }
//     res.status(200).json({ message: '顧客を削除しました' });
//   });
// });

export default router;