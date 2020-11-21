import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER } from './actionTypes';
let initState = {
    isAuth: false,
    doctor_id:"",
    error:false
}

const authReducer = (state=initState,{type,payload})=>{
    switch(type){
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                isAuth:true,
                doctor_id:payload,
                error:false
            }
        case LOGIN_USER_FAILURE:
            return {
                ...state,
                isAuth:false,
                doctor_id:"",
                error:true
            }
        default:
            return state;
    }
}

export default authReducer