import React, {useState} from 'react'
import Login from '../../components/Auth/Login';
import Register from '../../components/Auth/Register';
import { Container, Content, ImageSection, Toggle } from './HomeStyle';

const Home = () => {
    const [isLogin, setIsLogin] = useState(true);
  return (
    <Container>
      <Content>
          <h2>{isLogin ? 'Welcome Back!' : 'Join Us!'}</h2>
        {isLogin ? <Login /> : <Register />}
        <Toggle>
          <p onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'New here? Sign Up' : 'Already have an account? Login'}
          </p>
        </Toggle>
      </Content>
      <ImageSection>  
        <h1>Welcome to Student Research Society.</h1>      
        <img src="https://cdni.iconscout.com/illustration/premium/thumb/student-studying-in-classroom-illustration-download-svg-png-gif-file-formats--line-logo-mathematics-books-at-class-school-and-education-pack-illustrations-3345618.png" alt="Welcome" />
      </ImageSection>
    </Container>
  )
}

export default Home