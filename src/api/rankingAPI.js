
const API_BASE_URL = import.meta.env.VITE_API_URL;

//for single domain
export async function fetchsingledomain(domain){
const response = await fetch(`${API_BASE_URL}/ranking/tranco?domain=${encodeURIComponent(domain)}`);
return response.json();

}
//for multiple domain
export async function fetchmultdomain(domains){
const response = await fetch(`${API_BASE_URL}/ranking/tranco/multi?domains=${encodeURIComponent(domains)}`);
return response.json();

}