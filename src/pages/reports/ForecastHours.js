import React,{ useState, useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../../components/Layout"
import * as Utils from "../../lib/Utils"
import DataTable from 'react-data-table-component';

function ForecastHours() {
    const  [columns , setColumnsConfigs] = useState([])
    const  [data , setColumnsData] = useState([])

    const getMondays = (startDate, endDate) => {
    const mondays = [];
      
      // Set the start date to the first Monday on or after the provided start date
      startDate = new Date(startDate.getTime());
      startDate.setDate(startDate.getDate() + (8 - startDate.getDay()) % 7);
    
      // Iterate over each Monday between the start and end dates
      while (startDate < endDate) {
        var monday = new Date(startDate.getTime());
        mondays.push(Utils.formatDateYYYYMMDD(monday));
        startDate.setDate(startDate.getDate() + 7);
      }
      return mondays;
    }
    
    useEffect(() => {
        fetchforecastHours()
    }, [])
    
    const url = "reports/forecastHours";
    
    const fetchforecastHours = () => {
        axios.get(`/${url}`)
        .then(function (response) {
          var mondays = getMondays(new Date(response.data.finalDates[0]['startDate']), new Date(response.data.finalDates[0]['endDate']));
          let columnsConfigs = [
            { name: 'Project', selector: 'project',  filterable: true },
            { name: 'Skill', selector: 'skill' },
            { name: 'Name', selector: 'name',  filterable: true },
          ];
          mondays.forEach((monday, index, array) => { 
            const obj ={ name: Utils.formatDateDDMM(monday), selector: Utils.formatDateDDMM(monday) };
            columnsConfigs.push(obj);
          })
          
          setColumnsConfigs(columnsConfigs);
          
          var forecastDetails = response.data.empForecastResults;
          const data = [];

          forecastDetails.forEach((forecastDetail, idx) => {
            const weeks = forecastDetail.weeksStarting.split(",");
            const empHours = forecastDetail.forecast.split(",");
            // our object array
            let obj3 = [];

            let my_object = {}; 
            my_object.id = idx;
            my_object.project = forecastDetail.projectDetails.client_name ;
            my_object.name = forecastDetail.empDetails.first_name+','+forecastDetail.empDetails.last_name;
            my_object.skill = forecastDetail.empDetails.primary_skills;

            {weeks.map((week, key) => {
              var weekObject = Utils.formatDateDDMM(week);
              my_object[weekObject] = empHours[key];
            })};
            obj3.push(my_object);
            data.push(obj3[0]);
          });
          console.log(data);
          setColumnsData(data);
        })
        .catch(function (error) {
          console.log(error);
        })
    }

    return (
      <Layout>
        <div className="container-fluid">
          <div className="card w-auto">
            <div className="card-header">
              <h4 className="text-center">Forecasted Hours</h4>
            </div>
            <div className="card-body">
              <DataTable
                columns={columns}
                data={data}
                pagination
                highlightOnHover
                paginationRowsPerPageOptions={[2,20,50,100,200]}
                
              />
            </div>
          </div>
        </div>
      </Layout>
    );
}
  
export default ForecastHours;