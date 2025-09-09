import { useState } from "react";
import styled from "styled-components";
import Input from "./components/base/Input";
import Button from "./components/base/Button";
import Label from "./components/base/Label";
import FormGroup from "./components/common/FormGroup";
import CategorySelector from "./components/common/CategorySelector";

const CostsTable = () => {
  const expenses = [
    {
      description: "Пятерочка",
      category: "Еда",
      date: "03.07.2024",
      amount: "3 500 ₽",
    },
    {
      description: "Яндекс Такси",
      category: "Транспорт",
      date: "03.07.2024",
      amount: "730 ₽",
    },
    {
      description: "Аптека Вита",
      category: "Другое",
      date: "03.07.2024",
      amount: "1 200 ₽",
    },
    {
      description: "Бургер Кинг",
      category: "Еда",
      date: "03.07.2024",
      amount: "950 ₽",
    },
    {
      description: "Деливери",
      category: "Еда",
      date: "02.07.2024",
      amount: "1 320 ₽",
    },
    {
      description: "Кофейня №1",
      category: "Еда",
      date: "02.07.2024",
      amount: "400 ₽",
    },
    {
      description: "Бильярд",
      category: "Развлечения",
      date: "29.06.2024",
      amount: "600 ₽",
    },
    {
      description: "Перекресток",
      category: "Еда",
      date: "29.06.2024",
      amount: "2 360 ₽",
    },
    {
      description: "Лукойл",
      category: "Транспорт",
      date: "29.06.2024",
      amount: "1 000 ₽",
    },
    {
      description: "Летуаль",
      category: "Другое",
      date: "29.06.2024",
      amount: "4 300 ₽",
    },
    {
      description: "Яндекс Такси",
      category: "Транспорт",
      date: "28.06.2024",
      amount: "320 ₽",
    },
    {
      description: "Перекресток",
      category: "Еда",
      date: "28.06.2024",
      amount: "1 360 ₽",
    },
    {
      description: "Деливери",
      category: "Еда",
      date: "28.06.2024",
      amount: "2 320 ₽",
    },
    {
      description: "Вкусвилл",
      category: "Еда",
      date: "27.06.2024",
      amount: "1 220 ₽",
    },
    {
      description: "Кофейня №1",
      category: "Еда",
      date: "27.06.2024",
      amount: "920 ₽",
    },
    {
      description: "Вкусвилл",
      category: "Еда",
      date: "26.06.2024",
      amount: "840 ₽",
    },
    {
      description: "Кофейня №1",
      category: "Еда",
      date: "26.06.2024",
      amount: "920 ₽",
    },
  ];

  return (
    <div className="center">
      <header>
        <h1>Мои расходы</h1>
        <button className="new-expense-btn">
          <div className="btn-icon">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.99984 0.166626C2.78567 0.166626 0.166504 2.78579 0.166504 5.99996C0.166504 9.21413 2.78567 11.8333 5.99984 11.8333C9.214 11.8333 11.8332 9.21413 11.8332 5.99996C11.8332 2.78579 9.214 0.166626 5.99984 0.166626ZM8.33317 6.43746H6.43734V8.33329C6.43734 8.57246 6.239 8.77079 5.99984 8.77079C5.76067 8.77079 5.56234 8.57246 5.56234 8.33329V6.43746H3.6665C3.42734 6.43746 3.229 6.23913 3.229 5.99996C3.229 5.76079 3.42734 5.56246 3.6665 5.56246H5.56234V3.66663C5.56234 3.42746 5.76067 3.22913 5.99984 3.22913C6.239 3.22913 6.43734 3.42746 6.43734 3.66663V5.56246H8.33317C8.57234 5.56246 8.77067 5.76079 8.77067 5.99996C8.77067 6.23913 8.57234 6.43746 8.33317 6.43746Z"
                fill="black"
              />
            </svg>
          </div>
          Новый расход
        </button>
      </header>
      <div className="container">
        <div>
          <h2>Таблица расходов</h2>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Описание</th>
                <th>Категория</th>
                <th>Дата</th>
                <th>Сумма</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense, index) => (
                <tr key={index}>
                  <td>{expense.description}</td>
                  <td>{expense.category}</td>
                  <td>{expense.date}</td>
                  <td>{expense.amount}</td>
                  <td>
                    <svg
                      width="12"
                      height="13"
                      viewBox="0 0 12 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.62 3.29003H9.42L7.73 1.60003C7.595 1.46503 7.375 1.46503 7.235 1.60003C7.1 1.73503 7.1 1.95503 7.235 2.09503L8.43 3.29003H3.57L4.765 2.09503C4.9 1.96003 4.9 1.74003 4.765 1.60003C4.63 1.46503 4.41 1.46503 4.27 1.60003L2.585 3.29003H2.385C1.935 3.29003 1 3.29003 1 4.57003C1 5.05503 1.1 5.37503 1.31 5.58503C1.43 5.71003 1.575 5.77503 1.73 5.81003C1.875 5.84503 2.03 5.85003 2.18 5.85003H9.82C9.975 5.85003 10.12 5.84003 10.26 5.81003C10.68 5.71003 11 5.41003 11 4.57003C11 3.29003 10.065 3.29003 9.62 3.29003Z"
                        fill="#999999"
                      />
                      <path
                        d="M9.52502 6.5H2.43502C2.12502 6.5 1.89002 6.775 1.94002 7.08L2.36002 9.65C2.50002 10.51 2.87502 11.5 4.54002 11.5H7.34502C9.03002 11.5 9.33002 10.655 9.51002 9.71L10.015 7.095C10.075 6.785 9.84002 6.5 9.52502 6.5ZM5.30502 9.725C5.30502 9.92 5.15002 10.075 4.96002 10.075C4.76502 10.075 4.61002 9.92 4.61002 9.725V8.075C4.61002 7.885 4.76502 7.725 4.96002 7.725C5.15002 7.725 5.30502 7.885 5.30502 8.075V9.725ZM7.44502 9.725C7.44502 9.92 7.29002 10.075 7.09502 10.075C6.90502 10.075 6.74502 9.92 6.74502 9.725V8.075C6.74502 7.885 6.90502 7.725 7.09502 7.725C7.29002 7.725 7.44502 7.885 7.44502 8.075V9.725Z"
                        fill="#999999"
                      />
                    </svg>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="mobile-add-button">Удалить расход</button>
        </div>
      </div>
    </div>
  );
};

export default CostsTable;
