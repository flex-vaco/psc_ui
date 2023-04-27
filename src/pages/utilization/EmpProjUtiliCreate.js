import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../../components/Layout"
import * as Utils from "../../lib/Utils"
 
 
function EmpProjUtiliCreate() {
    const [emp_id, setEmpId] = useState('');
    const [project_id, setProjectId] = useState('');
    const [week_starting, setWeekStart] = useState('');
    const [proj_hours_per_week, setProjPerWeek] = useState('');
    const [allc_work_hours_per_week, setAllcPerWeek] = useState('');
    const [forecast_hours_per_week, setForecastPerWeek] = useState('');
    const [pto_hours_per_week, setPtoPerWeek] = useState('');

    const [isSaving, setIsSaving] = useState(false)
    const navigate = useNavigate();

    const  [empList, setEmpList] = useState([])
    const  [projectList, setProjectList] = useState([])
    const [minValue, setMinValue] = useState();
    const [maxValue, setMaxValue] = useState();

    useEffect(() => {
        fetchProjList();
    }, [])
  
    const fetchEmpProjAloc = (emp_id ,project_id) => {
        axios.post(`/empPrjAloc/project_employees_alloc`, {
                emp_id : emp_id,
                project_id: project_id
        })
        .then(function (response) {
            console.log(response.data.allocations[0]['start_date']);
            
            setMinValue(Utils.formatDateYYYYMMDD(response.data.allocations[0]['start_date']));
            setMaxValue(Utils.formatDateYYYYMMDD(response.data.allocations[0]['end_date']));
        })
        .catch(function (error) {
          console.log(error);
        })
        console.log('hi');
    }

    const fetchEmpList = (project_id) => {
        axios.get(`/empPrjAloc/project-employees/${project_id}`)
        .then(function (response) {
          setEmpList(response.data.employees);
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    const handleEmpChange = (e) => {
        if(e.target.value === "-select-"){
            Swal.fire({
                icon: 'warning',
                title: 'Employee Name is required!',
                showConfirmButton: true
            })
        }
        setEmpId(e.target.value)
        console.log(project_id);
        fetchEmpProjAloc(e.target.value, project_id);
    }

    const handleProjectChange = (e) => {
        if(e.target.value === "-select-"){
            Swal.fire({
                icon: 'warning',
                title: 'Project Name is required!',
                showConfirmButton: true
            })
        }
        setProjectId(e.target.value)
        fetchEmpList(e.target.value);
    }

    const fetchProjList = () => {
        axios.get('/projects')
        .then(function (response) {
          setProjectList(response.data.projects);
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    const handleCancel = () => {
        navigate("/empUtiliList");
    }
    const handleSave = () => {
        Swal.showLoading();
        setIsSaving(true);
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const data = {
            emp_id: emp_id,
            project_id: project_id,
            week_starting: week_starting,
            proj_hours_per_week : proj_hours_per_week,
            allc_work_hours_per_week : allc_work_hours_per_week,
            forecast_hours_per_week :forecast_hours_per_week,
            pto_hours_per_week : pto_hours_per_week, 
        };

        axios.post('/empPrjUtili/add', data, config)
          .then(function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Successfully Saved!',
                showConfirmButton: false,
                timer: 1500
            })
            Swal.hideLoading()
            setIsSaving(false);
            setEmpId('');
            setProjectId('');
            setWeekStart('');
            setProjPerWeek('');
            setAllcPerWeek('');
            setForecastPerWeek('');
            setPtoPerWeek('');
          })
          .catch(function (error) {
            Swal.fire({
                icon: 'error',
                title: 'An Error Occured!',
                showConfirmButton: false,
                timer: 1500
            })
            setIsSaving(false);
          });
    }
  
    return (
        <Layout>
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <h4 className="text-center">Utilization Employee to Project</h4>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="project">Project</label>
                                <select name="project" id="project" className="form-control" onChange={handleProjectChange}> 
                                    <option value="-select-" > -- Select Project -- </option>
                                    {projectList.map((prj) => <option value={prj.project_id}>{prj.project_name}, {prj.project_location}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="employee">Employee Name</label>
                                <select name="employee" id="employee" className="form-control" onChange={handleEmpChange}> 
                                    <option value="-select-"> -- Select Employee -- </option>
                                    {empList.map((emp) => <option value={emp.emp_id}>{emp.first_name}, {emp.last_name}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="week_starting">Week Starting</label>
                                <input 
                                    onChange={(event)=>{setWeekStart(event.target.value)}}
                                    value={week_starting}
                                    type="date"
                                    className="form-control"
                                    id="week_starting"
                                    name="week_starting" 
                                    min={minValue} 
                                    max={maxValue} 
                                    />
                            </div>
                            <div className="form-group">
                                <label htmlFor="proj_hours_per_week">Project Hours per Week</label>
                                <input 
                                    onChange={(event)=>{setProjPerWeek(event.target.value)}}
                                    value={proj_hours_per_week}
                                    type="number"
                                    className="form-control"
                                    id="proj_hours_per_week"
                                    name="proj_hours_per_week"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="allc_work_hours_per_week">Allocation Hours per Week</label>
                                <input 
                                    onChange={(event)=>{setAllcPerWeek(event.target.value)}}
                                    value={allc_work_hours_per_week}
                                    type="number"
                                    className="form-control"
                                    id="allc_work_hours_per_week"
                                    name="allc_work_hours_per_week"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="forecast_hours_per_week">Forecast Hours per Week</label>
                                <input 
                                    onChange={(event)=>{setForecastPerWeek(event.target.value)}}
                                    value={forecast_hours_per_week}
                                    type="number"
                                    className="form-control"
                                    id="forecast_hours_per_week"
                                    name="forecast_hours_per_week"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="pto_hours_per_week">PTO Hours per Week</label>
                                <input 
                                    onChange={(event)=>{setPtoPerWeek(event.target.value)}}
                                    value={pto_hours_per_week}
                                    type="number"
                                    className="form-control"
                                    id="pto_hours_per_week"
                                    name="pto_hours_per_week"/>
                            </div>
                            <button 
                                disabled={isSaving}
                                onClick={handleCancel} 
                                type="submit"
                                className="btn btn-outline-light mt-3 me-3">
                                Cancel
                            </button>
                            <button 
                                disabled={isSaving}
                                onClick={handleSave} 
                                type="submit"
                                className="btn btn-outline-info mt-3">
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
  
export default EmpProjUtiliCreate;