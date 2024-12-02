import styled from 'styled-components';



export const Container = styled.div`
  display: flex;
  height: 100vh;
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  text-align: center;
  h2 {
    margin-bottom: 10px;
    color: #333;
  }
`;

export const Toggle = styled.div`
  text-align: center;
  margin-top: 20px;

  p {
    color: #007bff;
    cursor: pointer;
    text-decoration: none;
  }
`;

export const ImageSection = styled.div`
  flex: 1;
  background: #007bff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 80%;
    border-radius: 10px;
  }
    h1{
    
    color: white;
    font-size: 30px;
    text-align: center;
    margin-top: 20px;
    fon-weight: 800;
    font-family: 'Poppins', sans-serif;
    }
`;