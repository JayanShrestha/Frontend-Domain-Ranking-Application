import axios from "axios";

//const api = "http://localhost:3000/ranking/tranco";

const API_BASE_URL = import.meta.env.VITE_API_URL;

//for single domain
export async function fetchsingledomain(domain){
    //const result = await axios.get(api,{
      //  params:{
        //    domain
        //},
    //});
   //return result.data;
   const response = await fetch(`${API_BASE_URL}/ranking/tranco?domain=${encodeURIComponent(domain)}`);
  return response.json();

}
//for multiple domain
export async function fetchmultdomain(domains){
   // const domainsArray = domains.join(','); backend handles the array conversion of strings
    //const result = await axios.get(api+"/multi",{
        //params:{
        //    domains
      //  },
    //});
  //  return result.data;
    const response = await fetch(`${API_BASE_URL}/ranking/tranco/multi?domains=${encodeURIComponent(domains)}`);
  return response.json();

}