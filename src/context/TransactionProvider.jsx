import { useState, useContext, useCallback } from "react";
import { TransactionContext } from "./TransactionContext";
import { AuthContext } from "./AuthContext";
import { 
  getTransactions, 
  getTransactionsByPeriod,
  addTransaction, 
  updateTransaction, 
  deleteTransaction 
} from "../services/transactionsAPI";

export default function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  const getToken = useCallback(() => {
    return user?.token;
  }, [user]);

  const loadTransactions = useCallback(async (sortBy = null, filterBy = null) => {
    const token = getToken();
    if (!token) {
      setError("Пользователь не авторизован");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await getTransactions(token, sortBy, filterBy);
      setTransactions(data);
    } catch (err) {
      setError(err.message);
      console.error("Ошибка при загрузке транзакций:", err);
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  const loadTransactionsByPeriod = useCallback(async (startDate, endDate) => {
    const token = getToken();
    if (!token) {
      setError("Пользователь не авторизован");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await getTransactionsByPeriod(startDate, endDate, token);
      setTransactions(data);
    } catch (err) {
      setError(err.message);
      console.error("Ошибка при загрузке транзакций за период:", err);
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  const createTransaction = useCallback(async (transactionData) => {
    const token = getToken();
    if (!token) {
      setError("Пользователь не авторизован");
      return false;
    }

    setLoading(true);
    setError(null);
    try {
      await addTransaction(transactionData, token);
      // После успешного создания перезагружаем транзакции
      await loadTransactions();
      return true;
    } catch (err) {
      setError(err.message);
      console.error("Ошибка при добавлении транзакции:", err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [getToken, loadTransactions]);

  const editTransaction = useCallback(async (id, transactionData) => {
    const token = getToken();
    if (!token) {
      setError("Пользователь не авторизован");
      return false;
    }

    setLoading(true);
    setError(null);
    try {
      await updateTransaction(id, transactionData, token);
      // После успешного обновления перезагружаем транзакции
      await loadTransactions();
      return true;
    } catch (err) {
      setError(err.message);
      console.error("Ошибка при обновлении транзакции:", err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [getToken, loadTransactions]);

  const removeTransaction = useCallback(async (id) => {
    const token = getToken();
    if (!token) {
      setError("Пользователь не авторизован");
      return false;
    }

    setLoading(true);
    setError(null);
    try {
      await deleteTransaction(id, token);
      // После успешного удаления перезагружаем транзакции
      await loadTransactions();
      return true;
    } catch (err) {
      setError(err.message);
      console.error("Ошибка при удалении транзакции:", err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [getToken, loadTransactions]);

  const value = {
    transactions,
    loading,
    error,
    loadTransactions,
    loadTransactionsByPeriod,
    createTransaction,
    editTransaction,
    removeTransaction,
    setError
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
}