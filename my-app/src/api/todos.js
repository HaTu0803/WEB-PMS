import axiosClient from './axiosClient';

const END_POINT = {
    TODOS: "/address",
}
export const getTodosAPI = () => { 
    return axiosClient.get('${END_POINT.TODOS}');
}
