import React from 'react'
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import SERVER_BASE_URL from '../services/serverUrl';

const TopResult = ({ mainTheme, podcast, owner }) => {
  return (
    <>
      <Link
        to={`/podcast/${podcast?._id}`}
        className={`flex flex-col no-underline rounded-md gap-3 h-min ${mainTheme.card} shadow-2xl cursor-pointer hover:scale-105 hover:transition-all hover:ease-out hover:duration-300 hover:brightness-125 sm:w-[500px]  p-4`}
      >
        <img
          className="object-cover rounded-md shadow w-1/2"
          src={`${SERVER_BASE_URL}/uploads/${podcast?.podcastImg}`}
          alt="topimage"
        />
        <div
          style={{ color: `${mainTheme.text_primary}` }}
          className="text-2xl font-bold"
        >
          {podcast?.title}
        </div>
        <div className="flex gap-3 ">
          <h6
            style={{ color: `${mainTheme.text_primary}` }}
            className="text-xs md:text-sm "
          >
            {podcast?.views} views
          </h6>
          <h6
            style={{ color: `${mainTheme.text_primary}` }}
            className="text-xs md:text-sm "
          >
            {format(podcast?.createdAt)}
          </h6>
          <h5
            className="text-xs sm:text-sm"
            style={{ marginLeft: "18px", color: `${mainTheme.text_primary}` }}
          >
            {owner?.username}
          </h5>
        </div>
        <div
          style={{ color: ` ${mainTheme.text_secondary}` }}
          className="max-w-full -mt-3 text-sm overflow-hidden text-ellipsis"
        >
          {podcast?.desc}
        </div>
      </Link>
    </>
  );
};

export default TopResult