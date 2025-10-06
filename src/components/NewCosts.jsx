import { useState } from "react";
import styled from "styled-components";
import Input from "./base/Input";
import Button from "./base/Button";
import Label from "./base/Label";
import FormGroup from "./common/FormGroup";
import CategorySelector from "./common/CategorySelector";
import { postTransaction, editTransaction } from "../services/Transact";
import { isAuth } from "../services/Auth";

const FormContainer = styled.div`
  padding: 32px;
  background-color: #fff;
  border-radius: 30px;
  box-shadow: 0 20px 67px -12px #00000013;
  border: 1px solid #e0e0e0;
`;

const Title = styled.h2`
  color: black;
  font-size: 24px;
  font-weight: 700;
  margin: 0px;
  margin-bottom: 24px;
`;

const NewCosts = ({
  initialData,
  onEditMode,
  onTransactionAdded,
  isEditing = false,
} = {}) => {
  const { token } = isAuth();
  const [formData, setFormData] = useState({
    description: initialData?.description || "",
    category: initialData?.category || "",
    date: initialData?.date || "",
    amount: initialData?.amount || "",
  });
  const [status, setStatus] = useState({
    description: "normal",
    amount: "normal",
  });
  const [mode, setMode] = useState(isEditing ? "edit" : "create");
  const [loading, setLoading] = useState(false);

  // Обновляем форму при изменении initialData
  useState(() => {
    if (initialData) {
      setFormData({
        description: initialData.description || "",
        category: initialData.category || "",
        date: initialData.date
          ? new Date(initialData.date).toISOString().split("T")[0]
          : "",
        amount: initialData.sum || initialData.amount || "",
      });
      setMode("edit");
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Валидация
    if (
      !formData.amount ||
      !formData.description ||
      !formData.category ||
      !formData.date
    ) {
      setStatus({
        description: !formData.description ? "error" : "normal",
        amount: !formData.amount ? "error" : "normal",
      });
      return;
    }

    // Проверка минимальной длины описания
    if (formData.description.length < 4) {
      setStatus({
        description: "error",
        amount: status.amount,
      });
      alert("Описание должно содержать минимум 4 символа");
      return;
    }

    try {
      setLoading(true);

      const transactionData = {
        description: formData.description,
        sum: Number(formData.amount),
        category: formData.category,
        date: formData.date,
      };

      if (mode === "create") {
        await postTransaction({ token, transaction: transactionData });
        // Сброс формы после успешной отправки
        setFormData({ description: "", category: "", date: "", amount: "" });
      } else {
        // Для редактирования
        if (initialData && initialData._id) {
          await editTransaction({
            token,
            id: initialData._id,
            transaction: transactionData,
          });
        }
      }

      // Уведомляем родительский компонент о добавлении/обновлении транзакции
      if (onTransactionAdded) {
        onTransactionAdded();
      }

      setStatus({ description: "success", amount: "success" });
    } catch (error) {
      console.error("Ошибка при сохранении транзакции:", error);
      alert(`Ошибка: ${error.message}`);
      setStatus({ description: "error", amount: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Функция для переключения в режим редактирования
  const switchToEditMode = (data) => {
    setMode("edit");
    setFormData({
      description: data.description || "",
      category: data.category || "",
      date: data.date ? new Date(data.date).toISOString().split("T")[0] : "",
      amount: data.sum || "",
    });
  };

  // Если передан пропс onEditMode, используем его как триггер
  if (onEditMode) {
    onEditMode(switchToEditMode);
  }

  return (
    <FormContainer>
      <Title>{mode === "create" ? "Новый расход" : "Редактирование"}</Title>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="description">Описание</Label>
          <Input
            name="description"
            placeholder="Введите описание (минимум 4 символа)"
            value={formData.description}
            onChange={handleInputChange}
            status={status.description}
            disabled={loading}
          />
        </FormGroup>

        <FormGroup>
          <Label>Категория</Label>
          <CategorySelector
            value={formData.category}
            onChange={handleInputChange}
            disabled={loading}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="date">Дата</Label>
          <Input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            disabled={loading}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="amount">Сумма</Label>
          <Input
            type="number"
            name="amount"
            placeholder="Введите сумму"
            value={formData.amount}
            onChange={handleInputChange}
            status={status.amount}
            disabled={loading}
            min="1"
          />
        </FormGroup>

        <Button
          type="submit"
          disabled={
            !formData.category ||
            loading ||
            !formData.description ||
            !formData.amount ||
            !formData.date
          }
        >
          {loading
            ? "Сохранение..."
            : mode === "create"
            ? "Добавить новый расход"
            : "Сохранить изменения"}
        </Button>
      </form>
    </FormContainer>
  );
};

export default NewCosts;
