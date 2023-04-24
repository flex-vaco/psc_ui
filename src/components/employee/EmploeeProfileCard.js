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
        <a  href={props.employee.resume ?`${process.env.REACT_APP_API_BASE_URL}/uploads/resume/${props.employee.resume}`:null} onClick={handleResumeClick} target="_blank" className="a_underline">
                  
    
         <div className="col-12 col-lg-12 mx-0 mb-2">
            <div className="card card_height">
        
                <img className="card-img-top justify-content-center align-items-center"src={`${process.env.REACT_APP_API_BASE_URL}/uploads/profile_picture/${props.employee.profile_picture ? props.employee.profile_picture : 'profile_picture-default.png'}`} alt="Card image cap"/>
                <div className="media">
                    <img src={`${process.env.REACT_APP_API_BASE_URL}/uploads/profile_picture/${props.employee.profile_picture ? props.employee.profile_picture : 'profile_picture-default.png'}`}  class="mr-3 rounded-pill"/>
                    <div class="media-body">
                        <h6 class="mt-2 mb-0">{props.employee.first_name} {props.employee.last_name}</h6>
                        <div class="d-flex flex-row justify-content-between align-text-center">
                            <small class="text-muted">{props.employee.role}</small>
                        </div>
                    </div>
                </div>
                <div className="card-body p-1 ps-3">
                    <p className="card-text m-0">Location: {props.employee.office_location_city} </p>
                    <p className="card-text m-0">{ availability > 0 && `Availability: ${availability *  5} Hrs/week` }</p>
                    <p className="card-text m-0">Expirence: {props.employee.total_work_experience_years} years</p>
                    <p className="card-text m-0 pb-1">STARTING AT: <b>${props.employee.rate_per_hour} PER HOUR </b></p>
                                 
                        
                       
                </div>
            </div>
        </div>
        </a>
    )
    }</>)
}

export default EmployeeProfileCard;