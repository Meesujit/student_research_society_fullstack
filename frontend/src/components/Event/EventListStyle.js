import styled from 'styled-components';

export const EventListContainer = styled.div`
  padding: 20px;
`;

export const EventTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 20px;
  text-align: center;
`;

export const EventItem = styled.li`
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;

  h4 {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }

  p {
    margin: 5px 0;
  }

  h5 {
    margin-top: 15px;
    font-size: 1rem;
    font-weight: bold;
  }

  ul {
    padding-left: 20px;
    list-style-type: disc;
  }

  ul li {
    margin: 5px 0;
  }
`;

export const JoinButton = styled.button`
  padding: 8px 15px;
  background-color: ${({ disabled }) => (disabled ? 'gray' : 'green')};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-size: 0.9rem;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? 'gray' : '#28a745')};
  }
`;
