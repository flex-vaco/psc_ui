import React from "react";
import Modal from 'react-modal';
import * as Utils from "../../lib/Utils"

const EmployeeProfileModal = (props) => {

    const [modalIsOpen, setIsOpen] = React.useState(props.modalIsOpen);
    const [hideAddInListBtn, setHideAddInListBtn] = React.useState(props.hideAddInListBtn || false);
    const [hideHireBtn, setHideHireBtn] = React.useState(props.hideHireBtn || false);


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
                    <div className="col-3 col-lg-8 float-left">
                        <button onClick={props.close} className="btn btn-primary btn-xs exitarrow"><i className="bi bi-box-arrow-left"></i></button>
                    </div>
                    <div className="col-9 col-lg-4 float-left">
                        <div className="col-5 col-lg-4 float-left" hidden={hideAddInListBtn}>
                            <button className="btn btn-primary btn-xs add_in_list">Add In List</button>
                        </div>
                        <div className="col-3 col-lg-4 float-left">
                            <a href={(props.employee.resume) ?
                                `${process.env.REACT_APP_API_BASE_URL}/uploads/resume/${props.employee.resume}` : null}
                                target="_blank" className="btn btn-primary btn-xs add_in_list">Resume</a>
                        </div>

                        <div className="col-3 col-lg-4 float-right" hidden={hideHireBtn}>
                            <button className="btn btn-primary btn-xs hire">Hire</button>
                        </div>
                    </div>
                </div>
                <div className="col-12 float-left mt-5">
                    <div className="col-9 float-left">
                        <div id="right-side">
                            <div className="adiv">
                                <img src={`${process.env.REACT_APP_API_BASE_URL}/uploads/profile_picture/${props.employee.profile_picture ? props.employee.profile_picture : 'profile_picture-default.png'}`} id="profilepic" />
                                <span className="ms-3">{props.employee.first_name} {props.employee.last_name}<br /> Location: {props.employee.office_location_city}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-3 float-left text-right">
                        <div className="hours_size">${props.employee.rate_per_hour} PER HOUR </div>
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
                            <p><b className="text-muted">Manager Name: </b>{props.employee.manager_name}</p>
                            <p><b className="text-muted">Manager Email: </b>{props.employee.manager_email}</p>
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