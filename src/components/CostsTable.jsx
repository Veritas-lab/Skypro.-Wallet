import React from "react";
import styled from "styled-components";

const PageContainer = styled.div`
  padding-left: calc(50% - 600px);
  padding-right: calc(50% - 600px);

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 30px;
    margin: 22px 16px 22px 0px;
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #000000;
  margin: 32px 120px 36px 0px;

  @media (max-width: 768px) {
    font-size: 24px;
    white-space: nowrap;
    margin: 22px 16px 22px 0px;
  }
`;

const NewExpenseButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    color: #000000;
    background-color: transparent;
    border-radius: none;
    border: none;
    padding: 14px 20px;
    font-weight: 600;
    font-size: 12px;
  }
`;

const ButtonIcon = styled.div`
  display: flex;
  margin-right: 8px;
`;

const Container = styled.div`
  background-color: #ffffff;
  box-shadow: 0px 20px 67px -12px #00000021;
  border-radius: 30px;
  width: 789px;
  margin: 32px 120px 36px 0px;

  @media (max-width: 768px) {
    border-radius: 20px;
    width: 100%;
    margin: 0;
  }
`;

const Subtitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #000000;
  padding: 32px 32px 0px 32px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const TableWrapper = styled.div`
  max-height: 500px;
  overflow-y: auto;
  position: relative;
  padding: 18px 32px 32px 32px;

  &::-webkit-scrollbar {
    width: 6px;
    height: 100px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 30px;
    margin: 10px 0;
  }

  &::-webkit-scrollbar-thumb {
    background: #d9d9d9;
    border-radius: 30px;
    opacity: 1;
    min-height: 100px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #b8b8b8;
  }

  &::after {
    content: "";
    position: absolute;
    top: 197px;
    right: 32px;
    width: 6px;
    height: 100px;
    border-radius: 30px;
    opacity: 0.3;
    pointer-events: none;
    z-index: 2;
  }

  scrollbar-width: thin;
  scrollbar-color: #d9d9d9 transparent;

  @media (max-width: 768px) {
    max-width: 100%;
    max-height: 650px;
    padding: 16px;
  }
`;

const Table = styled.table`
  width: 789px;
  border-collapse: collapse;
  height: 618px;
  border-spacing: 0 14px;
  padding: 32px;

  @media (max-width: 768px) {
    width: 348px;
    border-collapse: collapse;
    height: 618px;
    border-spacing: 0 16px;
    padding: 0;
  }
`;

const TableHead = styled.thead`
  font-size: 12px;
  position: sticky;
  font-weight: 400;
  top: 0;
  z-index: 100;
  border-bottom: 0.5px solid #999999;

  th {
    color: #999999 !important;
    position: sticky;
    z-index: 101;
    background: transparent !important;
    font-size: 12px;
    font-weight: 400;

    @media (max-width: 768px) {
      font-size: 10px;
    }
  }
`;

const TableRow = styled.tr``;

const TableHeader = styled.th`
  text-align: left;
  padding: 12px 16px;
  font-size: 12px;
  font-weight: 400;
  color: #000000;

  @media (max-width: 768px) {
    padding: 8px 10px;
    font-size: 10px;
    white-space: nowrap;
  }
`;

const TableCell = styled.td`
  text-align: left;
  padding: 12px 16px;
  font-size: 12px;
  font-weight: 400;
  color: #000000;

  @media (max-width: 768px) {
    padding: 8px 10px;
    font-size: 10px;
    white-space: nowrap;
  }

  svg {
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const MobileAddButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: inline;
    width: 343px;
    height: 38px;
    padding: 12px 120px;
    border-radius: 6px;
    background-color: #7334ea;
    color: white;
    font-size: 12px;
    border: none;
    margin-top: 16px;
  }
`;

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
    <PageContainer>
      <Header>
        <Title>Мои расходы</Title>
        <NewExpenseButton>
          <ButtonIcon>
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
          </ButtonIcon>
          Новый расход
        </NewExpenseButton>
      </Header>
      <Container>
        <div>
          <Subtitle>Таблица расходов</Subtitle>
        </div>
        <TableWrapper>
          <Table>
            <TableHead>
              <tr>
                <TableHeader>Описание</TableHeader>
                <TableHeader>Категория</TableHeader>
                <TableHeader>Дата</TableHeader>
                <TableHeader>Сумма</TableHeader>
                <TableHeader></TableHeader>
              </tr>
            </TableHead>
            <tbody>
              {expenses.map((expense, index) => (
                <TableRow key={index}>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>{expense.amount}</TableCell>
                  <TableCell>
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
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
          <MobileAddButton>Удалить расход</MobileAddButton>
        </TableWrapper>
      </Container>
    </PageContainer>
  );
};

export default CostsTable;
