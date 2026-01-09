import axios from "axios";

const api = "http://localhost:3000/ranking/tranco";

//for single domain
export async function fetchsingledomain(domain){
    const result = await axios.get(api,{
        params:{
            domain
        },
    });
   return result.data;
}
//for multiple domain
export async function fetchmultdomain(domains){
   // const domainsArray = domains.join(','); backend handles the array conversion of strings
    const result = await axios.get(api+"/multi",{
        params:{
            domains
        },
    });
    console.log(result.data);
    return result.data;
    
}