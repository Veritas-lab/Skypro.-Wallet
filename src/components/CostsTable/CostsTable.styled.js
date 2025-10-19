// CostsTable.styled.js
import styled from "styled-components";

export const PageContainer = styled.div`
  padding-left: calc(50% - 600px);
  padding-right: calc(50% - 600px);

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const Header = styled.header`
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

export const Title = styled.h1`
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

export const NewExpenseButton = styled.button`
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

export const ButtonIcon = styled.div`
  display: flex;
  margin-right: 8px;
`;

export const BackToExpensesButton = styled.button`
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

export const BackButtonIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

export const HeaderTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;

  @media (max-width: 768px) {
    flex: 1;
    justify-content: center;
  }
`;

export const MobileHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const MainContainer = styled.div`
  display: flex;
  gap: 34px;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

export const TableContainer = styled.div`
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

export const FormContainerWrapper = styled.div`
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

export const TableHeaderContainer = styled.div`
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

export const Subtitle = styled.h2`
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

export const DesktopHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const MobileHeaderContainer = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    width: 100%;
    justify-content: space-between;
    gap: 16px;
  }
`;

export const FiltersContainer = styled.div`
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

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;

  @media (max-width: 768px) {
    flex: 1;
  }
`;

export const FilterLabel = styled.label`
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

export const FilterText = styled.span`
  cursor: default;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const SelectedCategoryText = styled.span`
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

export const CustomSelectArrow = styled.div`
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

export const DropdownList = styled.div`
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

export const DropdownCategoryGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const SortDropdownGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;

  @media (max-width: 768px) {
    gap: 12px;
  }
`;

export const DropdownCategoryButton = styled.label`
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

export const SortOptionButton = styled.label`
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

export const HiddenRadio = styled.input.attrs({ type: "radio" })`
  display: none;
`;

export const TableWrapper = styled.div`
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

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0 16px;

  @media (max-width: 768px) {
    min-width: 311px;
    border-spacing: 0 16px;
  }
`;

export const TableHead = styled.thead`
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

export const TableRow = styled.tr`
  @media (max-width: 768px) {
    border-bottom: 1px solid #f0f0f0;
    height: auto;
  }
`;

export const TableHeader = styled.th`
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

export const TableCell = styled.td`
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

export const IconCell = styled.td`
  text-align: left;
  padding: 12px 16px;
  font-size: 12px;
  font-weight: 400;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const IconsContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const IconButton = styled.button`
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

export const MobileActionsContainer = styled.div`
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

export const MobileActionButton = styled.button`
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

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 16px;
  color: #666;

  @media (max-width: 768px) {
    padding: 20px;
    font-size: 14px;
  }
`;

export const ErrorMessage = styled.div`
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

export const EmptyMessage = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 16px;
  color: #666;

  @media (max-width: 768px) {
    padding: 20px;
    font-size: 14px;
  }
`;

export const MobileFilterText = styled.span`
  display: none;

  @media (max-width: 768px) {
    display: inline;
    font-size: 11px;
    color: #000;
  }
`;
