import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'timeago.js';
import SERVER_BASE_URL from '../services/serverUrl';

const MoreResults = ({ mainTheme, podcast, owner }) => {
  return (
    <>
      <Link
        to={`/podcast/${podcast?._id}`}
        style={{ backgroundColor: `${mainTheme.bgLight}` }}
        className="flex no-underline items-center p-2 rounded-md gap-3 hover:cursor-pointer hover:scale-105 hover:transition-all hover:duration-300 hover:ease-in-out hover:brightness-125"
      >
        <img
          className="h-20 w-28 md:h-24 rounded-lg md:w-40 object-cover"
          src={`${SERVER_BASE_URL}/uploads/${podcast?.podcastImg}`}
          alt=""
        />
        <div className="flex flex-col gap-2">
          <div
            style={{ color: `${mainTheme.text_primary}` }}
            className="flex flex-col"
          >
            {podcast?.title}
          </div>
          <div className="flex gap-2">
            <h4
              style={{
                marginRight: "12px",
                color: `${mainTheme.text_secondary}`,
              }}
              className="text-xs md:text-sm"
            >
              {owner.username}
            </h4>
            <h6
              style={{ color: `${mainTheme.text_secondary}` }}
              className="text-xs md:text-sm "
            >
              {podcast?.views} views
            </h6>
            <h6
              style={{ color: `${mainTheme.text_secondary}` }}
              className="text-xs md:text-sm "
            >
              {format(podcast?.createdAt)}
            </h6>
          </div>
        </div>
      </Link>
    </>
  );
};

export default MoreResults