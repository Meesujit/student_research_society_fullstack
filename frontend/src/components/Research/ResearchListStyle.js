import styled from 'styled-components';

export const ResearchListContainer = styled.div`
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

export const ListTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 20px;
  text-align: center;
`;

export const ResearchItem = styled.li`
  list-style: none;
  padding: 15px;
  border-bottom: 1px solid #ccc;

  &:last-child {
    border-bottom: none;
  }
`;

export const ResearchDetails = styled.div`
  margin-bottom: 10px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;

  button {
    padding: 8px 15px;
    border: none;
    border-radius: 4px;
    font-size: 0.9rem;
    cursor: pointer;
  }

  .approve {
    background-color: #28a745;
    color: white;

    &:hover {
      background-color: #218838;
    }

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }

  .delete {
    background-color: #dc3545;
    color: white;

    &:hover {
      background-color: #c82333;
    }
  }
`;
