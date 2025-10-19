import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import NewCosts from "./NewCosts";
import { TransactionContext } from "../context/TransactionContext";
import { AuthContext } from "../context/AuthContext";
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
  margin: 32px 120px 0px 0px;

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
    cursor: pointer;
  }
`;

const ButtonIcon = styled.div`
  display: flex;
  margin-right: 8px;
`;

const BackToExpensesButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    gap: 8px;
    color: #999999;
    background-color: transparent;
    border: none;
    padding: 8px 0;
    font-weight: 700;
    font-size: 12px;
    cursor: pointer;
    white-space: nowrap;
  }
`;

const BackButtonIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const HeaderTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;

  @media (max-width: 768px) {
    flex: 1;
    justify-content: center;
  }
`;

const MobileHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const MainContainer = styled.div`
  display: flex;
  gap: 34px;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const TableContainer = styled.div`
  background-color: #ffffff;
  box-shadow: 0px 20px 67px -12px #00000021;
  border-radius: 30px;
  width: 789px;
  min-height: 618px;
  margin: 32px 0px 36px 0px;

  @media (max-width: 768px) {
    border-radius: 20px;
    width: 100%;
    height: auto;
    margin: 0;
    order: 2;
    display: ${({ show }) => (show ? "block" : "none")};
    position: relative;
  }
`;

const FormContainerWrapper = styled.div`
  flex: 1;
  min-width: 300px;
  margin-top: 32px;

  @media (max-width: 768px) {
    margin-top: 0;
    width: 100%;
    order: 1;
    display: ${({ show }) => (show ? "block" : "none")};
  }
`;

const TableHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 32px 0px 32px;

  @media (max-width: 768px) {
    padding: 16px 16px 0px 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const Subtitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #000000;
  margin: 0px;
  padding: 0px;
  width: 238px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const DesktopHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileHeaderContainer = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    width: 100%;
    justify-content: space-between;
    gap: 16px;
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
  padding-top: 10px;

  @media (max-width: 768px) {
    display: flex;
    width: 100%;
    justify-content: space-between;
    gap: 16px;
    padding-top: 0;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;

  @media (max-width: 768px) {
    flex: 1;
  }
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
  color: #000000;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 6px;

  @media (max-width: 768px) {
    font-size: 11px;
    justify-content: center;
  }
`;

const FilterText = styled.span`
  cursor: default;

  @media (max-width: 768px) {
    display: none;
  }
`;

const SelectedCategoryText = styled.span`
  font-family: Montserrat;
  font-weight: 600;
  font-size: 12px;
  text-align: center;
  vertical-align: middle;
  color: #1fa46c;
  text-decoration: underline;
  margin-left: 8px;

  @media (max-width: 768px) {
    font-size: 11px;
    margin-left: 0;
  }
`;

const CustomSelectArrow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.2s ease;
  margin-left: 8px;

  @media (max-width: 768px) {
    margin-left: 4px;
  }
`;

const DropdownList = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  margin-top: 6px;
  padding: 12px;
  max-height: 300px;
  overflow-y: auto;

  @media (max-width: 768px) {
    right: auto;
    left: 0;
    width: 200px;
  }
`;

const DropdownCategoryGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SortDropdownGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;

  @media (max-width: 768px) {
    gap: 12px;
  }
`;

const DropdownCategoryButton = styled.label`
  padding: 8px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 30px;
  background-color: ${({ checked }) => (checked ? "#DBFFE9" : "#F4F5F6")};
  text-align: center;
  font-size: 12px;
  font-weight: 400;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${({ checked }) => (checked ? "#1FA46C" : "black")};
  white-space: nowrap;

  &:hover {
    background-color: ${({ checked }) => (checked ? "#DBFFE9" : "#e8e8e8")};
  }

  @media (max-width: 768px) {
    font-size: 11px;
    padding: 6px 12px;
  }
`;

const SortOptionButton = styled.label`
  padding: 8px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 30px;
  background-color: ${({ checked }) => (checked ? "#DBFFE9" : "#F4F5F6")};
  text-align: center;
  font-size: 12px;
  font-weight: 400;
  cursor: pointer;
  color: ${({ checked }) => (checked ? "#1FA46C" : "black")};
  white-space: nowrap;

  &:hover {
    background-color: ${({ checked }) => (checked ? "#DBFFE9" : "#e8e8e8")};
  }

  @media (max-width: 768px) {
    font-size: 11px;
    padding: 6px 12px;
  }
`;

const HiddenRadio = styled.input.attrs({ type: "radio" })`
  display: none;
`;

const TableWrapper = styled.div`
  max-height: 500px;
  overflow-y: auto;
  position: relative;
  padding: 18px 32px 32px 32px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 30px;
    margin: 10px 0;
  }

  &::-webkit-scrollbar-thumb {
    background: #d9d9d9;
    border-radius: 30px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #b8b8b8;
  }

  scrollbar-width: thin;
  scrollbar-color: #d9d9d9 transparent;

  @media (max-width: 768px) {
    max-height: calc(100vh - 300px);
    padding: 16px;
    overflow-x: auto;
    height: auto;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0 16px;

  @media (max-width: 768px) {
    min-width: 311px;
    border-spacing: 0 16px;
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
    color: #999999;
    position: sticky;
    z-index: 101;
    background: white;
    font-size: 12px;
    font-weight: 400;
    padding: 12px 16px;

    @media (max-width: 768px) {
      font-size: 10px;
      padding: 8px 16px;
      white-space: nowrap;
      height: 12px;
    }
  }
`;

const TableRow = styled.tr`
  @media (max-width: 768px) {
    border-bottom: 1px solid #f0f0f0;
    height: auto;
  }
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 12px 16px;
  font-size: 12px;
  font-weight: 400;

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 10px;
    height: 12px;
  }

  &:last-child {
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const TableCell = styled.td`
  text-align: left;
  padding: 12px 16px;
  font-size: 12px;
  font-weight: 400;
  color: #000000;

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 10px;
    white-space: nowrap;
    height: auto;
    line-height: 1.2;
  }

  &:last-child {
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

  @media (max-width: 768px) {
    display: none;
  }
`;

const IconsContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileActionsContainer = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px;
    border-top: 1px solid #f0f0f0;
    margin-top: 0;
    position: sticky;
    bottom: 0;
    background: white;
    z-index: 10;
  }
`;

const MobileActionButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 16px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background-color: ${({ variant }) =>
      variant === "delete" ? "#FFE6E6" : "#F4F5F6"};
    color: ${({ variant }) => (variant === "delete" ? "#FF4444" : "#000000")};
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background-color: ${({ variant }) =>
        variant === "delete" ? "#FFD1D1" : "#e8e8e8"};
    }

    &:active {
      transform: scale(0.98);
    }
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 16px;
  color: #666;

  @media (max-width: 768px) {
    padding: 20px;
    font-size: 14px;
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 16px;
  color: #ff4444;
  background-color: #ffe6e6;
  border-radius: 8px;
  margin: 20px;

  @media (max-width: 768px) {
    padding: 20px;
    font-size: 14px;
    margin: 16px;
  }
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 16px;
  color: #666;

  @media (max-width: 768px) {
    padding: 20px;
    font-size: 14px;
  }
`;

const MobileFilterText = styled.span`
  display: none;

  @media (max-width: 768px) {
    display: inline;
    font-size: 11px;
    color: #000;
  }
`;

const CostsTable = () => {
  const { transactions, loading, error, loadTransactions, removeTransaction } =
    useContext(TransactionContext);
  const { isAuth } = useContext(AuthContext);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showMobileForm, setShowMobileForm] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [mobileTitle, setMobileTitle] = useState("Мои расходы");

  useEffect(() => {
    if (isAuth) {
      loadTransactions();
    }
  }, [isAuth, loadTransactions]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);

      // При переходе с мобильной на десктопную версию, сбрасываем состояние формы
      if (!mobile && showMobileForm) {
        setShowMobileForm(false);
        setEditingTransaction(null);
        setMobileTitle("Мои расходы");
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [showMobileForm]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("ru-RU").format(amount) + " ₽";
  };

  const getCategoryNameByKey = (categoryKey) => {
    const category = CATEGORIES.find((cat) => cat.apiKey === categoryKey);
    return category ? category.name : "Другое";
  };

  const getCategoryKeyById = (categoryId) => {
    const category = CATEGORIES.find((cat) => cat.id === categoryId);
    return category ? category.apiKey : "others";
  };

  const filteredTransactions = selectedCategory
    ? transactions.filter(
        (transaction) =>
          transaction.category === getCategoryKeyById(selectedCategory)
      )
    : transactions;

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortBy === "date") {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    } else if (sortBy === "amount") {
      return sortOrder === "desc" ? b.sum - a.sum : a.sum - b.sum;
    }
    return 0;
  });

  const applyFiltersAndSort = () => {
    const filterValue = selectedCategory
      ? getCategoryKeyById(selectedCategory)
      : null;
    const sortValue = sortBy === "amount" ? "sum" : sortBy;
    loadTransactions(sortValue, filterValue);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setIsCategoryDropdownOpen(false);
    applyFiltersAndSort();
  };

  const toggleCategoryDropdown = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
    if (isSortDropdownOpen) setIsSortDropdownOpen(false);
  };

  const toggleSortDropdown = () => {
    setIsSortDropdownOpen(!isSortDropdownOpen);
    if (isCategoryDropdownOpen) setIsCategoryDropdownOpen(false);
  };

  const handleSortSelect = (sortType) => {
    const newSortBy = sortType;
    const newSortOrder =
      sortBy === sortType ? (sortOrder === "desc" ? "asc" : "desc") : "desc";

    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setIsSortDropdownOpen(false);
    applyFiltersAndSort();
  };

  const handleNewExpenseClick = () => {
    setEditingTransaction(null);
    setShowMobileForm(true);
    setSelectedTransaction(null);
    setMobileTitle(""); // Убираем заголовок "Новый расход"
  };

  const handleEdit = (transaction) => {
    if (isMobile) {
      setEditingTransaction(transaction);
      setShowMobileForm(true);
      setSelectedTransaction(null);
      setMobileTitle(""); // Убираем заголовок "Редактирование расхода"
    } else {
      setEditingTransaction(transaction);
      setSelectedTransaction(null);
    }
  };

  const handleEditMobile = (transaction) => {
    setEditingTransaction(transaction);
    setShowMobileForm(true);
    setSelectedTransaction(null);
    setMobileTitle(""); // Убираем заголовок "Редактирование расхода"
  };

  const handleDelete = async (transactionId) => {
    if (window.confirm("Вы уверены, что хотите удалить эту транзакцию?")) {
      const success = await removeTransaction(transactionId);
      if (success) {
        applyFiltersAndSort();
        setSelectedTransaction(null);
      }
    }
  };

  const handleMobileFormClose = () => {
    setShowMobileForm(false);
    setEditingTransaction(null);
    setMobileTitle("Мои расходы");
  };

  const handleBackToExpenses = () => {
    setShowMobileForm(false);
    setEditingTransaction(null);
    setMobileTitle("Мои расходы");
  };

  const handleTransactionCreated = () => {
    applyFiltersAndSort();
    if (isMobile) {
      setShowMobileForm(false);
      setMobileTitle("Мои расходы");
    }
  };

  const handleTransactionUpdated = () => {
    setEditingTransaction(null);
    applyFiltersAndSort();
    if (isMobile) {
      setShowMobileForm(false);
      setMobileTitle("Мои расходы");
    }
  };

  const handleRowClick = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const currentCategory = selectedCategory
    ? CATEGORIES.find((cat) => cat.id === selectedCategory)
    : null;

  const getSortDisplayText = () => {
    if (sortBy === "date") {
      return `дате ${sortOrder === "desc" ? "↓" : "↑"}`;
    } else if (sortBy === "amount") {
      return `сумме ${sortOrder === "desc" ? "↓" : "↑"}`;
    }
    return "дате ↓";
  };

  const getMobileCategoryText = () => {
    return currentCategory ? currentCategory.name : "Все категории";
  };

  const showTable = !isMobile || !showMobileForm;
  const showForm = !isMobile || showMobileForm;

  if (loading && transactions.length === 0) {
    return <LoadingMessage>Загрузка транзакций...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>Ошибка: {error}</ErrorMessage>;
  }

  return (
    <PageContainer>
      <Header>
        <HeaderContent>
          <MobileHeaderWrapper>
            <HeaderTitleContainer>
              <Title>{isMobile ? mobileTitle : "Мои расходы"}</Title>

              {/* Кнопка возврата к расходам (видна только на мобильных при открытой форме) */}
              {isMobile && showMobileForm && (
                <BackToExpensesButton onClick={handleBackToExpenses}>
                  <BackButtonIcon>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.44413 1.16675H4.55579C2.43246 1.16675 1.16663 2.43258 1.16663 4.55591V9.43841C1.16663 11.5676 2.43246 12.8334 4.55579 12.8334H9.43829C11.5616 12.8334 12.8275 11.5676 12.8275 9.44425V4.55591C12.8333 2.43258 11.5675 1.16675 9.44413 1.16675ZM10.5 7.43758H4.55579L6.31163 9.19341C6.48079 9.36258 6.48079 9.64258 6.31163 9.81175C6.22413 9.89925 6.11329 9.94008 6.00246 9.94008C5.89163 9.94008 5.78079 9.89925 5.69329 9.81175L3.19079 7.30925C3.10913 7.22758 3.06246 7.11675 3.06246 7.00008C3.06246 6.88341 3.10913 6.77258 3.19079 6.69091L5.69329 4.18841C5.86246 4.01925 6.14246 4.01925 6.31163 4.18841C6.48079 4.35758 6.48079 4.63758 6.31163 4.80675L4.55579 6.56258H10.5C10.7391 6.56258 10.9375 6.76091 10.9375 7.00008C10.9375 7.23925 10.7391 7.43758 10.5 7.43758Z"
                        fill="#999999"
                      />
                    </svg>
                  </BackButtonIcon>
                  Мои расходы
                </BackToExpensesButton>
              )}
            </HeaderTitleContainer>
          </MobileHeaderWrapper>

          {/* Кнопка нового расхода (видна только на мобильных при закрытой форме) */}
          {isMobile && !showMobileForm && (
            <NewExpenseButton onClick={handleNewExpenseClick}>
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
          )}
        </HeaderContent>
      </Header>

      <MainContainer>
        <TableContainer show={showTable}>
          <TableHeaderContainer>
            {/* Десктопная версия - заголовок и фильтры в одной строке */}
            <DesktopHeaderContainer>
              <Subtitle>Таблица расходов</Subtitle>
              <FiltersContainer>
                <FilterGroup>
                  <FilterLabel>
                    <FilterText>Фильтровать по категории</FilterText>
                    <SelectedCategoryText>
                      {currentCategory ? currentCategory.name : "Все категории"}
                    </SelectedCategoryText>
                    <CustomSelectArrow
                      onClick={toggleCategoryDropdown}
                      isOpen={isCategoryDropdownOpen}
                    >
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
                    <CustomSelectArrow
                      onClick={toggleSortDropdown}
                      isOpen={isSortDropdownOpen}
                    >
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
                      <SortDropdownGroup>
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
                            Дате{" "}
                            {sortBy === "date" &&
                              (sortOrder === "desc" ? "↓" : "↑")}
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
                            Сумме{" "}
                            {sortBy === "amount" &&
                              (sortOrder === "desc" ? "↓" : "↑")}
                          </SortOptionButton>
                        </div>
                      </SortDropdownGroup>
                    </DropdownList>
                  )}
                </FilterGroup>
              </FiltersContainer>
            </DesktopHeaderContainer>

            {/* Мобильная версия - только фильтры, без заголовка */}
            <MobileHeaderContainer>
              <FiltersContainer>
                <FilterGroup>
                  <FilterLabel>
                    <FilterText>Фильтровать по категории</FilterText>
                    <MobileFilterText>Категория:</MobileFilterText>
                    <SelectedCategoryText>
                      {getMobileCategoryText()}
                    </SelectedCategoryText>
                    <CustomSelectArrow
                      onClick={toggleCategoryDropdown}
                      isOpen={isCategoryDropdownOpen}
                    >
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
                    <MobileFilterText>Сортировка:</MobileFilterText>
                    <SelectedCategoryText>
                      {getSortDisplayText()}
                    </SelectedCategoryText>
                    <CustomSelectArrow
                      onClick={toggleSortDropdown}
                      isOpen={isSortDropdownOpen}
                    >
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
                      <SortDropdownGroup>
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
                            Дате{" "}
                            {sortBy === "date" &&
                              (sortOrder === "desc" ? "↓" : "↑")}
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
                            Сумме{" "}
                            {sortBy === "amount" &&
                              (sortOrder === "desc" ? "↓" : "↑")}
                          </SortOptionButton>
                        </div>
                      </SortDropdownGroup>
                    </DropdownList>
                  )}
                </FilterGroup>
              </FiltersContainer>
            </MobileHeaderContainer>
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
                {sortedTransactions.map((transaction) => (
                  <TableRow
                    key={transaction._id}
                    onClick={() => handleRowClick(transaction)}
                    style={{
                      backgroundColor:
                        selectedTransaction &&
                        selectedTransaction._id === transaction._id
                          ? "#f5f5f5"
                          : "transparent",
                      cursor: "pointer",
                    }}
                  >
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>
                      {getCategoryNameByKey(transaction.category)}
                    </TableCell>
                    <TableCell>{formatDate(transaction.date)}</TableCell>
                    <TableCell>{formatAmount(transaction.sum)}</TableCell>
                    <IconCell>
                      <IconsContainer>
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(transaction);
                          }}
                          title="Редактировать"
                        >
                          <svg
                            width="12"
                            height="13"
                            viewBox="0 0 12 13"
                            fill="none"
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
                        </IconButton>
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(transaction._id);
                          }}
                          title="Удалить"
                        >
                          <svg
                            width="12"
                            height="13"
                            viewBox="0 0 12 13"
                            fill="none"
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
                        </IconButton>
                      </IconsContainer>
                    </IconCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </TableWrapper>

          {/* Кнопки действий в мобильной версии - вне скролла */}
          {selectedTransaction && isMobile && (
            <MobileActionsContainer>
              <MobileActionButton
                onClick={() => handleEditMobile(selectedTransaction)}
                variant="edit"
              >
                <svg width="14" height="14" viewBox="0 0 12 13" fill="none">
                  <path
                    d="M10.5 11.5H1.5C1.295 11.5 1.125 11.33 1.125 11.125C1.125 10.92 1.295 10.75 1.5 10.75H10.5C10.705 10.75 10.875 10.92 10.875 11.125C10.875 11.33 10.705 11.5 10.5 11.5Z"
                    fill="#666666"
                  />
                  <path
                    d="M9.51004 2.24002C8.54004 1.27002 7.59004 1.24502 6.59504 2.24002L5.99004 2.84502C5.94004 2.89502 5.92004 2.97502 5.94004 3.04502C6.32004 4.37002 7.38004 5.43002 8.70504 5.81002C8.72504 5.81502 8.74504 5.82002 8.76504 5.82002C8.82004 5.82002 8.87004 5.80002 8.91004 5.76002L9.51004 5.15502C10.005 4.66502 10.245 4.19002 10.245 3.71002C10.25 3.21502 10.01 2.73502 9.51004 2.24002Z"
                    fill="#666666"
                  />
                  <path
                    d="M7.80491 6.26502C7.65991 6.19502 7.51992 6.12502 7.38492 6.04502C7.27492 5.98002 7.16992 5.91002 7.06492 5.83502C6.97992 5.78002 6.87991 5.70002 6.78491 5.62002C6.77491 5.61502 6.73991 5.58502 6.69991 5.54502C6.53491 5.40502 6.34992 5.22502 6.18492 5.02502C6.16992 5.01502 6.14492 4.98002 6.10992 4.93502C6.05992 4.87502 5.97492 4.77502 5.89992 4.66002C5.83992 4.58502 5.76992 4.47502 5.70492 4.36502C5.62492 4.23002 5.55492 4.09502 5.48492 3.95502C5.39314 3.75835 5.13501 3.69993 4.98155 3.85339L2.16992 6.66502C2.10492 6.73002 2.04492 6.85502 2.02992 6.94002L1.75992 8.85502C1.70992 9.19502 1.80492 9.51502 2.01492 9.73002C2.19492 9.90502 2.44492 10 2.71492 10C2.77492 10 2.83492 9.99502 2.89492 9.98502L4.81492 9.71502C4.90492 9.70002 5.02992 9.64002 5.08992 9.57502L7.90618 6.75875C8.05658 6.60836 8.00007 6.34959 7.80491 6.26502Z"
                    fill="#666666"
                  />
                </svg>
                Редактировать расход
              </MobileActionButton>
              <MobileActionButton
                onClick={() => handleDelete(selectedTransaction._id)}
                variant="delete"
              >
                <svg width="14" height="14" viewBox="0 0 12 13" fill="none">
                  <path
                    d="M9.62 3.29003H9.42L7.73 1.60003C7.595 1.46503 7.375 1.46503 7.235 1.60003C7.1 1.73503 7.1 1.95503 7.235 2.09503L8.43 3.29003H3.57L4.765 2.09503C4.9 1.96003 4.9 1.74003 4.765 1.60003C4.63 1.46503 4.41 1.46503 4.27 1.60003L2.585 3.29003H2.385C1.935 3.29003 1 3.29003 1 4.57003C1 5.05503 1.1 5.37503 1.31 5.58503C1.43 5.71003 1.575 5.77503 1.73 5.81003C1.875 5.84503 2.03 5.85003 2.18 5.85003H9.82C9.975 5.85003 10.12 5.84003 10.26 5.81003C10.68 5.71003 11 5.41003 11 4.57003C11 3.29003 10.065 3.29003 9.62 3.29003Z"
                    fill="#FF4444"
                  />
                  <path
                    d="M9.52502 6.5H2.43502C2.12502 6.5 1.89002 6.775 1.94002 7.08L2.36002 9.65C2.50002 10.51 2.87502 11.5 4.54002 11.5H7.34502C9.03002 11.5 9.33002 10.655 9.51002 9.71L10.015 7.095C10.075 6.785 9.84002 6.5 9.52502 6.5ZM5.30502 9.725C5.30502 9.92 5.15002 10.075 4.96002 10.075C4.76502 10.075 4.61002 9.92 4.61002 9.725V8.075C4.61002 7.885 4.76502 7.725 4.96002 7.725C5.15002 7.725 5.30502 7.885 5.30502 8.075V9.725ZM7.44502 9.725C7.44502 9.92 7.29002 10.075 7.09502 10.075C6.90502 10.075 6.74502 9.92 6.74502 9.725V8.075C6.74502 7.885 6.90502 7.725 7.09502 7.725C7.29002 7.725 7.44502 7.885 7.44502 8.075V9.725Z"
                    fill="#FF4444"
                  />
                </svg>
                Удалить расход
              </MobileActionButton>
            </MobileActionsContainer>
          )}
        </TableContainer>

        <FormContainerWrapper show={showForm}>
          <NewCosts
            initialData={editingTransaction}
            onTransactionCreated={handleTransactionCreated}
            onTransactionUpdated={handleTransactionUpdated}
            isEditing={!!editingTransaction}
            onCancel={handleMobileFormClose}
          />
        </FormContainerWrapper>
      </MainContainer>
    </PageContainer>
  );
};

export default CostsTable;
