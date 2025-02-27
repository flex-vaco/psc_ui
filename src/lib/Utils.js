import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";

export const formatDateYYYYMMDD = (givenDate) => {
    let myDate = new Date(givenDate);
    let dd = myDate.getDate();
    dd = dd < 10 ? "0" + dd.toString() : dd.toString();
    let mm = myDate.getMonth() + 1; // add 1 as month start from 0
    mm = mm < 10 ? "0" + mm.toString() : mm.toString();
    const yyyy = myDate.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
};

export const formatDateTime = (givenDate) => {
    let myDate = new Date(givenDate);
    let dd = myDate.getDate();
    dd = dd < 10 ? "0" + dd.toString() : dd.toString();
    let mm = myDate.getMonth() + 1;
    mm = mm < 10 ? "0" + mm.toString() : mm.toString();
    const yyyy = myDate.getFullYear();
    
    let hours = myDate.getHours();
    hours = hours < 10 ? "0" + hours.toString() : hours.toString();
    
    let minutes = myDate.getMinutes();
    minutes = minutes < 10 ? "0" + minutes.toString() : minutes.toString();
    
    let seconds = myDate.getSeconds();
    seconds = seconds < 10 ? "0" + seconds.toString() : seconds.toString();

    return `${yyyy}-${mm}-${dd} ${hours}:${minutes}:${seconds}`;
};

export const formatDateDDMM = (givenDate) => {
    let myDate = new Date(givenDate);
    let dd = myDate.getDate();
    dd = dd < 10 ? "0" + dd.toString() : dd.toString();
    let mm = myDate.getMonth() + 1; // add 1 as month start from 0
    mm = mm < 10 ? "0" + mm.toString() : mm.toString();
    return `${dd}-${mm}`;
};
export const formatDateDDMMNAME = (givenDate) => {
    let myDate = new Date(givenDate);
    let dd = myDate.getDate();
    dd = dd < 10 ? "0" + dd.toString() : dd.toString();
    let month =  myDate.toLocaleString('default', { month: 'short' });
    let mm = month.toLocaleString('en-US', {
        month: 'long',
      });
    return `${dd} ${mm}`;
};

// function to generate random strings
export const generateRandomString = (length) => {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export const getStartEndDatesCurrentMonth = () => {
    const today = new Date();

    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const endDate = new Date(currentYear, currentMonth + 1, 0);

    // Format the start and end dates as strings (YYYY-MM-DD)
    const startDateString = currentYear + '-' + (currentMonth + 1).toString().padStart(2, '0') + '-01';
    const endDateString = currentYear + '-' + (currentMonth + 1).toString().padStart(2, '0') + '-' + endDate.getDate().toString().padStart(2, '0');

    return { monthStartDate: startDateString, monthEndDate: endDateString }
}

export const getDatesBetween = (stDt, enDt) => {
    let myDate = new Date(stDt);
    let dates = [myDate.toDateString()];
    while (myDate < new Date(enDt)) {
        const newDt = new Date(myDate.setDate(myDate.getDate() + 1));
        dates = [...dates, newDt.toDateString()];
    } ;
    return (dates);
}

export const getStartEndDatesCurrentWeek = () =>{
    const todayF = new Date();
    const todayL = new Date(); // Need new variable as date changes with setDate
    const first = todayF.getDate() - todayF.getDay();  
    const last = first + 6; // last day is the first day + 6   
    const firstday = new Date(todayF.setDate(first)).toString();   
    const lastday = new Date(todayL.setDate(last)).toString();
    return {weekStartDate: firstday, weekEndDate: lastday};
}

export const getStartEndDatesPreviousWeek = (givenDate = new Date()) =>{
   
    const previous = new Date(givenDate.getTime());
    previous.setDate(givenDate.getDate() - 7);

    const first = previous.getDate() - previous.getDay(); // First day is the  day of the month - the day of the week  
    const last = first + 6; // last day is the first day + 6   
    const firstday = new Date(previous.setDate(first)).toString();   
    const lastday = new Date(previous.setDate(last)).toString();
    return {prevWeekStartDate: firstday, prevWeekEndDate: lastday};
}

export const getStartEndDatesNextWeek = (givenDate = new Date()) =>{
   
    const previous = new Date(givenDate.getTime());
    previous.setDate(givenDate.getDate() + 7);

    const first = previous.getDate() - previous.getDay(); // First day is the  day of the month - the day of the week  
    const last = first + 6; // last day is the first day + 6   
    const firstday = new Date(previous.setDate(first)).toString();   
    const lastday = new Date(previous.setDate(last)).toString();
    return {nextWeekStartDate: firstday, nextWeekEndDate: lastday};
}

export const getGreaterDate = (d1, d2) => {
    let date1 = new Date(d1).getTime();
    let date2 = new Date(d2).getTime();
  
    if (date1 < date2) {
        return d2;
    } else if (date1 > date2) {
        return d1;
    } else {
        return null
    }
};

export const exportTableToExcel = (tableID, filename = '') => {
    let downloadLink;
    let fileType = 'application/vnd.ms-excel';
    let tableElement = document.getElementById(tableID);
    let tableHTML = encodeURIComponent(tableElement.outerHTML);

    // Specify file name
    filename = filename ? filename + '.xls' : 'excel_data.xls';

    // Create download link element
    downloadLink = document.createElement("a");
    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
        let blob = new Blob(['\ufeff', tableHTML], {
            type: fileType
        });
        navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        // Create a link to the file
        downloadLink.href = 'data:' + fileType + ', ' + tableHTML;
        // Setting the file name
        downloadLink.download = filename;
        //triggering the function
        downloadLink.click();
    }
};
  
export const firstDateIsGreaterOrEqual = (d1, d2) => {
    let date1 = new Date(d1).getTime();
    let date2 = new Date(d2).getTime();
  
    if (date1 >= date2) {
        return true;
    } else {
        return false;
    }
};

export const firstDateIsLessOrEqual = (d1, d2) => {
    let date1 = new Date(d1).getTime();
    let date2 = new Date(d2).getTime();
  
    if (date1 <= date2) {
        return true;
    } else {
        return false;
    }
};

const saveWorksheetToExcel = (worksheet, fileName) => {
    const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
    //XLSX.utils.book_append_sheet(workbook, worksheet, "Dates"); // Add worksheet to workbook
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
}

export const exportDataToExcel = ({ apiData, fileName }) => {

    if (apiData.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Data Not found!",
            confirmButtonColor: "#0e4372",
            showConfirmButton: true,
        }).then((res) => {
            if (res.isConfirmed) {
                return;
            }
        });
    } else {
        const ws = XLSX.utils.json_to_sheet(apiData);
        saveWorksheetToExcel(ws, fileName);
    }
};

const deleteColumnWithHeader = ({tableId, colHeadsToDelete=[]}) => {
    //  get the HTML table
    const table = document.getElementById(tableId);
    // get header row
    const headerRow = table.getElementsByTagName('tr')[0];
    // get headers
    const headers = headerRow.getElementsByTagName('th');

    colHeadsToDelete.forEach((headerName) => {
        let columnIndex = -1;
        // find column index
        for (let i = 0; i < headers.length; i++) {
            if (headers[i].innerHTML === headerName) {
                columnIndex = i;
                break;
            }
        }
        // use column index to delete cells
        if (columnIndex >= 0) {
            var rowCount = table.rows.length;
            for (var i = 0; i < rowCount; i++) {
                table.rows[i].deleteCell(columnIndex);
            }
        }
    });
}

export const exportHTMLTableToExcel = async (tableId, fileName, colsToIgnore=["Action"]) => {
    const tableElement = document.getElementById(tableId);

    if (!tableElement) {
        Swal.fire({
            icon: "error",
            title: `HTML Table Not found with id: "${tableId}"!`,
            confirmButtonColor: "#0e4372",
            showConfirmButton: true,
        }).then((res) => {
            if (res.isConfirmed) {
                return;
            }
        });
    } else {
        deleteColumnWithHeader({tableId, colHeadsToDelete: colsToIgnore}); //we don't need action column in excel
        const worksheet = XLSX.utils.table_to_sheet(tableElement);
        await saveWorksheetToExcel(worksheet, fileName);
        window.location.reload(true); //reload the page to get the action column back
    }
};

export const isValidPhoneNum = (phoneNum) => {
    const phoneNumRegex = /^[0-9]{10}$/;
    return phoneNumRegex.test(phoneNum);
}

export const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    return emailRegex.test(email);
}

//function to find shortest path between two nodes in a graph
export const findShortestPath = (graph, startNode, endNode) => {
    // create a queue which will store path(s) of type Array
    let queue = [];
    // path starts from startNode
    queue.push([startNode]);
    while (queue.length > 0) {
        // get the path from the queue
        let path = queue.shift();
        // get the last node from the path
        let node = path[path.length - 1];
        // path found
        if (node === endNode) {
            return path;
        }
        // go through all neighbour nodes, construct a new path and
        // push it into the queue
        for (let i = 0; i < graph[node].length; i++) {
            let newPath = [...path];
            newPath.push(graph[node][i]);
            queue.push(newPath);
        }
    }
}

//write function to test findShortestPath function
export const testFindShortestPath = () => {
    const graph = {
        A: ["B", "C"],
        B: ["A", "D", "E"],
        C: ["A", "F"],
        D: ["B"],
        E: ["B", "F"],
        F: ["C", "E"],
    };
    const startNode = "A";
    const endNode = "E";
    const shortestPath = findShortestPath(graph, startNode, endNode);
    console.log("shortestPath: ", shortestPath);
}


