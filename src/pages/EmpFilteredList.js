import React,{ useState, useEffect} from 'react'
import { Link, useParams } from "react-router-dom"
import axios from 'axios'
import Layout from "../components/Layout"
import EmployeeProfileCard from '../components/employee/EmploeeProfileCard'

 
function EmpFilteredList() {
    const [empList, setEmpList] = useState([])
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedExp, setSelectedExp] = useState('');
    const [skill, setSkill] = useState(useParams().searchSkill);

    console.log(useParams().searchSkill);

    useEffect(() => {
        fetchEmpList()
    },[selectedLocation, selectedExp, selectedRole, skill])
     
    const fetchEmpList = () => {
        //axios.get(`employees/filter/${skill}/${selectedLocation}/${selectedExp}`
        axios.get(`employees/filter`, {
            params : {
              skill: skill,
              exp: selectedExp,
              location: selectedLocation,
              role: selectedRole
            }
        }
        )
        .then(function (response)   {
          setEmpList(response.data.employees);
          console.log(response.data.employees);
          console.log(skill);
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  
 
  
    return (
        <Layout>
           <div className="container-fluid">
            <h2 className="text-center mt-5 mb-3">Listing Page</h2>
            
            <form className="row g-3">
            <div className="col-6">
                <input placeholder='Skill'
                            onChange={(event)=>{setSkill(event.target.value)}}
                            value={skill}
                            type="text"
                            className="form-control "
                            id="skill"
                            name="skill"/>
                </div>
                <div className="col-6">
                <input placeholder='Role'
                            onChange={(event)=>{setSelectedRole(event.target.value)}}
                            type="text"
                            className="form-control "
                            id="role"
                            name="role"/>
                </div>
                <div className="col-6">
                <input placeholder='Location'
                                    onChange={(event)=>{setSelectedLocation(event.target.value)}}
                                    type="text"
                                    className="form-control"
                                    id="location"
                                    name="location"/>
                </div>
                <div className="col-6">
                    <input placeholder='Experience'
                                    onChange={(event)=>{setSelectedExp(event.target.value)}}
                                    type="text"
                                    className="form-control"
                                    id="exp"
                                    name="exp"/>
                    
                </div>
                <div className="col-12">
                    <div className="card">
                        
                        <div className="card-body">
                
                            <table className="table">
                            
                            
                                <tbody>
                                    
                                    {empList.map((empDetails, key)=>{
                                        return (
                                    
                                        <EmployeeProfileCard employee={empDetails}></EmployeeProfileCard>
                                        )
                                    
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </form>
            </div>
        </Layout>
    );
}
  
export default EmpFilteredList;