
import React,{useState,useEffect} from 'react'
import { deleteEmployee, listEmployees } from '../Services/EmployeeService'
import { useNavigate } from 'react-router-dom'


const ListEmployeeComponent = () => {

    const [employees,setEmployees] = useState([])

    const navigator = useNavigate();

    useEffect(() =>{
        getAllEmployees();
   
    },[])

    function getAllEmployees(){
        listEmployees().then((response) => {
            setEmployees(response.data);
        }).catch(error => { 
            console.error(error);
        })
    }

    function addNewEmployee(){
        navigator('/add-Employee')

    }

    function updateEmployee(id){
        navigator(`/edit-employee/${id}`)

    }

    function removeEmployee(id){
        console.log(id);

        deleteEmployee(id).then((response) => {
            getAllEmployees();
        }).catch(error =>{
            console.error(error);
        })
    }
  return (
    <div className='container-fluid'>

        <h2 className='text-center'>List of Employees</h2>
        <button className='btn btn-lg btn-outline-secondary mb-2' onClick={addNewEmployee}><i className="bi bi-patch-plus"></i>Add Employee</button>
        <table className='table table-dark table-bordered'>
            <thead>
                <tr>
                    <th>Employee Id</th>                                                                                                                                                                                                                          
                    <th>Employee First Name</th>
                    <th>Employee Last Name</th>
                    <th>Employee Email Id</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                    {
                        employees.map(employee =>
                            <tr className='table-info' key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>
                                    <button className='btn btn-outline-primary' onClick={() => updateEmployee(employee.id)}><i className="bi bi-arrow-repeat"></i>Update</button>
                                    <button className='btn btn-outline-danger' onClick={() => removeEmployee(employee.id)}
                                    style={{marginLeft:'10px'}}><i className="bi bi-trash3"></i>
                                        Delete</button>
                                </td>
                            </tr>)
                    }
                </tbody>
                </table>
    </div>
  )
}

export default ListEmployeeComponent