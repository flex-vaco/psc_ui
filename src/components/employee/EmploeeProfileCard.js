import { useEffect, useState } from "react";
import axios from 'axios'
import Swal from "sweetalert2";

function EmployeeProfileCard(props) {
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
        setAvailability((40 - props.employee.alc_per_week)) 
    },[props.employee.emp_id])

    useEffect(()=> {
        setDisplayStatus(availability >= props.availability);
    },[availability])

    return (<> {displayStatus && (
        <div className="col-6 col-lg-3 float-left my-1 ps-1 pe-1 cursor" onClick={(e) => props.handleProfileClick(props.employee.emp_id)}> 
        <div className="col-12 col-lg-12 mx-0 mb-2 card_spacing">
            <div className="card card_height">
                <img className="card-img-top justify-content-center align-items-center"src={`${process.env.REACT_APP_API_BASE_URL}/uploads/profile_picture/${props.employee.profile_picture ? props.employee.profile_picture : 'profile_picture-default.png'}`} alt="Card image cap"/>
                <div className="media">
                    <img src={`${process.env.REACT_APP_API_BASE_URL}/uploads/profile_picture/${props.employee.profile_picture ? props.employee.profile_picture : 'profile_picture-default.png'}`}  className="mr-3 rounded-pill"/>
                    <div className="media-body">
                        <h6 className="mt-2 mb-0">{props.employee.first_name} {props.employee.last_name}</h6>
                        <div className="d-flex flex-row justify-content-between align-text-center">
                            <small className="text-muted">{props.employee.designation}</small>
                        </div>
                    </div>
                </div>
                <div className="card-body p-1 ps-3">
                    <p className="card-text m-0">Location: {props.employee.office_location_city} </p>
                    <p className="card-text m-0">Availability: <span className={availability > 0 ? 'text-success fw-bold': 'text-danger'}>{availability}  Hrs./week</span></p>
                    <p className="card-text m-0">Expirence: {props.employee.total_work_experience_years} years</p>
                    <p className="card-text m-0">STARTING AT: <b>${props.employee.rate_per_hour} PER HOUR </b></p> 
                </div>
            </div>
        </div>
        </div>
    )
    }</>)
}

export default EmployeeProfileCard;