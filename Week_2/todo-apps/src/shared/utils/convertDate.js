export function converDateToDate(str){
    const date = new Date(str).toISOString().split('T')[0]
    return date;
}