
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
    do {
        const newDt = new Date(myDate.setDate(myDate.getDate() + 1));
        dates = [...dates, newDt.toDateString()];
    }
    while (myDate < new Date(enDt));
    return (dates);
}