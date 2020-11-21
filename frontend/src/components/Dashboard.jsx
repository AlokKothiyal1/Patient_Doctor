import {Link, useHistory} from 'react-router-dom'
import React ,{useState,useEffect} from 'react';
import {useSelector} from 'react-redux'
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {useDispatch} from 'react-redux'
import { setPatientData } from '../Redux/patient/actions';


export default function Dashboard(){

    let doctorId = useSelector((state) => state.auth.doctor_id)
    let  [data,setData] = useState([])
    let [loading,setLoading]= useState(false)
    let [page,setPage] = useState(1)
    let [limit,setLimit]= useState(6)
    let [sort,setSort] = useState('none')
    let [name,setName] = useState("")
    let [total,setTotal] =useState(0)
    const history = useHistory()
    
    let[newName,setNewName] = useState('')
    let[age,setAge] = useState('')
    let[gender,setGender] = useState('')

    const dispatch = useDispatch()

    
    let endIndex = page*limit
    let startIndex = endIndex - limit
    let arr = new Array(Math.ceil(total/limit)).fill(1)

    useEffect(()=>{
        getData()

    },[])

    const getData =()=>{
        axios.get(`http://localhost:5000/api/patient/get`,{params:{"did":doctorId}})
        .then((res)=>{
            console.log(res)
            setData(res.data.current)
            setLoading(false)
        })
        .catch(err=>console.log(err)) 
    }

    const handleDetails =(data)=>{
        dispatch(setPatientData(data))
        history.push('/details')
    }
    const handleDelete =(id)=>{
        
        axios.delete(`http://localhost:5000/api/patient/delete/${id}`)
        .then((res)=>{
            getData()})
        .catch((err)=>console.log(err))
    }
    const handleAdd = ()=>{
        axios.post('http://localhost:5000/api/patient/post',{"doctor_id":doctorId,"name":newName,"gender":gender,"age":age,"medicine":{"Dummy med":0}})
        .then(res=>getData())
        .catch((err)=>console.log(err))
    }

    return (
        <div className="container-fluid">
            <h1>Patients List</h1>
                {
                    loading && <div className="spinner-border text-primary" role="status">
                               <span className="sr-only">Loading...</span>
                            </div> 
                }

                <div className="d-flex justify-content-center align-items-center">

                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth="true"
                label="Search for Users"
                name="search"
                autoFocus
                style = {{width: "20%",minWidth:150, margin:10}}
                value = {name}
                onChange={(e)=>{
                    setPage(1)
                    setName(e.target.value)
                }}
                />

                <FormControl variant="outlined" style={{minWidth:120}}>
                    <InputLabel >Sort</InputLabel>
                    <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={sort}
                    onChange={(e)=>{
                        setSort(e.target.value)}}
                    label="Sort"
                    >
                    <MenuItem value="none">None</MenuItem>
                    <MenuItem value="asc">Ascending</MenuItem>
                    <MenuItem value="desc">Descending</MenuItem>
                    </Select>
                </FormControl>


                </div>
                <div>
                    <button type="button" class="btn px-5 btn-success" data-toggle="modal" data-target="#addModal">+</button>
                </div>

                <div className="modal fade" id="addModal" tabIndex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add new Patient!</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="modal-body">
                            <form>

                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" value={newName}  onChange={(e) => setNewName(e.target.value)} className="form-control"  aria-describedby="nameInput" required />
                            </div>
                            <div className="form-group">
                                <label>Age</label>
                                <input type="Number" value={age}  onChange={(e) => setAge( e.target.value)} className="form-control"  aria-describedby="emailInput" required />
                            </div> 

                            <div className="form-group">
                            <label>Gender</label>
                                <select value={gender} className="form-control" onChange={(e) => setGender( e.target.value)}>
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <button  type="submit" className="btn btn-primary mx-2" onClick={handleAdd} data-dismiss="modal">Save changes</button>
                            <button type="button" className="btn btn-secondary mx-2" data-dismiss="modal">Close</button>
                            </form>
                        </div>

                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-center m-2">
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        {arr.map((element,ind)=>{
                            return (
                                <li class="page-item"><a class="page-link" onClick={()=>setPage(ind+1)}>{ind+1}</a></li>
                                )
                            })}
                    </ul>
                </nav>
                </div>

            
            <div className="row">

            { data && data
            .filter((item,i)=>{
                if(name ==""){
                    return true
                }
                else{
                    return item.name.toLowerCase().includes(name.toLowerCase())
                }
            })
            .sort((a,b)=>{
                if(sort=="none"){
                    return 0
                }
                else if(sort=="asc"){
                    return a.age-b.age
                }
                else{
                    return b.age-a.age
                }
            })
            .map((item,i,arr)=>{
                if(total!==arr.length){
                    setTotal(arr.length)
                }
                return item
            })
            .slice(startIndex,endIndex)
            .map((item,i) => (
                
                <div className=" col-lg-6 " key={item._id}>
                        <div className="card m-2">

                            <div className="row no-gutters">
                                <div className="col-md-4 px-3 d-flex align-items-center">
                                    <img src={`https://i.pravatar.cc/300?img=${Math.floor(Math.random() * 50)}`}className="card-img" alt="img"/>
                                </div>

                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h4 className="card-title">{item.name}</h4>
                                        <table className="table table-striped text-break">
                                            <tbody>
                                                <tr>
                                                    <th scope="row">Gender</th>
                                                    <td>{item.gender}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Age</th>
                                                    <td>{item.age}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Total Medicines</th>
                                                    <td>{ Object.keys(item.medicine).length}</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <div>
                                            <button type="button" className="btn btn-danger mx-2 my-1" onClick={()=>handleDelete(item._id)}>Delete</button>
                                            <button type="button" className="btn btn-warning mx-2 my-1" onClick={()=>handleDetails(item)} >Show Details</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>))
            }
            </div>
            </div>
            )

        }
