import React ,{useState,useContext,useEffect} from 'react';
import axios from 'axios'
import {useSelector} from 'react-redux'

function Details(){
    const patientData = useSelector(state=>state.patientReducer.data)
    let [data,setData] =useState([])

    useEffect(()=>{
        setData(patientData)
        console.log(patientData)
    },[])

    return (
        <>
            <div className="d-flex justify-content-around " style={{backgroundColor:"gray",color:"white"}}>
                <h3 className="m-3">Name : {data.name}</h3>
                <h3 className="m-3">Gender : {data.gender}</h3>
                <h3 className="m-3">Age : {data.age}</h3>
            </div>
            <table class="table container my-3">
                <thead class="thead-dark">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Medicines</th>
                    <th scope="col">Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {   
                     data.length!=0 && Object.keys(data.medicine).map((item,i)=>(
                        <tr>
                            <th scope="row">{i+1}</th>
                            <td>{item}</td>
                            <td>{data.medicine[item]}</td>
                        </tr>
                    ))
                      
                    }
                </tbody>
                </table>

        </>

    )
}
export default Details
