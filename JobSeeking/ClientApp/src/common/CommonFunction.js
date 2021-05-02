export default function GetDateCurrentFormat(typeFormat){
    var d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

if (month.length < 2) 
    month = '0' + month;
if (day.length < 2) 
    day = '0' + day;

return [year, month, day].join('-');
}
export function IsObjectEmpty(obj){
    if(obj && Object.keys(obj).length === 0 && obj.constructor === Object){
        return false;
    }
    return true;
}