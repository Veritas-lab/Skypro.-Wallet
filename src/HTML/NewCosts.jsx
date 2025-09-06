import { useState } from "react";
import styled from "styled-components";

// Styled components
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

const FormGroup = styled.div`
  margin-bottom: 24px;
  width: 313px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: black;
  display: block;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 286px;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;

  &::placeholder {
    color: #999999;
    font-family: Montserrat, sans-serif;
    font-size: 14px;
    font-weight: 400;
    opacity: 1;
  }
`;

const CategoryGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const CategoryButton = styled.label`
  padding: 8px 20px;
  border: 1px solid #e0e0e0;
  border-radius: 30px;
  background-color: ${(props) => (props.checked ? "#F1EBFD" : "#F4F5F6")};
  text-align: center;
  font-size: 12px;
  font-weight: 400;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${(props) => (props.checked ? "#7334EA" : "black")};

  svg {
    fill: ${(props) => (props.checked ? "#7334EA" : "black")};
  }
`;

const HiddenRadio = styled.input.attrs({ type: "radio" })`
  display: none;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #7334ea;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #8e00e6;
  }
`;

// SVG иконки для категорий
const CategoryIcons = {
  Food: (
    <svg width="10" height="7" viewBox="0 0 10 7">
      <path d="M9.11257 0.5H0.840903C0.479237 0.5 0.20507 0.820833 0.263404 1.17667L0.753403 4.175C0.916737 5.17833 1.35424 6.33333 3.29674 6.33333H6.56924C8.53507 6.33333 8.88507 5.3475 9.09507 4.245L9.68424 1.19417C9.75424 0.8325 9.48007 0.5 9.11257 0.5ZM4.18924 4.2625C4.18924 4.49 4.0084 4.67083 3.78674 4.67083C3.55924 4.67083 3.3784 4.49 3.3784 4.2625V2.3375C3.3784 2.11583 3.55924 1.92917 3.78674 1.92917C4.0084 1.92917 4.18924 2.11583 4.18924 2.3375V4.2625ZM6.6859 4.2625C6.6859 4.49 6.50507 4.67083 6.27757 4.67083C6.0559 4.67083 5.86924 4.49 5.86924 4.2625V2.3375C5.86924 2.11583 6.0559 1.92917 6.27757 1.92917C6.50507 1.92917 6.6859 2.11583 6.6859 2.3375V4.2625Z" />
    </svg>
  ),
  Transport: (
    <svg width="14" height="8" viewBox="0 0 14 8">
      <path d="M12.9383 2.46817C12.8508 1.50567 12.5941 0.479004 10.7216 0.479004H3.27828C1.40578 0.479004 1.15495 1.50567 1.06162 2.46817L0.734948 6.02067C0.694115 6.464 0.839948 6.90734 1.14328 7.23984C1.45245 7.57817 1.88995 7.77067 2.35661 7.77067H3.45328C4.39828 7.77067 4.57911 7.22817 4.69578 6.87234L4.81245 6.52234C4.94661 6.11984 4.98161 6.02067 5.50661 6.02067H8.49328C9.01828 6.02067 9.03578 6.079 9.18745 6.52234L9.30411 6.87234C9.42078 7.22817 9.60161 7.77067 10.5466 7.77067H11.6433C12.1041 7.77067 12.5474 7.57817 12.8566 7.23984C13.1599 6.90734 13.3058 6.464 13.2649 6.02067L12.9383 2.46817ZM5.24995 3.68734H3.49995C3.26078 3.68734 3.06245 3.489 3.06245 3.24984C3.06245 3.01067 3.26078 2.81234 3.49995 2.81234H5.24995C5.48911 2.81234 5.68745 3.01067 5.68745 3.24984C5.68745 3.489 5.48911 3.68734 5.24995 3.68734ZM10.4999 3.68734H8.74995C8.51078 3.68734 8.31245 3.489 8.31245 3.24984C8.31245 3.01067 8.51078 2.81234 8.74995 2.81234H10.4999C10.7391 2.81234 10.9374 3.01067 10.9374 3.24984C10.9374 3.489 10.7391 3.68734 10.4999 3.68734Z" />
    </svg>
  ),
  Housing: (
    <svg width="14" height="13" viewBox="0 0 14 13">
      <path d="M12.8334 11.8958H12.25V5.32167C12.25 4.96 12.0867 4.62167 11.8009 4.4L11.0834 3.84L11.0717 2.41084C11.0717 2.09 10.8092 1.83334 10.4884 1.83334H8.49919L7.71752 1.22667C7.29752 0.89417 6.70252 0.89417 6.28252 1.22667L2.19919 4.4C1.91335 4.62167 1.75002 4.96 1.75002 5.31584L1.72085 11.8958H1.16669C0.92752 11.8958 0.729187 12.0942 0.729187 12.3333C0.729187 12.5725 0.92752 12.7708 1.16669 12.7708H12.8334C13.0725 12.7708 13.2709 12.5725 13.2709 12.3333C13.2709 12.0942 13.0725 11.8958 12.8334 11.8958ZM3.79169 6.9375V6.0625C3.79169 5.74167 4.05419 5.47917 4.37502 5.47917H5.54169C5.86252 5.47917 6.12502 5.74167 6.12502 6.0625V6.9375C6.12502 7.25834 5.86252 7.52084 5.54169 7.52084H4.37502C4.05419 7.52084 3.79169 7.25834 3.79169 6.9375ZM8.45835 11.8958H5.54169V10.2917C5.54169 9.8075 5.93252 9.41667 6.41669 9.41667H7.58335C8.06752 9.41667 8.45835 9.8075 8.45835 10.2917V11.8958ZM10.2084 6.9375C10.2084 7.25834 9.94585 7.52084 9.62502 7.52084H8.45835C8.13752 7.52084 7.87502 7.25834 7.87502 6.9375V6.0625C7.87502 5.74167 8.13752 5.47917 8.45835 5.47917H9.62502C9.94585 5.47917 10.2084 5.74167 10.2084 6.0625V6.9375Z" />
    </svg>
  ),
  Entertainment: (
    <svg width="12" height="13" viewBox="0 0 12 13">
      <path d="M8.91667 0.666504H3.08333C1.8 0.666504 0.75 1.7165 0.75 2.99984V9.99984C0.75 11.2832 1.8 12.3332 3.08333 12.3332H8.91667C10.2 12.3332 11.25 11.2832 11.25 9.99984V2.99984C11.25 1.7165 10.2 0.666504 8.91667 0.666504ZM5.335 10.0815C5.2475 10.169 5.13667 10.2098 5.02583 10.2098C4.915 10.2098 4.80417 10.169 4.71667 10.0815L4.3375 9.70234L3.97583 10.064C3.88833 10.1515 3.7775 10.1923 3.66667 10.1923C3.55583 10.1923 3.445 10.1515 3.3575 10.064C3.18833 9.89484 3.18833 9.61484 3.3575 9.44567L3.71917 9.084L3.375 8.73984C3.20583 8.57067 3.20583 8.29067 3.375 8.1215C3.54417 7.95234 3.82417 7.95234 3.99333 8.1215L4.3375 8.46567L4.69917 8.104C4.86833 7.93484 5.14833 7.93484 5.3175 8.104C5.48667 8.27317 5.48667 8.55317 5.3175 8.72234L4.95583 9.084L5.335 9.46317C5.50417 9.63234 5.50417 9.91234 5.335 10.0815ZM7.4525 10.2857C7.13167 10.2857 6.86917 10.029 6.86917 9.70817V9.6965C6.86917 9.37567 7.13167 9.11317 7.4525 9.11317C7.77333 9.11317 8.03583 9.37567 8.03583 9.6965C8.03583 10.0173 7.77333 10.2857 7.4525 10.2857ZM8.63083 9.02567C8.31 9.02567 8.04167 8.76317 8.04167 8.44234C8.04167 8.1215 8.29833 7.859 8.61917 7.859H8.63083C8.95167 7.859 9.21417 8.1215 9.21417 8.44234C9.21417 8.76317 8.95167 9.02567 8.63083 9.02567ZM9.5 4.89567C9.5 5.45567 9.03917 5.9165 8.47917 5.9165H3.52083C2.96083 5.9165 2.5 5.45567 2.5 4.89567V3.43734C2.5 2.87734 2.96083 2.4165 3.52083 2.4165H8.47917C9.03917 2.4165 9.5 2.87734 9.5 3.43734V4.89567Z" />
    </svg>
  ),
  Education: (
    <svg width="12" height="9" viewBox="0 0 12 9">
      <path d="M10.655 3.26841L7.16084 0.975908C6.53084 0.561742 5.49251 0.561742 4.86251 0.975908L1.35084 3.26841C0.225011 3.99757 0.225011 5.64841 1.35084 6.38341L2.28418 6.99007L4.86251 8.67007C5.49251 9.08424 6.53084 9.08424 7.16084 8.67007L9.72168 6.99007L10.5208 6.46507V8.25007C10.5208 8.48924 10.7192 8.68757 10.9583 8.68757C11.1975 8.68757 11.3958 8.48924 11.3958 8.25007V5.38007C11.6292 4.62757 11.39 3.75257 10.655 3.26841Z" />
    </svg>
  ),
  Other: (
    <svg width="12" height="13" viewBox="0 0 12 13">
      <path d="M8.33332 0.666504H3.66666C1.33332 0.666504 0.166656 1.83317 0.166656 4.1665V11.7498C0.166656 12.0707 0.429157 12.3332 0.74999 12.3332H8.33332C10.6667 12.3332 11.8333 11.1665 11.8333 8.83317V4.1665C11.8333 1.83317 10.6667 0.666504 8.33332 0.666504ZM7.16666 8.39567H3.08332C2.84416 8.39567 2.64582 8.19734 2.64582 7.95817C2.64582 7.719 2.84416 7.52067 3.08332 7.52067H7.16666C7.40582 7.52067 7.60416 7.719 7.60416 7.95817C7.60416 8.19734 7.40582 8.39567 7.16666 8.39567ZM8.91666 5.479H3.08332C2.84416 5.479 2.64582 5.28067 2.64582 5.0415C2.64582 4.80234 2.84416 4.604 3.08332 4.604H8.91666C9.15582 4.604 9.35416 4.80234 9.35416 5.0415C9.35416 5.28067 9.15582 5.479 8.91666 5.479Z" />
    </svg>
  ),
};

// React component
const NewCosts = () => {
  const [formData, setFormData] = useState({
    description: "",
    category: "",
    date: "",
    amount: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Надо добавить логику для обработки отправки формы (с помощью API)
  };

  return (
    <Body>
      <FormContainer>
        <Title>Новый расход</Title>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="description">Описание</Label>
            <Input
              type="text"
              name="description"
              placeholder="Введите описание"
              value={formData.description}
              onChange={handleInputChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>Категория</Label>
            <CategoryGroup>
              {[
                "Food",
                "Transport",
                "Housing",
                "Entertainment",
                "Education",
                "Other",
              ].map((category) => (
                <div key={category}>
                  <HiddenRadio
                    id={category}
                    name="category"
                    value={category}
                    checked={formData.category === category}
                    onChange={handleInputChange}
                  />
                  <CategoryButton
                    htmlFor={category}
                    checked={formData.category === category}
                  >
                    {CategoryIcons[category]}
                    {category === "Food"
                      ? "Еда"
                      : category === "Transport"
                      ? "Транспорт"
                      : category === "Housing"
                      ? "Жилье"
                      : category === "Entertainment"
                      ? "Развлечения"
                      : category === "Education"
                      ? "Образование"
                      : "Другое"}
                  </CategoryButton>
                </div>
              ))}
            </CategoryGroup>
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
            />
          </FormGroup>

          <SubmitButton type="submit">Добавить новый расход</SubmitButton>
        </form>
      </FormContainer>
    </Body>
  );
};

export default NewCosts;
