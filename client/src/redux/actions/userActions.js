import axios from 'axios';
import { message } from 'antd';

export const userRegister = (values) => async dispatch => {

    dispatch({ type: 'LOADING', payload: true });
    try {
        const res = await axios.post('/api/users/register', values);
        dispatch({ type: 'LOADING', payload: false });
        message.success('User registered successfully');
        window.location.href = '/login';
    }
    catch (error) {
        console.log(error);
        dispatch({ type: 'LOADING', payload: false });
        message.error('Something went wrong');
    }
}


export const userLogin = (values) => async dispatch => {

    dispatch({ type: 'LOADING', payload: true });
    try {
        const res = await axios.post('/api/users/login', values);
        dispatch({ type: 'LOADING', payload: false });
        message.success('User logged in successfully');
        localStorage.setItem('user', JSON.stringify(res.data));
        window.location.href = '/';
    }
    catch (error) {
        console.log(error);
        dispatch({ type: 'LOADING', payload: false });
        message.error('Something went wrong');
    }
}