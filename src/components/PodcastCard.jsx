import React, {  useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { MdFavorite } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import { FaHeadphones } from "react-icons/fa";
import SERVER_BASE_URL from '../services/serverUrl';
import { favoritePodcastAPI } from '../services/allAPI';
import { addPodcastContext, loginContext } from '../contexts/ContextShare';

// import { Button, Modal } from 'react-bootstrap';


const PodcastCard = ({ mainTheme,displayData,owner }) => {
  // console.log("owner",owner);
  const { userLogin, setUserLogin } = useContext(loginContext)
  const { addPodcastResponse, setAddPodcastResponse } =
      useContext(addPodcastContext);
 const [favorite, setFavorite] = useState(false);
 const [user,setUser] = useState([])
 const toggleFavorite = async () => {
   const token = sessionStorage.getItem("token");
  //  console.log(token);
   if (token) {
     const reqHeader = {
       Authorization: `Bearer ${token}`,
     };
     const userDetail = JSON.parse(sessionStorage.getItem("user"));
     setUser(userDetail);
     try {
       const result = await favoritePodcastAPI(displayData?._id, reqHeader);
       if (result.status == 200) {
         setFavorite(!favorite);
         setUser(result.data)
         sessionStorage.setItem("user", JSON.stringify(result.data));
         setAddPodcastResponse(result.data)
       } else {
         alert(result.response.data);
       }
     } catch (err) {
       console.log(err);
     }
   } else {
     alert("Please Login");
   }
 };
  useEffect(()=>{
    if (sessionStorage.getItem("token")) {
      const userDetail = JSON.parse(sessionStorage.getItem("user"));
      setUser(userDetail);
    }
  },[])

 useEffect(() => {
   // console.log("displayData?._id", displayData?._id);
   // console.log("username",user?.username);

  //  user?.favorites?.map((fav) => {
  //    console.log("fav", fav);
  //  });

   if (
     user?.favorites?.find(
       (fav) => fav.toString() === displayData._id.toString()
     )
   ) {
     setFavorite(true);
   }
 }, [user]);

  return (
    <>
      <Link
        onClick={(e) => {
          if (e.target.closest("button")) {
            e.preventDefault();
          }
        }}
        to={`/podcast/${displayData._id}`}
        className="no-underline"
      >
        <div
          style={{ backgroundColor: `${mainTheme.card}` }}
          className=" relative no-underline min-w-48 max-w-56 flex flex-col justify-start items-center p-4 rounded-md  shadow-2xl cursor-pointer 
          hover:scale-105
          transition-all ease-in-out duration-300
           hover:shadow-xl hover:translate-y-px hover:brightness-125"
        >
          <div className="w-full">
            <div className="Top flex flex-col justify-center items-center relative h-40">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  if(!user){
                    alert("Please log in to favorite this podcast")
                  }else{
                    toggleFavorite()
                  }
                }}
                style={{ backgroundColor: `${mainTheme.text_secondary}` }}
                className="Favourite mt-1  top-2 right-1.5 p-0.5 rounded-full flex items-center absolute   z-10 shadow-green-700 backdrop-blur-sm"
              >
                {favorite ? (
                  <div className="text-red-500">
                    <MdFavorite size={18} />
                  </div>
                ) : (
                  <div className="text-white">
                    <MdFavorite size={18} />
                  </div>
                )}
              </button>
              {displayData?.format == "Video" ? (
                <>
                  <div
                    style={{ top: "83%", right: "10%" }}
                    className="flex items-center text-white p-2.5 rounded-full z-10 bg-green-400 absolute transition-all duration-300 ease-in-out shadow-xl"
                  >
                    <FaPlay size={18} />
                  </div>
                </>
              ) : (
                <>
                  <div
                    style={{ top: "83%", right: "10%" }}
                    className="flex items-center text-white p-2.5 rounded-full z-10 bg-green-400 absolute transition-all duration-300 ease-in-out shadow-xl"
                  >
                    <FaHeadphones size={18} />
                  </div>
                </>
              )}
              <img
                className="CardIMG rounded-md w-56 h-36 object-cover shadow-xl hover:shadow-2xl"
                src={`${SERVER_BASE_URL}/uploads/${displayData?.podcastImg}`}
                alt=""
              />
            </div>
            <div className="CardInformation flex font-semibold w-full items-end pt-3.5 ">
              <div className="MainInfo flex w-full flex-col justify-start  gap-1">
                <div
                  style={{ color: `${mainTheme.text_primary}` }}
                  className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  {displayData?.title}
                </div>
                <div
                  style={{
                    color: `${mainTheme.text_secondary}`,
                    height: "95px",
                  }}
                  className=" max-w-full line-clamp-6 text-xs font-normal"
                >
                  {displayData?.desc}
                </div>
                <div className="CrateerInfo flex items-center justify-between mt-3.5 gap-2">
                  <div className="flex gap-2 items-center justify-center">
                    <div className="Avathar w-6 h-6 rounded-full bg-slate-300 flex items-center justify-center">
                      {owner?.profilePic == "" ? (
                        <>{owner?.username.split("")[0]}</>
                      ) : (
                        <>
                          <img
                            className="w-6 h-6 rounded-full "
                            src={`${SERVER_BASE_URL}/uploads/${owner?.profilePic}`}
                            alt=""
                          />
                        </>
                      )}
                    </div>
                    <div
                      style={{ color: `${mainTheme.text_secondary}` }}
                      className="text-sm overflow-hidden text-ellipsis whitespace-nowrap"
                    >
                      {owner?.username}
                    </div>
                  </div>
                  <div className="Views text-xs text-slate-400">
                    {displayData?.views} views
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default PodcastCard