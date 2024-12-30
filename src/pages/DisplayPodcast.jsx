import React, { useEffect, useState } from 'react'
import PodcastCard from '../components/PodcastCard';
import { allPodcastAPI, allPodcastByCategoryAPI } from '../services/allAPI';
import { useParams } from 'react-router-dom';



const DisplayPodcast = ({mainTheme}) => {
  const {type} = useParams()
  const [string,setString] = useState("")
  const [allPodcasts,setAllPodcasts] = useState([])
  // console.log("allPodcasts",allPodcasts);
  useEffect(()=>{
    getCategoryPodcasts()
  },[])

  const getCategoryPodcasts = async ()=>{
    // console.log(type);
     
      if (type === "Allpodcasts") {
        setString("All Podcasts")
        try {
          {
            const result = await allPodcastAPI();
            setAllPodcasts(result.data);
          }
        } catch (err) {
          console.log(err);
        }
      } else {
         let arr = type.split("");
         arr[0] = arr[0].toUpperCase();
         setString(arr);
        await getCategory();
      } 
  }

  const getCategory = async ()=>{
    try{
      const result = await allPodcastByCategoryAPI(type)
    if(result.status==200){
      setAllPodcasts(result.data)
    }
  }catch(err){
    console.log(err);
  }
  }
  
  return (
    <>
      <div className=" px-5 py-6 flex flex-col gap-5 overflow-x-hidden overflow-y-scroll h-full max-md:px-1.5 mx-md:py-2.5">
        <div
          style={{ backgroundColor: `${mainTheme.bg}` }}
          className="container px-5 py-6 flex flex-col justify-between rounded-lg "
        >
          <div
            style={{ color: `${mainTheme.text_secondary}` }}
            className="font-medium text-2xl md:text-lg "
          >
            {string}
          </div>
          <div className="h-full mb-4">
            {allPodcasts?.length === 0 ? (
              <div
                style={{ color: `${mainTheme.text_primary}` }}
                className="flex justify-center items-center h-full w-full mt-10"
              >
                No Podcasts
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8 px-1 py-1.5">
                {allPodcasts?.map((podcast, index) => (
                  <PodcastCard
                    key={index}
                    mainTheme={mainTheme}
                    displayData={podcast}
                    owner={podcast.creator}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default DisplayPodcast