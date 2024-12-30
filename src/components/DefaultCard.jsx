import React from 'react'
import { Link } from 'react-router-dom'



const DefaultCard = ({category,mainTheme}) => {
    
  return (
    <>
      <div
        style={{ backgroundColor: `${category.color}` }}
        className="rounded px-8 py-4 text-xl font-semibold hover:scale-105 shadow-xl transition-all duration-300 relative h-[22vh]  overflow-hidden"
      >
        <div
          style={{ color: `${mainTheme.text_primary}` }}
          className="text-xl font-semibold text-center md:text-2xl"
        >
          {category.name}
        </div>
        <div className="w-full h-full flex justify-end mt-4 lg:mt-6 items-end">
          <img
            src={category.img}
            alt="Category"
            className="rounded rotate-12 h-[15vh] md:h-[17vh] lg:h-[18vh] object-cover"
          />
        </div>
      </div>
    </>
  );
}

export default DefaultCard