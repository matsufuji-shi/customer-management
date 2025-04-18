import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLists } from "../pages/CustomerListPage";
import SearchBar from "./SearchBar";
import { Customer } from "../types/customer";

function CustomerList() {
  const [customer, setCustomer] = useState<Customer[]>([]);         // 全データ
  const [filterCustomer, setFilterCustomer] = useState<Customer[]>([]); // 表示用データ
  const navigate = useNavigate();

  const listHeader = ["顧客名", "メールアドレス", "電話番号", "会社名", "詳細"];

  // 顧客データ取得
  const fetchLists = async () => {
    try {
      const data = await getLists();
      setCustomer(data);
      setFilterCustomer(data);
    } catch (error) {
      console.error("Failed to fetch customer", error);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  // 検索処理
  const searchToData = (keyword: string) => {
    const lowerKeyword = keyword.toLowerCase();
    if (!keyword) {
      setFilterCustomer(customer);
    } else {
      const filtered = customer.filter((c) =>
        c.name.toLowerCase().includes(lowerKeyword)
      );
      setFilterCustomer(filtered);
    }
  };

  const goToGetCustomers = (id: number) => {
    navigate(`/detail/${id}`);
  };

  return (
    <div>
      <h1>顧客一覧</h1>
      <SearchBar searchToData={searchToData} />

      <table>
        <thead>
          <tr>
            {listHeader.map((header, i) => (
              <th key={i}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filterCustomer.map((data) => (
            <tr key={data.id}>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.phone}</td>
              <td>{data.company_name}</td>
              <td>
                <button
                  onClick={() => goToGetCustomers(data.id)}
                  className="listButton"
                >
                  詳細
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerList;