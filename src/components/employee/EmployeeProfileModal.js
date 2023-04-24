import React, { useEffect, useState } from "react";
import axios from 'axios'
import moment from 'moment';
import Swal from "sweetalert2";
import Modal from 'react-modal';
import * as Utils from "../../lib/Utils"

function EmployeeProfileModal(props) {
let subtitle;
  
// Modal.setAppElement('banner_background');
const [modalIsOpen, setIsOpen] = React.useState(props.modalIsOpen);


  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Modal
    isOpen={props.modelstatus}
    onRequestClose={closeModal}
    ariaHideApp={false}
  >
    <div>
        <div className="col-12 float-left">
            <div className="col-6 col-lg-8 float-left">
                <button onClick={props.close} className="btn btn-primary btn-xs exitarrow"><i class="bi bi-box-arrow-left"></i></button>
            </div>
            <div className="col-6 col-lg-4 float-left">
                <div className="col-8 col-lg-4 float-left">
                    <button className="btn btn-primary btn-xs add_in_list">Add In List</button>
                </div>
                <div className="col-4 col-lg-4 float-left">
                <button className="btn btn-primary btn-xs hire">Hire</button>
                </div>
            </div>
        </div>
        <div className="col-12 float-left mt-5">
            <div className="col-9 float-left">
                <div id="right-side">
                    <div class="adiv">
                        
                            <img  src={`${process.env.REACT_APP_API_BASE_URL}/uploads/profile_picture/${props.employee.profile_picture ? props.employee.profile_picture : 'profile_picture-default.png'}`}  id="profilepic" />
                            {props.employee.first_name} {props.employee.last_name}<br/> Loation: {props.employee.office_location_city}
                        
                    </div>
                </div>
            </div>
            <div className="col-3 float-left text-right">
                <div class="hours_size">${props.employee.rate_per_hour} PER HOUR </div>
            </div>
        </div>
        <div className="col-12 float-left mt-5">
            <div className="col-12 col-lg-6 float-left">
                <div className="col-12">
                    <p><b className="text-muted">Email: </b>{props.employee.email}</p>
                    <p><b className="text-muted">Role: </b>{props.employee.role}</p>
                    <p><b className="text-muted">Experience: </b>{props.employee.total_work_experience_years} years</p>
                    <p><b className="text-muted">Rate/HR: </b>{props.employee.rate_per_hour} USD</p>
                    <p><b className="text-muted">Vaco Joining Date: </b>{Utils.formatDateYYYYMMDD(props.employee.vaco_join_date)}</p>
                    <p><b className="text-muted">Home Location: </b>{props.employee.home_location_city}</p>
                    <p><b className="text-muted">Office Location: </b>{props.employee.office_location_city}</p>
                    <p><b className="text-muted">Supervisor Name: </b>{props.employee.supervisor_name}</p>
                    <p><b className="text-muted">Supervisor Email: </b>{props.employee.supervisor_email}</p>
                    <p><b className="text-muted">Is working On-site? </b>{(props.employee.is_onsite) ? "YES" : "NO"}</p>
                </div>
                <div className="col-12 education_details">
                    <b>Education</b>
                    <p>{props.employee.education}</p>
                    
                </div>
            </div>
            <div className="col-12 col-lg-6 float-left">
                <div className="col-12">
                    <h4 className="role_heading">{props.employee.role}</h4>
                    <p>{props.employee.profile_information}</p>
                </div>
                <div className="col-12">
                    <h4 className="role_heading">Skills</h4>
                    <p>{props.employee.primary_skills}, {props.employee.secondary_skills}</p>
                </div>
            </div>
        </div>
    </div>
    
  </Modal>

  )
}

export default EmployeeProfileModal;