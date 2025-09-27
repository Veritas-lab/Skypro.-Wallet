import React, { useState } from "react";
import styled from "styled-components";
import NewCosts from "./NewCosts";
import { CATEGORIES } from "../constants/categories";

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

const TableHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 32px 0px 32px;
`;

const Subtitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #000000;

  @media (max-width: 768px) {
    display: none;
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: 86px;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
`;

const FilterLabel = styled.label`
  font-family: Montserrat;
  font-weight: 400;
  font-style: normal;
  font-size: 12px;
  line-height: 150%;
  letter-spacing: 0px;
  text-align: center;
  vertical-align: middle;
  color: #999999;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FilterText = styled.span`
  cursor: default;
`;

const SelectedCategoryText = styled.span`
  font-family: Montserrat;
  font-weight: 600;
  font-size: 12px;
  text-align: center;
  vertical-align: middle;
  color: #1FA46C;
  text-decoration: underline;
  margin-left: 8px;
`;

const CustomSelectArrow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.2s ease;
  margin-left: 8px;
`;

const DropdownList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  margin-top: 8px;
  padding: 8px;
  max-height: 300px;
  overflow-y: auto;
`;

const DropdownCategoryGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const DropdownCategoryButton = styled.label`
  padding: 8px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 30px;
  background-color: ${({ checked }) => (checked ? '#DBFFE9' : '#F4F5F6')};
  text-align: center;
  font-size: 12px;
  font-weight: 400;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${({ checked }) => (checked ? '#1FA46C' : 'black')};
  white-space: nowrap;

  svg {
    fill: ${({ checked }) => (checked ? '#1FA46C' : 'black')};
    width: 14px;
    height: 14px;
  }

  &:hover {
    background-color: ${({ checked }) => (checked ? '#DBFFE9' : '#e8e8e8')};
  }
`;

const SortOptionButton = styled.label`
  padding: 8px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 30px;
  background-color: ${({ checked }) => (checked ? '#DBFFE9' : '#F4F5F6')};
  text-align: center;
  font-size: 12px;
  font-weight: 400;
  cursor: pointer;
  color: ${({ checked }) => (checked ? '#1FA46C' : 'black')};
  white-space: nowrap;

  &:hover {
    background-color: ${({ checked }) => (checked ? '#DBFFE9' : '#e8e8e8')};
  }
`;

const HiddenRadio = styled.input.attrs({ type: 'radio' })`
  display: none;
`;

const DateSelectWrapper = styled.div`
  position: relative;
  display: inline-block;
  min-width: 150px;
`;

const DateSelect = styled.select`
  font-family: Montserrat;
  font-weight: 400;
  font-style: normal;
  font-size: 12px;
  line-height: 150%;
  letter-spacing: 0px;
  color: #000000;
  border: 0.5px solid #999999;
  border-radius: 6px;
  padding: 8px 30px 8px 12px;
  background-color: white;
  cursor: pointer;
  width: 100%;
  appearance: none;

  &:focus {
    outline: none;
    border-color: #7334ea;
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

const IconCell = styled.td`
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

const IconsContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const CostsTable = () => {
  const expenses = [
    {
      description: "Пятерочка",
      category: "Еда",
      date: "03.07.2024",
      amount: "3 500 ₽",
      timestamp: new Date(2024, 6, 3),
      amountValue: 3500
    },
    {
      description: "Яндекс Такси",
      category: "Транспорт",
      date: "03.07.2024",
      amount: "730 ₽",
      timestamp: new Date(2024, 6, 3),
      amountValue: 730
    },
    {
      description: "Аптека Вита",
      category: "Другое",
      date: "03.07.2024",
      amount: "1 200 ₽",
      timestamp: new Date(2024, 6, 3),
      amountValue: 1200
    },
    {
      description: "Бургер Кинг",
      category: "Еда",
      date: "03.07.2024",
      amount: "950 ₽",
      timestamp: new Date(2024, 6, 3),
      amountValue: 950
    },
    {
      description: "Деливери",
      category: "Еда",
      date: "02.07.2024",
      amount: "1 320 ₽",
      timestamp: new Date(2024, 6, 2),
      amountValue: 1320
    },
    {
      description: "Кофейня №1",
      category: "Еда",
      date: "02.07.2024",
      amount: "400 ₽",
      timestamp: new Date(2024, 6, 2),
      amountValue: 400
    },
    {
      description: "Бильярд",
      category: "Развлечения",
      date: "29.06.2024",
      amount: "600 ₽",
      timestamp: new Date(2024, 5, 29),
      amountValue: 600
    },
    {
      description: "Перекресток",
      category: "Еда",
      date: "29.06.2024",
      amount: "2 360 ₽",
      timestamp: new Date(2024, 5, 29),
      amountValue: 2360
    },
    {
      description: "Лукойл",
      category: "Транспорт",
      date: "29.06.2024",
      amount: "1 000 ₽",
      timestamp: new Date(2024, 5, 29),
      amountValue: 1000
    },
    {
      description: "Летуаль",
      category: "Другое",
      date: "29.06.2024",
      amount: "4 300 ₽",
      timestamp: new Date(2024, 5, 29),
      amountValue: 4300
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  // Функция для получения имени категории по ID
  const getCategoryNameById = (id) => {
    const category = CATEGORIES.find((cat) => cat.id === id);
    return category ? category.name : "";
  };

  // Фильтрация расходов по выбранной категории
  const filteredExpenses = selectedCategory
    ? expenses.filter((expense) => expense.category === getCategoryNameById(selectedCategory))
    : expenses;

  // Сортировка расходов
  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (sortBy === "date") {
      return sortOrder === "desc" 
        ? b.timestamp - a.timestamp 
        : a.timestamp - b.timestamp;
    } else if (sortBy === "amount") {
      return sortOrder === "desc" 
        ? b.amountValue - a.amountValue 
        : a.amountValue - b.amountValue;
    }
    return 0;
  });

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setIsCategoryDropdownOpen(false);
  };

  const toggleCategoryDropdown = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  };

  const toggleSortDropdown = () => {
    setIsSortDropdownOpen(!isSortDropdownOpen);
  };

  const handleSortSelect = (sortType) => {
    if (sortBy === sortType) {
      // Если уже сортируем по этому полю, меняем порядок
      setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    } else {
      // Если выбираем новое поле для сортировки, устанавливаем его и порядок по умолчанию
      setSortBy(sortType);
      setSortOrder("desc");
    }
    setIsSortDropdownOpen(false);
  };

  // Получаем текущую выбранную категорию для отображения
  const currentCategory = selectedCategory 
    ? CATEGORIES.find(cat => cat.id === selectedCategory)
    : null;

  // Получаем текст для отображения выбранной сортировки
  const getSortDisplayText = () => {
    if (sortBy === "date") {
      return `дате ${sortOrder === "desc" ? "↓" : "↑"}`;
    } else if (sortBy === "amount") {
      return `сумме ${sortOrder === "desc" ? "↓" : "↑"}`;
    }
    return "дате ↓";
  };

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
        <TableHeaderContainer>
          <Subtitle>Таблица расходов</Subtitle>
          <FiltersContainer>
            <FilterGroup>
              <FilterLabel>
                <FilterText>Фильтровать по категории</FilterText>
                {currentCategory && (
                  <SelectedCategoryText>
                    {currentCategory.name.toLowerCase()}
                  </SelectedCategoryText>
                )}
                <CustomSelectArrow onClick={toggleCategoryDropdown} isOpen={isCategoryDropdownOpen}>
                  <svg
                    width="7"
                    height="6"
                    viewBox="0 0 7 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.5 5.5L0.468911 0.25L6.53109 0.25L3.5 5.5Z"
                      fill="black"
                    />
                  </svg>
                </CustomSelectArrow>
              </FilterLabel>

              {isCategoryDropdownOpen && (
                <DropdownList>
                  <DropdownCategoryGroup>
                    {/* Кнопка для сброса фильтра */}
                    <div key="all">
                      <HiddenRadio
                        id="filter-all"
                        name="category-filter"
                        checked={!selectedCategory}
                        onChange={() => handleCategorySelect(null)}
                      />
                      <DropdownCategoryButton
                        htmlFor="filter-all"
                        checked={!selectedCategory}
                      >
                        Все категории
                      </DropdownCategoryButton>
                    </div>
                    
                    {/* Категории из CATEGORIES */}
                    {CATEGORIES.map((category) => (
                      <div key={category.id}>
                        <HiddenRadio
                          id={`filter-${category.id}`}
                          name="category-filter"
                          checked={selectedCategory === category.id}
                          onChange={() => handleCategorySelect(category.id)}
                        />
                        <DropdownCategoryButton
                          htmlFor={`filter-${category.id}`}
                          checked={selectedCategory === category.id}
                        >
                          {category.icon && <category.icon />}
                          {category.name}
                        </DropdownCategoryButton>
                      </div>
                    ))}
                  </DropdownCategoryGroup>
                </DropdownList>
              )}
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>
                <FilterText>Сортировать по</FilterText>
                <SelectedCategoryText>
                  {getSortDisplayText()}
                </SelectedCategoryText>
                <CustomSelectArrow onClick={toggleSortDropdown} isOpen={isSortDropdownOpen}>
                  <svg
                    width="7"
                    height="6"
                    viewBox="0 0 7 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.5 5.5L0.468911 0.25L6.53109 0.25L3.5 5.5Z"
                      fill="black"
                    />
                  </svg>
                </CustomSelectArrow>
              </FilterLabel>

              {isSortDropdownOpen && (
                <DropdownList>
                  <DropdownCategoryGroup>
                    <div>
                      <HiddenRadio
                        id="sort-date"
                        name="sort-by"
                        checked={sortBy === "date"}
                        onChange={() => handleSortSelect("date")}
                      />
                      <SortOptionButton
                        htmlFor="sort-date"
                        checked={sortBy === "date"}
                      >
                        Дате {sortBy === "date" && (sortOrder === "desc" ? "↓" : "↑")}
                      </SortOptionButton>
                    </div>
                    <div>
                      <HiddenRadio
                        id="sort-amount"
                        name="sort-by"
                        checked={sortBy === "amount"}
                        onChange={() => handleSortSelect("amount")}
                      />
                      <SortOptionButton
                        htmlFor="sort-amount"
                        checked={sortBy === "amount"}
                      >
                        Сумме {sortBy === "amount" && (sortOrder === "desc" ? "↓" : "↑")}
                      </SortOptionButton>
                    </div>
                  </DropdownCategoryGroup>
                </DropdownList>
              )}
            </FilterGroup>
          </FiltersContainer>
        </TableHeaderContainer>
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
              {sortedExpenses.map((expense, index) => (
                <TableRow key={index}>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>{expense.amount}</TableCell>
                  <IconCell>
                    <IconsContainer>
                      <svg
                        width="12"
                        height="13"
                        viewBox="0 0 12 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.5 11.5H1.5C1.295 11.5 1.125 11.33 1.125 11.125C1.125 10.92 1.295 10.75 1.5 10.75H10.5C10.705 10.75 10.875 10.92 10.875 11.125C10.875 11.33 10.705 11.5 10.5 11.5Z"
                          fill="#999999"
                        />
                        <path
                          d="M9.51004 2.24002C8.54004 1.27002 7.59004 1.24502 6.59504 2.24002L5.99004 2.84502C5.94004 2.89502 5.92004 2.97502 5.94004 3.04502C6.32004 4.37002 7.38004 5.43002 8.70504 5.81002C8.72504 5.81502 8.74504 5.82002 8.76504 5.82002C8.82004 5.82002 8.87004 5.80002 8.91004 5.76002L9.51004 5.15502C10.005 4.66502 10.245 4.19002 10.245 3.71002C10.25 3.21502 10.01 2.73502 9.51004 2.24002Z"
                          fill="#999999"
                        />
                        <path
                          d="M7.80491 6.26502C7.65991 6.19502 7.51992 6.12502 7.38492 6.04502C7.27492 5.98002 7.16992 5.91002 7.06492 5.83502C6.97992 5.78002 6.87991 5.70002 6.78491 5.62002C6.77491 5.61502 6.73991 5.58502 6.69991 5.54502C6.53491 5.40502 6.34992 5.22502 6.18492 5.02502C6.16992 5.01502 6.14492 4.98002 6.10992 4.93502C6.05992 4.87502 5.97492 4.77502 5.89992 4.66002C5.83992 4.58502 5.76992 4.47502 5.70492 4.36502C5.62492 4.23002 5.55492 4.09502 5.48492 3.95502C5.39314 3.75835 5.13501 3.69993 4.98155 3.85339L2.16992 6.66502C2.10492 6.73002 2.04492 6.85502 2.02992 6.94002L1.75992 8.85502C1.70992 9.19502 1.80492 9.51502 2.01492 9.73002C2.19492 9.90502 2.44492 10 2.71492 10C2.77492 10 2.83492 9.99502 2.89492 9.98502L4.81492 9.71502C4.90492 9.70002 5.02992 9.64002 5.08992 9.57502L7.90618 6.75875C8.05658 6.60836 8.00007 6.34959 7.80491 6.26502Z"
                          fill="#999999"
                        />
                      </svg>
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
                    </IconsContainer>
                  </IconCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableWrapper>
        <NewCosts />
      </Container>
    </PageContainer>
  );
};

export default CostsTable;