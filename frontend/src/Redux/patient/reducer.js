import {SET_PATIENT_DATA} from './actionType'
let initState ={
    data:[]
}

const patientReducer = (state=initState,{type,payload})=>{
    switch(type){
        case SET_PATIENT_DATA:
            return {
                ...state,
                data:payload
            }
        default:
            return state;
    }
}

export default patientReducer