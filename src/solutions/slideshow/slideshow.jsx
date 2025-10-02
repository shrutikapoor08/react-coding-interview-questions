import React, { useState, useRef, useEffect } from "react";
import "./slideshow.css";

// Requirements:
/*
1. Implement ability to render images in horizontal layout 
2. Navigate slides using previous/next buttons and dot indicators.
3. Implement autoplay functionality that pauses on hover. 
4. Support looping.
5. Add keyboard support for navigation.
*/
const images = [
  {
    url: "https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Blue domes in greece",
    id: 1,
  },
  {
    url: "https://images.pexels.com/photos/575362/pexels-photo-575362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Tower bridge in London",
    id: 2,
  },
  {
    url: "https://images.pexels.com/photos/417344/pexels-photo-417344.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Boats in Venice",
    id: 3,
  },
];

const Slide = ({ image }) => {
  return (
    <div className="slide">
      <img src={image.url} alt={image.alt} />
    </div>
  );
};

const Controls = ({ activeIndex, setIndex, total }) => {
  const handleDecrement = () => {
    if (activeIndex === 0) {
      setIndex(total - 1);
      return;
    }
    setIndex(activeIndex - 1);
  };
  const handleIncrement = () => {
    if (activeIndex === total - 1) {
      setIndex(0);
      return;
    }
    setIndex(activeIndex + 1);
  };
  return (
    <div>
      <button className="left" onClick={handleDecrement}>
        ⬅
      </button>
      <button className="right" onClick={handleIncrement}>
        ➡
      </button>
    </div>
  );
};

const Indicators = ({ images, activeIndex, setIndex }) => {
  return (
    <div className="indicator-dots">
      {images.map((_, i) => (
        <button
          key={i}
          onClick={() => setIndex(i)}
          className={`dot${i === activeIndex ? "active" : ""}`}
        />
      ))}
    </div>
  );
};

const SlideShow = () => {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  const startAutoplay = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(
      () => setIndex((index + 1) % images.length),
      3500
    );
  };

  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoplay();
    return () => {
      stopAutoplay();
    };
  });

  return (
    <div
      className="slideshow"
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
      aria-label="Slideshow of tourist sites in Europe"
      role="region"
      onFocus={stopAutoplay}
      onBlur={startAutoplay}
    >
      <Slide image={images[index]} />
      <Controls activeIndex={index} setIndex={setIndex} total={images.length} />
      <Indicators images={images} activeIndex={index} setIndex={setIndex} />
    </div>
  );
};

export default SlideShow;
