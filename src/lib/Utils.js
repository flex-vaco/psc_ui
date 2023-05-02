import Swal from 'sweetalert2'

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

export const validateUploadFile = (file, fileFor) => {
    let validFile = true;
    if (!file || !fileFor){
        console.error("Usage: validateUploadFile(file: <uploadFile>, fileFor: <string>)");
        validFile = false;
    } 
    const size = file.size;
    const name = file.name;
    const type = file.type?.split('/')[1]?.trim();
    const maxAllowedUploadSize = 3e6; //3MB

    let allowedFileTypes = [];
    switch (fileFor) {
        case "image":
            allowedFileTypes = ["png", "jpg", "jpeg"];
            break;
        case "resume":
            allowedFileTypes = ["pdf"];
            break;
        default:
            allowedFileTypes = [];
    }

    if ((!size && isNaN(size)) || (size > maxAllowedUploadSize)){ // should not be greated than 1MB
        Swal.fire({
            icon: 'error',
            title: 'Invalid File',
            text: 'Please ensure file size is less than 3MB',
            showConfirmButton: true
        });
        validFile = false;
    } 
    if(!allowedFileTypes.includes(type)){
        Swal.fire({
            icon: 'error',
            title: `Invalid File-type: ${type}`,
            text: `Valid types for ${fileFor} include: ${allowedFileTypes}`,
            showConfirmButton: true
        });
        validFile = false;
    } 
    return validFile;
};

