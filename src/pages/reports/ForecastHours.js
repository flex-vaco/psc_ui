import React,{ useState, useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../../components/Layout"
import * as Utils from "../../lib/Utils"
import DataTable from 'react-data-table-component';
import { Select, MenuItem, toggleButtonGroupClasses } from "@mui/material";
import MUIDataTable from "mui-datatables";

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
            { name: 'Client',
            options: {
              filter: true,
              customFilterListOptions: { render: v => `Client: ${v}` },
              
           }},
            { name: 'Project',
              options: {
                filter: true,
                customFilterListOptions: { render: v => `Project: ${v}` },
               
              }},
            { name: 'Skill',
              options: {
                filter: true,
                customFilterListOptions: { render: v => `Skill: ${v}` },
                
            }},
            { name: 'Name',
            options: {
              filter: true,
              customFilterListOptions: { render: v => `Name: ${v}` },
            }},
          ];
          mondays.forEach((monday, index, array) => { 
            const obj ={ name: Utils.formatDateDDMM(monday),
            options: {
              filter: false,
            } };
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

            let my_object = [];
            my_object.push(forecastDetail.clientDetails.name) ;
            my_object.push(forecastDetail.projectDetails.project_name) ;
            my_object.push(forecastDetail.empDetails.first_name+','+forecastDetail.empDetails.last_name);
            my_object.push(forecastDetail.empDetails.primary_skills);

            mondays.forEach((monday, index, array) => { 

              if(weeks.indexOf(monday) !== -1)  
              {  
                var indexvalue = weeks.indexOf(monday);
                my_object.push(empHours[indexvalue]);
              }   
              else  
              {  
                my_object.push('-')
              }  
            })
            
            obj3.push(my_object);
            data.push(obj3[0]);
          });
          setColumnsData(data);
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    const options = {
      filter: true,
      onFilterChange: (changedColumn, filterList) => {
        console.log(changedColumn, filterList);
      },
      selectableRows: 'multiple',
      filterType: 'dropdown',
      responsive: 'vertical',
      rowsPerPage: 10,
      selectableRows: false,
      downloadOptions: {
        filename: 'tableDownload.csv',
        separator: ',',
        filterOptions: {
          useDisplayedColumnsOnly: true | true,
          useDisplayedRowsOnly: true | true
        }
      },
      print: false
    };
    return (
      <Layout>
        <div className="container-fluid">
          <div className="card w-auto">
            <div className="card-header">
              <h4 className="text-center">Forecasted Hours</h4>
            </div>
            <div className="card-body">
              <MUIDataTable data={data} columns={columns} options={options} />
            </div>
          </div>
        </div>
      </Layout>
    );
}
  
export default ForecastHours;