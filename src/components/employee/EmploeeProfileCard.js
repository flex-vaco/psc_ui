function EmployeeProfileCard(props) {
    return (
        <div className="card mb-3" key={props.employee.id}>
        <div className="card-body">
        <h4>{props.employee.first_name}, {props.employee.role}</h4>
        <p className="card-text m-0">Exp: {props.employee.total_work_experience_years} years</p>
        <p className="card-text m-0">Location: {props.employee.office_location_city} </p>
        <p className="card-text m-0">Rate: ${props.employee.rate_per_hour}/hour </p>

        <div className="btn-toolbar pull-right">
            <button type="button" className="btn btn-outline-primary btn-sm mt-3 mx-1">Book</button>

            <button type="button" className="btn btn-outline-info btn-sm mt-3 mx-1">View Resume</button>

            <button type="button" className="btn  btn-outline-secondary btn-sm mt-3 mx-1">Get in touch</button>
        </div>
        </div>
    </div>
    )
}

export default EmployeeProfileCard;