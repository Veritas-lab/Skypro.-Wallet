import React from 'react';
import styled from 'styled-components';
import { CATEGORIES } from '../../constants/categories';

const CategoryGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const CategoryButton = styled.label`
  padding: 8px 20px;
  border: 1px solid #e0e0e0;
  border-radius: 30px;
  background-color: ${({ checked }) => (checked ? '#DBFFE9' : '#F4F5F6')};
  text-align: center;
  font-size: 12px;
  font-weight: 400;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ checked }) => (checked ? '#1FA46C' : 'black')};

  svg {
    fill: ${({ checked }) => (checked ? '#1FA46C' : 'black')};
  }
`;

const HiddenRadio = styled.input.attrs({ type: 'radio' })`
  display: none;
`;

const CategorySelector = ({ value, onChange, showIcons = true }) => {
  const handleChange = (e) => {
    const selectedCategory = CATEGORIES.find(cat => cat.id === e.target.value);
    if (selectedCategory && onChange) {
      onChange(selectedCategory.apiKey);
    }
  };

  return (
    <CategoryGroup>
      {CATEGORIES.map((category) => (
        <div key={category.id}>
          <HiddenRadio
            id={category.id}
            name="category"
            value={category.id}
            checked={value === category.apiKey}
            onChange={handleChange}
          />
          <CategoryButton htmlFor={category.id} checked={value === category.apiKey}>
            {showIcons && <category.icon />}
            {category.name}
          </CategoryButton>
        </div>
      ))}
    </CategoryGroup>
  );
};

export default CategorySelector;