const API_BASE_URL='https://api.tvmaze.com'

export async function apiget(querystring){
    const response=await fetch(`${API_BASE_URL}${querystring}`).then(r=>r.json())
    return response;
}