
import React, { useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";

const items = [
  {
    src: "https://www.pcrm.org/sites/default/files/2020-12/plant-based-protein.jpg",
    altText:
      "Plant-Based Protein Lowers Risk of Premature Death, Heart Disease, Dementia-Related Death",
    caption:
      "Plant-Based Protein Lowers Risk of Premature Death, Heart Disease, Dementia-Related Death",
  },
  {
    src: "https://www.pcrm.org/sites/default/files/2020-06/vegan-food.jpg",
    altText: "Vegetarian Diets Reduce Risk of Death from Heart Disease",
    caption: "Vegetarian Diets Reduce Risk of Death from Heart Disease",
  },
  {
    src: "https://www.pcrm.org/sites/default/files/soy-foods.jpg",
    altText: "New Research Disputes the Biggest Soy Myths",
    caption: "New Research Disputes the Biggest Soy Myths",
  },
];

function Carusel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
        style={{height: "200px"}}

      >
        <img style={{ width: "100%" }} src={item.src} alt={item.altText} />
        {/* <CarouselCaption
          // captionText={item.caption}
          captionHeader={item.caption}
        /> */}
      </CarouselItem>
    );
  });

  return (
    <Carousel
      style={{ display: "flex", height: 300 }}
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction='prev'
        directionText='Previous'
        onClickHandler={previous}
      />
      <CarouselControl
        direction='next'
        directionText='Next'
        onClickHandler={next}
      />
    </Carousel>
  );
}

export default Carusel;
