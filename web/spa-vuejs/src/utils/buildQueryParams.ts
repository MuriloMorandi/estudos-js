export const buildQueryParams = (parameters:{ [key:string]: string | number | boolean })=>{
    const ret = new URLSearchParams();

    Object.entries(parameters).forEach( e => {
        ret.append(e[0], String(e[1]))
    });

    return ret;
}