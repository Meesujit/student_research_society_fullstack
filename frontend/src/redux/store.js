import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import researchReducer from './slices/researchSlice';
import eventReducer from './slices/eventSlice';
import { setToken } from './slices/authSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    research: researchReducer,
    event: eventReducer,
  },
});



const token = localStorage.getItem('token');
if(token){
  store.dispatch(setToken(token));
}

export  {
  store, 
};
