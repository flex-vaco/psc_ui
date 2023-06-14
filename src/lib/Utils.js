
export const formatDateYYYYMMDD = (givenDate) => {
    var myDate = new Date(givenDate);
    let dd = myDate.getDate();
    dd = dd < 10 ? "0" + dd.toString() : dd.toString();
    let mm = myDate.getMonth() + 1; // add 1 as month start from 0
    mm = mm < 10 ? "0" + mm.toString() : mm.toString();
    const yyyy = myDate.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
};
export const formatDateDDMM = (givenDate) => {
    var myDate = new Date(givenDate);
    let dd = myDate.getDate();
    dd = dd < 10 ? "0" + dd.toString() : dd.toString();
    let mm = myDate.getMonth() + 1; // add 1 as month start from 0
    mm = mm < 10 ? "0" + mm.toString() : mm.toString();
    const yyyy = myDate.getFullYear();
    return `${dd}-${mm}`;
};
export const formatDateDDMMNAME = (givenDate) => {
    var myDate = new Date(givenDate);
    let dd = myDate.getDate();
    dd = dd < 10 ? "0" + dd.toString() : dd.toString();
    let month =  myDate.toLocaleString('default', { month: 'short' });
    let mm = month.toLocaleString('en-US', {
        month: 'long',
      });
    //mm = mm < 10 ? "0" + mm.toString() : mm.toString();
    const yyyy = myDate.getFullYear();
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