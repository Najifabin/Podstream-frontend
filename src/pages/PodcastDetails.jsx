import React, { useContext, useEffect, useState } from 'react'
import { FaPlay } from 'react-icons/fa';
import { FaHeadphones } from "react-icons/fa";
import Episodecard from '../components/Episodecard';
import { Button, Modal } from 'react-bootstrap';
import Videoplayer from '../components/Videoplayer';
import { useParams } from 'react-router-dom';
import { allPodcastByIdAPI, favoritePodcastAPI } from '../services/allAPI';
import SERVER_BASE_URL from '../services/serverUrl';import {format} from 'timeago.js'
import { MdFavorite } from 'react-icons/md';
import { addPodcastContext } from '../contexts/ContextShare';

const PodcastDetails = ({ mainTheme }) => {
  const { addPodcastResponse, setAddPodcastResponse } =
      useContext(addPodcastContext);
  const {id} = useParams()
  const [podcast,setPodcast] = useState([])
  const [user,setUser] = useState([])
  const [userDetails,setUserDetails] = useState([])
  const [favorite, setFavorite] = useState(false);
  // const [show, setShow] = useState(false);
  
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const getPodcast = async ()=>{
    await allPodcastByIdAPI(id).then((res) => {
      if (res.status === 200) {
        // console.log(res.data);
        setPodcast(res.data.podcastById);
        setUser(res.data.user)

      }
    }).catch((err)=>{
      console.log(err);
      
    })
  }
  const toggleFavorite = async () => {
     const token = sessionStorage.getItem("token");
    //  console.log(token);
     if (token) {
       const reqHeader = {
         Authorization: `Bearer ${token}`,
       };
       try {
         const result = await favoritePodcastAPI(podcast?._id, reqHeader);
         if (result.status == 200) {
           setFavorite(!favorite);
           setUserDetails(result.data)
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
    getPodcast()
    if (sessionStorage.getItem("token")) {
      const userDetail = JSON.parse(sessionStorage.getItem("user"));
      setUserDetails(userDetail);
    }
  },[])

   useEffect(() => {
     if (userDetails?.favorites?.find((fav) => fav.toString() === podcast._id.toString())) {
       setFavorite(true);
     }
   }, [user,addPodcastResponse])


  return (
    <>
      <div className="h-full px-5 py-8 overflow-y-scroll flex flex-col gap-5">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <button onClick={toggleFavorite}
            style={{ backgroundColor: `${mainTheme.text_secondary}` }}
            className="Favourite mt-1 p-0.5 rounded-full flex items-center z-10 shadow-green-700 backdrop-blur-sm"
          >
            {/* <div className="text-red-500">
              <MdFavorite size={22} />
            </div> */}
            {favorite ? (
                  <div className="text-red-500">
                    <MdFavorite size={22} />
                  </div>
                ) : (
                  <div className="text-white">
                    <MdFavorite size={22} />
                  </div>
                )}
          </button>
        </div>
        <div className="flex flex-col gap-5 md:flex-row ">
          <img
            style={{ backgroundColor: `${mainTheme.text_secondary}` }}
            className="w-64 h-64 rounded-md object-cover"
            src={`${SERVER_BASE_URL}/uploads/${podcast?.podcastImg}`}
          />
          <div className="flex flex-col gap-3 w-full">
            <div
              style={{ color: `${mainTheme.text_primary}` }}
              className="Title w-full text-3xl font-extrabold justify-between"
            >
              {podcast?.title}
            </div>
            <div
              style={{ color: `${mainTheme.text_secondary}` }}
              className="Description text-sm font-semibold"
            >
              {podcast?.desc}
            </div>
            <div className=" flex flex-row gap-3 flex-wrap">
              <div
                style={{
                  backgroundColor: `${mainTheme.text_secondary + 50}`,
                  color: `${mainTheme.text_secondary}`,
                }}
                className="px-3 py-1 text-xs md:text-sm rounded-xl"
              >
                {podcast?.tags}
              </div>
            </div>
            <div className="flex flex-row items-center gap-16">
              <div className="flex flex-row items-center gap-2">
                <div className="Avathar w-7 h-7 rounded-full bg-slate-300 flex items-center justify-center">
                  {user?.profilePic == "" ? (
                    <>{user?.username.split("")[0]}</>
                  ) : (
                    <>
                      <img
                        className="w-7 h-7 rounded-full "
                        src={`${SERVER_BASE_URL}/uploads/${user?.profilePic}`}
                        alt=""
                      />
                    </>
                  )}
                </div>
                <div
                  style={{ color: `${mainTheme.text_secondary}` }}
                  className="font-semibold text-xl overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  {user?.username}
                </div>
              </div>
              <div className="Views text-xs text-slate-400">
                {podcast?.views} views
              </div>
              <div className="Views text-xs text-slate-400">
                {format(podcast?.createdAt)}
              </div>
              {podcast?.format == "Video" ? (
                <div className="flex items-center text-white p-2.5 rounded-full z-10 bg-green-400  transition-all duration-300 ease-in-out shadow-xl">
                  <FaPlay size={18} />
                </div>
              ) : (
                <div className="flex items-center text-white p-2.5 rounded-full z-10 bg-green-400  transition-all duration-300 ease-in-out shadow-xl">
                  <FaHeadphones size={18} />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start gap-5 mt-4">
          <div
            style={{ color: `${mainTheme.text_primary}` }}
            className="font-medium text-2xl flex justify-center items-center"
          >
            All Episodes
          </div>
          <div className="flex flex-col gap-5">
            {podcast?.episodes?.map((episode,index) => (
              <Episodecard
                key={episode._id}
                mainTheme={mainTheme}
                episode={episode}
                podcast={podcast}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {/* <Modal
        size="lg"
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div>
            <iframe
              width="100%"
              height="395"
              src="https://www.youtube.com/embed/_L8-noa8wxk"
              title="Simple Ken Podcast | EP 42 - New Chapter Feat @kanan_gill"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="rounded p-4"
            ></iframe>
            <h4 className="Name px-4 overflow-hidden text-ellipsis whitespace-nowrap">
              Name
            </h4>
            <div
              className="Description px-4 text-sm font-semibold"
            >
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel,
              velit, inventore ipsa enim atque Lorem ipsum dolor sit, amet
              consectetur adipisicing elit. Nemo vel ipsam nihil architecto
              itaque, nam blanditiis, tempora, sit laborum eum nobis cum in quo
              quisquam sint! Similique voluptates odio illo?
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Previous Episode
          </Button>

          <Button variant="primary">Next Episode</Button>
        </Modal.Footer>
      </Modal> */}
      {/* <Videoplayer show={show} handleClose={handleClose} /> */}
    </>
  );
};

export default PodcastDetails