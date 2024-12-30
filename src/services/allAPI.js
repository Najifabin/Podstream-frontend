import commonAPI from "./commonAPI";
import SERVER_BASE_URL from "./serverUrl";

// register
export const registerAPI = async (reqBody)=>{
    return await commonAPI("POST",`${SERVER_BASE_URL}/register`,reqBody)
}
// login

export const loginAPI = async (reqBody)=>{
    return await commonAPI("POST",`${SERVER_BASE_URL}/login`,reqBody)
}

// add-podcast
export const addPodcastAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_BASE_URL}/add-podcast`,reqBody,reqHeader)
}

// dashboard
export const dashboardPodcastAPI = async ()=>{
    return await commonAPI("GET",`${SERVER_BASE_URL}/dashboard`,{})
}

// userpodcast
export const userPodcastAPI = async (reqHeader)=>{
    return await commonAPI("GET",`${SERVER_BASE_URL}/user-podcasts`,{},reqHeader)
}

// allpodcast
export const allPodcastAPI = async ()=>{
    return await commonAPI("GET",`${SERVER_BASE_URL}/all-podcasts`,{})
}
// allpodcastbyid
export const allPodcastByIdAPI = async (id)=>{
    try{return await commonAPI("GET",`${SERVER_BASE_URL}/get/${id}`,{})}
    catch(err){
    console.error("Error in allPodcastByIdAPI:", err)
    throw err
   }
}
// allpodcastbytags
export const allPodcastByTagAPI = async (tags)=>{ 
   return await commonAPI("GET",`${SERVER_BASE_URL}/tags?tags=${tags}`,{})
   
}

// allpodcastbycategory
export const allPodcastByCategoryAPI = async (category)=>{
    return await commonAPI("GET",`${SERVER_BASE_URL}/category?q=${category}`,{})
}

// search Podcasts
export const searchPodcasts = async (searchKey)=>{
    return await commonAPI("GET",`${SERVER_BASE_URL}/search?search=${searchKey}`,{})
}
// delete podcast
export const deletePodcastAPI = async (id,reqHeader)=>{
    try
    {return await commonAPI("DELETE",`${SERVER_BASE_URL}/podcasts/${id}`,{},reqHeader)}
    catch(err){
        console.log("error in delete podcast api");
        
    }
}

// update profilePic
export const updateUserAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_BASE_URL}/user/edit`,reqBody,reqHeader)
}

// favorite podcast
export const favoritePodcastAPI = async (id,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_BASE_URL}/podcasts/favorite`,{id:id},reqHeader)
}

// get favorite podcast
export const getFavoritePodcastAPI = async (reqHeader)=>{
    return await commonAPI("GET",`${SERVER_BASE_URL}/favorites`,{},reqHeader)
}

// add view
export const addViewAPI = async (id)=>{
    return await commonAPI("POST",`${SERVER_BASE_URL}/addview/${id}`,{})
}