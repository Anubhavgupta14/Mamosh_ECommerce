import React from "react";
import Slider from "react-slick";

export default function SimpleSlider() {
  let images = [
    {
      img: "https://fearofgod.com/cdn/shop/files/tvp0sczkigfzq1arpjqj_900x.jpg?v=1707185483",
    },
    {
      img: "https://fearofgod.com/cdn/shop/files/tvp0sczkigfzq1arpjqj_900x.jpg?v=1707185483",
    },
    {
      img: "https://fearofgod.com/cdn/shop/files/oicem6mfx5iensf2obhn_900x.jpg?v=1707185482",
    },
    {
      img: "https://fearofgod.com/cdn/shop/files/zjpq6hsbohjhacmajfx0_900x.jpg?v=1707185483",
    },
  ];

  const settings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 2
  };
  return (
    <Slider {...settings} className="main-cau">
      {images.map((el, i) => (
        <div>
          <img src={el.img} className="cau-img"/>
        </div>
      ))}
    </Slider>
  );
}
