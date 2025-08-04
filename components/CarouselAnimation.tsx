import React from "react";

const CarouselAnimation = () => {
  return (
    <>
      <style>
        {`
          .carousel-container {
            background: black;
            margin: 0;
            height: 20vh;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
          }

          @keyframes moveBg {
            from { background-position: 0 50%; }
            to { background-position: -1134px 50%; }
          }

          .carousel {
            --blur: 6px;
            --contrast: 105%;
            --speed: 13s;
            height: 250px;
            max-width: 700px;
            width: 100%;
            position: relative;
            margin: 20px 0;
          }

          .carousel .mask {
            position: absolute;
            inset: 0;
            background: #0000;
            backdrop-filter: blur(var(--blur)) contrast(var(--contrast));
            -webkit-backdrop-filter: blur(var(--blur)) contrast(var(--contrast));
            -webkit-mask: linear-gradient(90deg, #000 50px, #0000 175px calc(100% - 175px), #fff calc(100% - 50px));
            pointer-events: none;
          }

          .carousel .logos {
            animation: moveBg var(--speed) linear infinite;
            position: absolute;
            inset: 0;
            background: url(https://assets.codepen.io/1506195/brands2.webp) 0 50% / 567px 75px repeat-x;
            -webkit-mask: linear-gradient(90deg, #0000 5px, #000 50px calc(100% - 50px), #0000 calc(100% - 5px));
          }
        `}
      </style>

      <div className="carousel-container">
        <div className="carousel">
          <div className="logos"></div>
          <div className="mask"></div>
        </div>

      </div>
    </>
  );
};

export default CarouselAnimation;