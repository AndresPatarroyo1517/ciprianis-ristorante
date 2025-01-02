import { useState, useEffect } from 'react';

export function useCarousel(carouselLength: number, intervalTime: number) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? carouselLength - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === carouselLength - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const interval = setInterval(handleNext, intervalTime);
    return () => clearInterval(interval);
  }, [carouselLength, intervalTime]);

  return { activeIndex, handlePrev, handleNext };
}

