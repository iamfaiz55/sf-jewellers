import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { Element, Events, scrollSpy } from 'react-scroll';
import '../admin/section.css';
import { useGetAllScrollCardsQuery } from '../redux/apis/openApi';


const ScrollCard = () => {
    const scrollContainerRef = useRef(null);
    const [scrollInterval, setScrollInterval] = useState(null);
    const { data } = useGetAllScrollCardsQuery()
    // const cardData = [
    //     {
    //         id: 1,
    //         title: "Card 1",
    //         image: "https://cdn.pixabay.com/photo/2017/05/26/16/08/glass-2346358_1280.png",
    //         link: "/card1"
    //     },
    //     { id: 2, title: "Card 2", image: "https://cdn.pixabay.com/photo/2015/12/18/09/44/the-number-of-1098375_1280.png", link: "/card2" },
    //     { id: 3, title: "Card 3", image: "https://cdn.pixabay.com/photo/2017/06/25/03/03/trim-2439522_1280.png", link: "/card3" },
    //     { id: 4, title: "Card 4", image: "https://media.istockphoto.com/id/1824840285/vector/christmas-decoration-golden-glass-ball.jpg?s=1024x1024&w=is&k=20&c=rGnHeTjC7hTDYt4Cp6PlZjUnCO-eLMseOdqBH_ZY7ZM=", link: "/card4" },
    //     { id: 5, title: "Card 5", image: "https://cdn.pixabay.com/photo/2017/06/25/03/10/trim-2439533_1280.png", link: "/card5" },
    //     { id: 6, title: "Card 6", image: "https://cdn.pixabay.com/photo/2017/06/17/02/36/png-2411012_1280.png", link: "/card6" },
    //     { id: 7, title: "Card 7", image: "https://media.istockphoto.com/id/2164010501/photo/question-mark-symbol-alphabet-road-3d-png-road-uppercase-letters-road-style-alphabet-3d.jpg?s=1024x1024&w=is&k=20&c=y2hQb808IrNN17h-GJZysWfUfm5MkDgAK7otOGTMZBo=", link: "/card7" },
    //     { id: 8, title: "Card 8", image: "https://cdn.pixabay.com/photo/2017/06/07/14/10/at-sign-2380473_1280.png", link: "/card8" },
    //     { id: 9, title: "Card 9", image: "https://cdn.pixabay.com/photo/2017/06/28/18/37/trim-2451715_1280.png", link: "/card9" },
    //     { id: 10, title: "Card 10", image: "https://images.unsplash.com/photo-1706694668166-d09c91016064?w=600&auto=format&fit=crop&q=60", link: "/card10" },
    // ];

    useEffect(() => {
        Events.scrollEvent.register('begin', (to, element) => {
            console.log('begin', to, element);
        });

        Events.scrollEvent.register('end', (to, element) => {
            console.log('end', to, element);
        });

        scrollSpy.update();

        return () => {
            Events.scrollEvent.remove('begin');
            Events.scrollEvent.remove('end');
        };
    }, []);

    // useEffect(() => {
    //     const startAutoScroll = () => {
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

    //     // Start the auto-scrolling
    //     startAutoScroll();

    //     return () => clearInterval(scrollInterval);
    // }, [scrollInterval]);

    // Pause scrolling on hover
    const handleMouseEnter = () => {
        clearInterval(scrollInterval);
    };

    // Resume scrolling when not hovering
    const handleMouseLeave = () => {
        const interval = setInterval(() => {
            if (scrollContainerRef.current) {
                const { scrollLeft, scrollWidth } = scrollContainerRef.current;
                scrollContainerRef.current.scrollLeft += 1;

                if (scrollLeft >= scrollWidth / 2) {
                    scrollContainerRef.current.scrollLeft = 0;
                }
            }
        }, 10);
        setScrollInterval(interval);
    };

    return (
        <div>
            <div
                className="scroll-container h-60 mt-1 md:mt-8"
                ref={scrollContainerRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {data && [...data, ...data].map((card, index) => (
                    <Element key={index} name={`card${card.id}`} className="scroll-card h-52">
                        <Link to={card.link} className="card-content">
                            <img src={card.image} alt={card.title} className="" />
                            <h2>{card.title}</h2>
                        </Link>
                    </Element>
                ))}
            </div>
        </div>
    );
};


export default ScrollCard;
