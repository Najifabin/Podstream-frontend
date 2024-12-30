import React, { useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import DefaultCard from '../components/DefaultCard';
import { Category } from '../theme/Data';
import { Link } from 'react-router-dom';
import TopResult from '../components/TopResult';
import MoreResults from '../components/MoreResults';
import { searchPodcasts } from '../services/allAPI';

const Search = ({mainTheme}) => {
  const [searchKey,setSearchKey] = useState("")
  // console.log(searchKey);
  
  const [searchedPodcasts, setSearchedPodcasts] = useState([]);
  const handleBrowse = (e) => {
    if (!sessionStorage.getItem("token")) {
      e.preventDefault();
      alert("Please Login");
      navigate("/search");
    }
  };
  const handleSearch = async(e)=>{
    setSearchedPodcasts([])
    setSearchKey(e.target.value)
    try
    {const result = await searchPodcasts(e.target.value)
      if (result.status == 200) {
        setSearchedPodcasts(result.data);
      }
    }
    catch(err){
      console.log(err);
      
    }
  }
 

  return (
    <>
      <div className="pb-5 px-4 py-6 flex flex-col gap-5 overflow-x-hidden overflow-y-scroll w-full h-full max-md:px-1.5 mx-md:py-2.5">
        <div className="flex justify-center w-full">
          <div className="flex w-full max-w-2xl border rounded-full px-3 py-4 justify-start cursor-pointer items-center gap-1.5 border-slate-400">
            <div
              style={{ color: `${mainTheme.text_primary}` }}
              className="text-gray-200 ms-2"
            >
              <IoIosSearch />
            </div>
            <input
              onChange={(e) => handleSearch(e)}
              style={{ color: `${mainTheme.text_secondary}` }}
              type="text"
              placeholder="Search Artists/Podcasts"
              className="w-full bg-inherit outline-none border-none text-gray-300 ms-2"
            />
          </div>
        </div>
        <div
          style={{ backgroundColor: `${mainTheme.bg}` }}
          className="container w-full py-6 flex flex-col justify-between rounded-lg "
        >
          {searchKey === "" ? (
            <>
              <div
                style={{ color: `${mainTheme.text_secondary}` }}
                className="font-medium text-2xl md:text-lg "
              >
                Browse All
              </div>
              <div className="h-full mb-4">
                <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-8 px-3 py-1.5">
                  {Category.map((category) => (
                    <Link
                      onClick={handleBrowse}
                      to={`/showpodcasts/${category.name.toLowerCase()}`}
                      style={{ textDecoration: "none" }}
                    >
                      <DefaultCard mainTheme={mainTheme} category={category} />
                    </Link>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {searchedPodcasts?.length === 0 ? (
                <div className="flex justify-center items-center">
                  No Podcasts Found
                </div>
              ) : (
                <>
                  <TopResult
                    mainTheme={mainTheme}
                    podcast={searchedPodcasts[0]}
                    owner={searchedPodcasts[0].creator}
                  />
                  <div className="mt-4">
                    {searchedPodcasts?.map((podcast) => (
                      <>
                        <div className="mt-2">
                          <MoreResults
                            key={podcast?._id}
                            mainTheme={mainTheme}
                            podcast={podcast}
                            owner={podcast.creator}
                          />
                        </div>
                      </>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Search