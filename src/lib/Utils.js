
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
