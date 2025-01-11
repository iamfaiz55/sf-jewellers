// import { useEffect, useRef, useState } from 'react';
// import { Link } from 'react-router-dom'; // Import Link from react-router-dom
// import { Element, Events, scrollSpy } from 'react-scroll';
// import '../admin/section.css';
// import { useGetAllScrollCardsQuery } from '../redux/apis/openApi';


// const ScrollCard = () => {
//     const scrollContainerRef = useRef(null);
//     const [scrollInterval, setScrollInterval] = useState(null);
//     const { data } = useGetAllScrollCardsQuery()

//     useEffect(() => {
//         Events.scrollEvent.register('begin', (to, element) => {
//             console.log('begin', to, element);
//         });

//         Events.scrollEvent.register('end', (to, element) => {
//             console.log('end', to, element);
//         });

//         scrollSpy.update();

//         return () => {
//             Events.scrollEvent.remove('begin');
//             Events.scrollEvent.remove('end');
//         };
//     }, []);

//     const handleMouseEnter = () => {
//         clearInterval(scrollInterval);
//     };

//     const handleMouseLeave = () => {
//         const interval = setInterval(() => {
//             if (scrollContainerRef.current) {
//                 const { scrollLeft, scrollWidth } = scrollContainerRef.current;
//                 scrollContainerRef.current.scrollLeft += 1;

//                 if (scrollLeft >= scrollWidth / 2) {
//                     scrollContainerRef.current.scrollLeft = 0;
//                 }
//             }
//         }, 10);
//         setScrollInterval(interval);
//     };

//     console.log("dataa",data);
    

//     return (
//         <div>
//             <div
//                 className="scroll-container h-60 mt-1 md:mt-8"
//                 ref={scrollContainerRef}
//                 onMouseEnter={handleMouseEnter}
//                 onMouseLeave={handleMouseLeave}
//             >
//                 {data && [...data, ...data].map((card, index) => (
//                     <Element key={index} name={`card${card.id}`} className="scroll-card h-52">
//                         <Link to={card.link} className="card-content">
//                             <img src={card.image} alt={card.title} className="" />
//                             <h2>{card.title}</h2>
//                         </Link>
//                     </Element>
//                 ))}
//             </div>
//         </div>
//     );
// };


// export default ScrollCard;



import React, { useEffect, useRef } from 'react';
import { useGetAllScrollCardsQuery } from '../redux/apis/openApi';

const ScrollCard = () => {
//   const data = [
//     {
//       _id: '673c4e6e634895db107d092d',
//       title: 'Solitaires',
//       image: 'https://res.cloudinary.com/dpc5d15ci/image/upload/v1732005485/s2pviboecjjnb2a7hut6.webp',
//     },
//     {
//       _id: '673c4e9b634895db107d0930',
//       title: 'Mangalsutras',
//       image: 'https://res.cloudinary.com/dpc5d15ci/image/upload/v1732005530/aoyrmtbgio7kz2ozxwzb.webp',
//     },
//     {
//       _id: '673c4ec3634895db107d0933',
//       title: "Men's Jewellery",
//       image: 'https://res.cloudinary.com/dpc5d15ci/image/upload/v1732005570/onnljobp7m0x99wwn1f1.webp',
//     },
//     {
//       _id: '673c4edc634895db107d0936',
//       title: 'Kids Jewellery',
//       image: 'https://res.cloudinary.com/dpc5d15ci/image/upload/v1732005595/wzuoxexacys78aaabhnr.webp',
//     },
//     {
//       _id: '673c4ef0634895db107d0939',
//       title: 'Nose Pins',
//       image: 'https://res.cloudinary.com/dpc5d15ci/image/upload/v1732005615/angctzbafaiqwag5munm.webp',
//     },
//   ];
const { data } = useGetAllScrollCardsQuery()
const scrollContainerRef = useRef(null);
const intervalRef = useRef(null);

useEffect(() => {
  const scrollContainer = scrollContainerRef.current;

  const scroll = () => {
    if (scrollContainer) {
      scrollContainer.scrollLeft += 1;

      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        scrollContainer.scrollLeft = 0;
      }
    }
  };

  // Start scrolling
  intervalRef.current = setInterval(scroll, 20);

  return () => clearInterval(intervalRef.current); // Cleanup on unmount
}, []);

const stopScrolling = () => {
  clearInterval(intervalRef.current);
};

const startScrolling = () => {
  intervalRef.current = setInterval(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 1;
    }
  }, 20);
};

return (
  <div
    ref={scrollContainerRef}
    className="flex overflow-hidden whitespace-nowrap w-full h-[150px] md:h-[230px] bg-light-golden items-center px-2 space-x-4 "
    onMouseEnter={stopScrolling} // Stop scrolling on hover
    onMouseLeave={startScrolling} // Resume scrolling when mouse leaves
  >
    {data &&data.map((item) => (
      <div
        key={item._id}
        className="flex-shrink-0  w-[120px] h-[120px] border border-gray-300 rounded-lg bg-white flex flex-col items-center justify-center shadow-md transition-transform transform hover:scale-105 md:w-[160px]  md:h-[160px] lg:w-[200px] lg:h-[200px]"
      >
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-[80px] md:h-[100px] lg:h-[140px] object-cover rounded-md"
        />
        <p className="mt-2 text-sm md:text-base lg:text-lg text-gray-800 text-center">
          {item.title}
        </p>
      </div>
    ))}
  </div>
);
};

export default ScrollCard;