import React, { useContext, useEffect, useState } from 'react'
import cameraImg from "../assets/cameraImg.png"
import uploadIcon from "../assets/uploadIcon.png";
import PodcastCard from '../components/PodcastCard'
import { deletePodcastAPI, updateUserAPI, userPodcastAPI } from '../services/allAPI'
import { MdDelete } from "react-icons/md";
import { addPodcastContext, loginContext } from '../contexts/ContextShare'
import { Button, Modal } from "react-bootstrap";
import SERVER_BASE_URL from '../services/serverUrl';

const Profile = ({mainTheme}) => {
  const { userLogin, setUserLogin } = useContext(loginContext);
  const { addPodcastResponse, setAddPodcastResponse } =
    useContext(addPodcastContext);
  const [email,setEmail] = useState("")
  const [userName,setUserName]=useState("")
  const [preview,setPreview] = useState("")
  const [userPodcasts,setUserPodcasts] = useState([])
  const [podcastOwner,setPodcastOwner] = useState()
  const [existingProfilePic,setExistingProfilePic] = useState("")
  const [userDetails,setUserDetails] =useState({username:"",email:"",password:"",profilePic:""})
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log("userDetails", userDetails);
  
  
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      const user = JSON.parse(sessionStorage.getItem("user"));
      setUserDetails({...userDetails,username:user.username,email:user.email,password:user.password})
      setExistingProfilePic(user.profilePic)
      setUserName(user.username)
      setEmail(user.email)
    }
  },[show])

  useEffect(()=>{
    if(userDetails.profilePic){
      setPreview(URL.createObjectURL(userDetails.profilePic))
    }else{
      setPreview("")
    }
  },[userDetails.profilePic])

  useEffect(()=>{
    getUserPodcasts()
  },[addPodcastResponse])

  const getUserPodcasts = async ()=>{
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`,
      };
    
    try{
      const result = await userPodcastAPI(reqHeader);
      if(result.status==200){
        setUserPodcasts(result.data.allUserPodcasts);
        setPodcastOwner(result.data.user)
      }
    }catch(err){
      console.log(err); 
    }
  }
  }

  const deletePodcast = async(id)=>{
    const token = sessionStorage.getItem("token");
    console.log(token);
    
    if(token){
      const reqHeader = {
        "Authorization": `Bearer ${token}`,
      };
    try{
      const result = await deletePodcastAPI(id, reqHeader);
      if(result.status==200){
        alert("Podcast Deleted")
        getUserPodcasts()
      }
    }catch(err){
      console.log(err);
      
    }
  }}

  const handleProfilePic = async ()=>{
    const {username,email,password,profilePic} = userDetails
    if(preview){
      const reqBody = new FormData()
      reqBody.append("username",username)
      reqBody.append("email", email);
      reqBody.append("password", password);
      reqBody.append("profilePic", profilePic);
      const token = sessionStorage.getItem("token")
      if(token){
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`,
      }
      // api call
      try{
         const result = await updateUserAPI(reqBody,reqHeader)
         if(result.status==200){
          // alert("Profile Updated")
          sessionStorage.setItem("user",JSON.stringify(result.data))
          handleClose()
          setUserLogin(JSON.stringify(result.data));
         }
      }catch(err){
        console.log(err);
        
      }}
    }else{
      alert("Select Picture")
    }
  }

  const removeProfilePic = async()=>{
    const { username, email, password, profilePic } = userDetails;
      const reqBody = new FormData();
      reqBody.append("username", username);
      reqBody.append("email", email);
      reqBody.append("password", password);
      reqBody.append("profilePic", "");
      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        };
      
      // api call
      try {
        const result = await updateUserAPI(reqBody, reqHeader);
        if (result.status == 200) {
          // alert("Profile Removed");
          sessionStorage.setItem("user", JSON.stringify(result.data));
          handleClose();
          setUserLogin(JSON.stringify(result.data));
        }
      } catch (err) {
        console.log(err);
      }}
  }
  
  return (
    <>
      <div className=" px-5 py-6 flex flex-col gap-5 overflow-x-hidden overflow-y-scroll h-full max-md:px-1.5 mx-md:py-2.5">
        <div className="flex gap-5 p-5 justify-center w-full">
          <div className="w-20 h-20 rounded-full text-3xl bg-slate-400 flex items-center justify-center relative">
            {existingProfilePic == "" ? (
              <div className="w-20 h-20 rounded-full text-3xl text-white font-semibold flex items-center justify-center absolute">
                {userName.split("")[0]}
              </div>
            ) : (
              <>
                <div className="w-20 h-20 rounded-full text-3xl flex items-center justify-center absolute">
                  <img
                    className="rounded-full object-cover w-20 h-20"
                    src={`${SERVER_BASE_URL}/uploads/${existingProfilePic}`}
                    alt=""
                  />
                </div>
              </>
            )}
            <button
              onClick={handleShow}
              className="absolute w-10 h-10 rounded-full bg-gray-200 left-12 top-12"
            >
              <img className="rounded-full " src={cameraImg} alt="" />
            </button>
          </div>
          <div className="flex flex-col items-start justify-center">
            <h4
              style={{ color: `${mainTheme.text_secondary}` }}
              className="Name overflow-hidden text-ellipsis whitespace-nowrap text-xl md:text-3xl"
            >
              {userName}
            </h4>
            <div className="text-sm md:text-xl text-slate-400">{email}</div>
          </div>
        </div>
        <div
          style={{ backgroundColor: `${mainTheme.bg}` }}
          className="container px-5 py-6 flex flex-col justify-between rounded-lg "
        >
          <div
            style={{ color: `${mainTheme.text_secondary}` }}
            className="font-medium text-2xl md:text-lg "
          >
            Your Uploads
          </div>
          {userPodcasts.length > 0 ? (
            <>
              <div className="h-full mb-4">
                <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8 px-4 py-1.5">
                  {userPodcasts?.map((podcast) => (
                    <>
                      <div key={podcast?._id} className="max-w-56 min-w-48">
                        <PodcastCard
                          mainTheme={mainTheme}
                          displayData={podcast}
                          owner={podcastOwner}
                        />
                        <div className="w-full mt-3">
                          <button
                            onClick={() => deletePodcast(podcast?._id)}
                            style={{ backgroundColor: `${mainTheme.card}` }}
                            className="w-full flex justify-center items-center rounded shadow-md text-red-500"
                          >
                            <MdDelete size={22} />
                          </button>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center mt-3">
              You haven't uploaded any podcast
            </div>
          )}
        </div>
      </div>
      <Modal size="sm" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="flex flex-col justify-center items-center">
            <label className="text-center ">
              <input
                onChange={(e) =>
                  setUserDetails({
                    ...userDetails,
                    profilePic: e.target.files[0],
                  })
                }
                accept="image/*"
                style={{ display: "none" }}
                type="file"
              />
              {existingProfilePic == "" ? (
                <img
                  width={"100px"}
                  height={"100px"}
                  src={preview ? preview : uploadIcon}
                  alt=""
                />
              ) : (
                <img
                  width={"100px"}
                  height={"100px"}
                  src={
                    preview
                      ? preview
                      : `${SERVER_BASE_URL}/uploads/${existingProfilePic}`
                  }
                  className="rounded-full"
                  alt=""
                />
              )}
            </label>
            Click here to Upload Profile
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={removeProfilePic}>
            Remove
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleProfilePic}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Profile