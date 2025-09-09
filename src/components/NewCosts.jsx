import { useState } from "react";
import styled from "styled-components";
import Input from "./components/base/Input";
import Button from "./components/base/Button";
import Label from "./components/base/Label";
import FormGroup from "./components/common/FormGroup";
import CategorySelector from "./components/common/CategorySelector";

const Body = styled.div`
  font-family: Montserrat, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background-color: #f5f5f5;
`;

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
  margin-bottom: 24px;
`;

const NewCosts = ({ initialData, onEditMode } = {}) => {
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
  const [mode, setMode] = useState("create");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount) {
      setStatus({ ...status, amount: "error" });
      return;
    }
    setStatus({ ...status, amount: "success" });
    console.log(`${mode} mode submitted:`, formData);
    // Сброс формы после успешной отправки (только для create)
    if (mode === "create") {
      setFormData({ description: "", category: "", date: "", amount: "" });
    }
    // API call здесь
  };

  // Функция для переключения в режим редактирования
  const switchToEditMode = (data) => {
    setMode("edit");
    setFormData({
      description: data.description || "",
      category: data.category || "",
      date: data.date || "",
      amount: data.amount || "",
    });
  };

  // Если передан пропс onEditMode, используем его как триггер
  if (onEditMode) {
    onEditMode(switchToEditMode);
  }

  return (
    <Body>
      <FormContainer>
        <Title>{mode === "create" ? "Новый расход" : "Редактирование"}</Title>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="description">Описание</Label>
            <Input
              name="description"
              placeholder="Введите описание"
              value={formData.description}
              onChange={handleInputChange}
              status={status.description}
            />
          </FormGroup>

          <FormGroup>
            <Label>Категория</Label>
            <CategorySelector
              value={formData.category}
              onChange={handleInputChange}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="date">Дата</Label>
            <Input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
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
            />
          </FormGroup>

          <Button type="submit" disabled={!formData.category}>
            {mode === "create"
              ? "Добавить новый расход"
              : "Сохранить изменения"}
          </Button>
        </form>
      </FormContainer>
    </Body>
  );
};

export default NewCosts;
