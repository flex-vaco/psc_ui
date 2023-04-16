function EmployeeProfileCard(props) {
    return (
        <div class="col-md-4 mt-4">
            <div class="card p-4">
            
                    <img class="card-img-top d-flex flex-column justify-content-center align-items-center" src="https://images.unsplash.com/photo-1517832207067-4db24a2ae47c" alt="Card image cap"/>
            
                <div className="card-body">
                    <h4><b>{props.employee.first_name}, {props.employee.role}</b></h4>
                        <p className="card-text m-0">Exp: {props.employee.total_work_experience_years} years</p>
                        <p className="card-text m-0">Location: {props.employee.office_location_city} </p>
                        <p className="card-text m-0">Rate: ${props.employee.rate_per_hour}/hour </p>
                        <a  href={`${process.env.REACT_APP_API_BASE_URL}/uploads/resume/${props.employee.resume}`} target="_blank" className="btn btn-outline-info btn-sm mt-3 mx-1">
                        View Resume            
                        </a>
                </div>
            </div>
        </div>
    )
}

export default EmployeeProfileCard;