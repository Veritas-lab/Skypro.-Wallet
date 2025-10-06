import axios from "axios";

const BASE_URL = "https://wedev-api.sky.pro/api/";

const getAuthHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "",
  },
});

// Получение списка транзакций
export const getTransactions = async (token, sortBy = null, filterBy = null) => {
  try {
    let url = `${BASE_URL}transactions`;
    const params = new URLSearchParams();
    
    if (sortBy) params.append('sortBy', sortBy);
    if (filterBy) params.append('filterBy', filterBy);
    
    const queryString = params.toString();
    if (queryString) url += `?${queryString}`;

    const response = await axios.get(url, getAuthHeaders(token));
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || error.message || "Не удалось получить транзакции";
    throw new Error(errorMessage);
  }
};

// Получение транзакций за период
export const getTransactionsByPeriod = async (startDate, endDate, token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}transactions/period`,
      { start: startDate, end: endDate },
      getAuthHeaders(token)
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || error.message || "Не удалось получить транзакции за период";
    throw new Error(errorMessage);
  }
};

// Получение транзакции по ID
export const getTransactionById = async (id, token) => {
  try {
    const response = await axios.get(`${BASE_URL}transactions/${id}`, getAuthHeaders(token));
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || error.message || "Не удалось получить транзакцию";
    throw new Error(errorMessage);
  }
};

// Добавление новой транзакции
export const addTransaction = async (transactionData, token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}transactions`,
      transactionData,
      getAuthHeaders(token)
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || error.message || "Не удалось добавить транзакцию";
    throw new Error(errorMessage);
  }
};

// Обновление транзакции
export const updateTransaction = async (id, transactionData, token) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}transactions/${id}`,
      transactionData,
      getAuthHeaders(token)
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || error.message || "Не удалось обновить транзакцию";
    throw new Error(errorMessage);
  }
};

// Удаление транзакции
export const deleteTransaction = async (id, token) => {
  try {
    const response = await axios.delete(`${BASE_URL}transactions/${id}`, getAuthHeaders(token));
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || error.message || "Не удалось удалить транзакцию";
    throw new Error(errorMessage);
  }
};