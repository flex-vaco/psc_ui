import { useEffect, useState } from "react";
import axios from 'axios'
import moment from 'moment';
import Swal from "sweetalert2";


function EmployeeProfileCard(props) {

    const [employeeAllocations, setEmployeeAllocations] = useState([]);
    const [displayStatus, setDisplayStatus] = useState(true);
    const [availability, setAvailability] = useState(0);


    const handleResumeClick = () => {
        if (!props.employee.resume) {
            Swal.fire({
                icon: "error",
                title: `Resume not available`,
                showConfirmButton: false,
                timer: 2000,
            });
        }
    }

    useEffect(()=> {
        fetchEmpAllocation();
    },[])

    useEffect(()=> {
          let totalAllocation = employeeAllocations.filter((aloc) => {
            let endDate = moment(aloc.end_date);
            let currDate = moment();
            return endDate >= currDate;
          }).reduce((value, aloc) => {
            return value = value + aloc.hours_per_day
          },0);
          let availlableTime = 9 - totalAllocation;
          setDisplayStatus((availlableTime) >= props.availability);
          if (availlableTime > 0) {
            setAvailability(availlableTime);
          }
    },[props.availability])
    
    const fetchEmpAllocation = () => {
        axios.get(`/empPrjAloc/empallocation`, {
            params: {
                empid: props.employee.emp_id
            }
        })
        .then(function (response) {
            setEmployeeAllocations(response.data.employee_allocation);
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    return (<> {displayStatus && (
         <div className="col-md-4 mt-4">
            <div className="card p-4">
        
                <img className="card-img-top justify-content-center align-items-center"src={`${process.env.REACT_APP_API_BASE_URL}/uploads/profile_picture/${props.employee.profile_picture ? props.employee.profile_picture : 'profile_picture-default.png'}`} alt="Card image cap"/>
            
                <div className="card-body">
                    <h4><b>{props.employee.first_name}, {props.employee.role}</b></h4>
                        <p className="card-text m-0">Exp: {props.employee.total_work_experience_years} years</p>
                        <p className="card-text m-0">Location: {props.employee.office_location_city} </p>
                        <p className="card-text m-0">Rate: ${props.employee.rate_per_hour}/hour </p>
                                 
                        <p className="card-text m-0">{ availability > 0 && `Availability: ${availability *  5} Hrs/week` }</p>
                        <a  href={props.employee.resume ?`${process.env.REACT_APP_API_BASE_URL}/uploads/resume/${props.employee.resume}`:null} onClick={handleResumeClick} target="_blank" className="btn btn-outline-info btn-sm mt-3 mx-1">
                            View Resume            
                        </a>
                </div>
            </div>
        </div>
    )
    }</>)
}

export default EmployeeProfileCard;