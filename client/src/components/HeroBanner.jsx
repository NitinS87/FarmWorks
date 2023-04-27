import React, { useEffect, useState } from "react";
import { RxDotFilled } from "react-icons/rx";

function HeroBanner() {
  const slides = [
    {
      url: "https://www.theindiaforum.in/sites/default/files/field/image/2022/06/21/ramkumar-radhakrishnan-wikimedia-1622193304-1622193304.jpeg",
      text: "Turn your farm into a success with the right labor",
    },

    {
      url: "https://images.livemint.com/img/2021/12/02/1600x900/farmers_1638463257211_1638463257385.jpg",
      text: "Labours Wanted! Find the perfect farmhand for your business today!",
    },

    {
      url: "https://mb.com.ph/wp-content/uploads/2021/11/Main-photo-scaled.jpg",
      text: "The best farmhands are just a click away!",
    },
  ];
  const delay = 3500;
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    setTimeout(
      () =>
        setCurrentIndex((prevIndex) =>
          prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );
  }, [currentIndex, slides.length]);

  return (
    <div className="max-w-[1200px] h-[600px] w-full mx-auto py-16 px-4 relative group">
      <div
        className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
      >
        <div className="bg-black/50 w-full h-full rounded-2xl relative">
          <div
            className="max-w-[1250px] relative block left-1/2 top-2/4 -translate-x-1/2 -translate-y-1/2 text-black/50
          shadow-gray-800"
          >
            <h1 className="text-white w-full h-full mx-auto text-3xl absolute mb-4 text-center flex justify-center items-center">
              {slides[currentIndex].text}
            </h1>
          </div>
        </div>
      </div>

      {/* Left Arrow */}
      {/* Right Arrow */}
      {/* <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 group-hover:bg-black/20 text-white cursor-pointer">
        <BsChevronCompactLeft size={30} onClick={prevSlide} />
      </div>
      
      <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 group-hover:bg-black/20 text-white cursor-pointer">
        <BsChevronCompactRight size={30} onClick={nextSlide} />
      </div> */}

      <div className="flex top-4 justify-center py-2">
        {slides.map((_slide, slideIndex) => (
          <div
            className="text-2xl cursor-pointer"
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeroBanner;
