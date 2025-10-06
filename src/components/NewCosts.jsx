import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import Input from "./base/Input";
import Button from "./base/Button";
import Label from "./base/Label";
import FormGroup from "./common/FormGroup";
import CategorySelector from "./common/CategorySelector";
import { TransactionContext } from "../context/TransactionContext";

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
  onTransactionCreated,
  onTransactionUpdated,
  isEditing = false,
}) => {
  const { createTransaction, editTransaction, loading } =
    useContext(TransactionContext);

  const [formData, setFormData] = useState({
    description: "",
    category: "",
    date: "",
    sum: "",
  });
  const [status, setStatus] = useState({
    description: "normal",
    sum: "normal",
  });

  useEffect(() => {
    if (initialData && isEditing) {
      setFormData({
        description: initialData.description || "",
        category: initialData.category || "",
        date: formatDateForInput(initialData.date) || "",
        sum: initialData.sum?.toString() || "",
      });
    } else {
      setFormData({
        description: "",
        category: "",
        date: "",
        sum: "",
      });
    }
  }, [initialData, isEditing]);

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const formatDateForAPI = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (category) => {
    setFormData({ ...formData, category });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasErrors = false;
    const newStatus = { ...status };

    if (!formData.description || formData.description.length < 4) {
      newStatus.description = "error";
      hasErrors = true;
    } else {
      newStatus.description = "success";
    }

    if (!formData.sum || parseFloat(formData.sum) <= 0) {
      newStatus.sum = "error";
      hasErrors = true;
    } else {
      newStatus.sum = "success";
    }

    if (!formData.category || !formData.date) {
      hasErrors = true;
    }

    setStatus(newStatus);

    if (hasErrors) {
      return;
    }

    const transactionData = {
      description: formData.description,
      sum: parseFloat(formData.sum),
      category: formData.category,
      date: formatDateForAPI(formData.date),
    };

    let success = false;

    if (isEditing) {
      success = await editTransaction(initialData._id, transactionData);
      if (success && onTransactionUpdated) {
        onTransactionUpdated();
      }
    } else {
      success = await createTransaction(transactionData);
      if (success && onTransactionCreated) {
        onTransactionCreated();
      }
    }

    if (success && !isEditing) {
      setFormData({
        description: "",
        category: "",
        date: "",
        sum: "",
      });
      setStatus({
        description: "normal",
        sum: "normal",
      });
    }
  };

  return (
    <FormContainer>
      <Title>{isEditing ? "Редактирование" : "Новый расход"}</Title>
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
            onChange={handleCategoryChange}
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
          <Label htmlFor="sum">Сумма</Label>
          <Input
            type="number"
            name="sum"
            placeholder="Введите сумму"
            value={formData.sum}
            onChange={handleInputChange}
            status={status.sum}
            disabled={loading}
            min="0.01"
            step="0.01"
          />
        </FormGroup>

        <Button type="submit" disabled={!formData.category || loading}>
          {loading
            ? "Загрузка..."
            : isEditing
            ? "Сохранить изменения"
            : "Добавить новый расход"}
        </Button>
      </form>
    </FormContainer>
  );
};

export default NewCosts;
