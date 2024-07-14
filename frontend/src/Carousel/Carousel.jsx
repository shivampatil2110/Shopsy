import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";

const Carousel = ({ productData }) => {
  const [products, setProducts] = useState(productData);
  const sliderRef = useRef(null);

  const getRandomProducts = (products, count) => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const randomProducts = getRandomProducts(products, 5);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.slickNext(); // Move to the next slide
      }
    }, 5000);

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  return (
    <div className="container mx-auto px-6 py-4">
      <Slider ref={sliderRef} {...settings}>
        {randomProducts.map((product) => (
          <div key={product._id} className="p-4">
            <img
              src={product.productImage} // Ensure this is a valid image URL
              alt={product.name}
              className="w-full h-64 object-cover rounded-md mb-2"
            />
            <p>{product.image}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
