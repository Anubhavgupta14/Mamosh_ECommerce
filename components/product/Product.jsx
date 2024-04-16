import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../common/Navbar2";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import Caursel from "./Caursel"
const Product = () => {
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
        img:"https://fearofgod.com/cdn/shop/files/zjpq6hsbohjhacmajfx0_900x.jpg?v=1707185483"
    }
  ];
  let you_may = [
    {
      img: "https://fearofgod.com/cdn/shop/files/tvp0sczkigfzq1arpjqj_900x.jpg?v=1707185483",
      name:"Womens Essentials Sweatpaint",
      price:"65"
    },
    {
      img: "https://fearofgod.com/cdn/shop/files/tvp0sczkigfzq1arpjqj_900x.jpg?v=1707185483",
      name:"Womens Running Short",
      price:"85"
    },
    {
      img: "https://fearofgod.com/cdn/shop/files/oicem6mfx5iensf2obhn_900x.jpg?v=1707185482",
      name:"Nylon Halfzip Mockneck",
      price:"185"
    },
    {
        img:"https://fearofgod.com/cdn/shop/files/zjpq6hsbohjhacmajfx0_900x.jpg?v=1707185483",
        name: "Womens Running Short",
        price:"55"
    }
  ];
  let sizes = [
    {
        size:"XXS",
    },
    {
        size:"XS",
    },
    {
        size:"S",
    },
    {
        size:"M",
    },
    {
        size:"L",
    },
    {
        size:"XL",
    },
    {
        size:"XLL",
    }
  ]
  const [toggle_details, Settoggle_details] = useState(false);
  const [toggle_shipping, Settoggle_shipping] = useState(false);
  const [toggle_share, Settoggle_share] = useState(false);
  const [opensize, Setopensize] = useState(false)

  const [isMobileMode, setIsMobileMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            // Check window width to determine mobile mode
            setIsMobileMode(window.innerWidth <= 768); // Adjust the breakpoint as needed
        };

        // Initial check
        handleResize();

        const handleScroll = () => {
          // Check scroll position to determine if scrolled
          const scrollPosition = window.scrollY;

          // Set isScrolled to true if scroll position is greater than or equal to 100 pixels
          setIsScrolled(scrollPosition >= 450); // Adjust the scroll position as needed
      };

      // Initial check
      handleScroll();

      // Event listener for scroll
      window.addEventListener('scroll', handleScroll);


        // Event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

  return (
    <>
      <Navbar />
      <div className="pro_main">
        {!isMobileMode ? 
        <div className="pro_img">
          {images.map((el, i) => (
            <img src={el.img} className="pro_img_seperate" />
          ))}
        </div>
        :
        <Caursel/>
        }



        <div className="pro_content">
          <div className="pro_inside_content">
            <div className="pro_head">
              <p className="pro_p_one">ESSENTIALS</p>
              <p className="pro_p_main">Womens Halfzip Mockneck</p>
              <p className="pro_p_price">Rs. 11,100</p>

              {!isMobileMode && 
              <>
              <div className="pro_variants">
                <div className="single_variant">
                  <div className="single_box">
                    <p>Vintage White</p>
                  </div>
                  <p className="pro_vari_detail">MORE COLORS</p>
                </div>

                <div className="single_variant">
                  <div className="single_box" onClick={()=>{Setopensize(!opensize)}}>
                    <p>Select Size</p>
                    {!opensize ? <MdKeyboardArrowDown/> : <MdKeyboardArrowUp/>}
                  </div>
                  <p className="pro_vari_detail">Size Chart</p>
                  {opensize && 
                  <div className="size_chart_pro">
                    {sizes.map((el,i)=>(
                        <div className="single_size">
                         <p>{el.size}</p>
                        </div>
                    ))}
                </div>
                }
                  
                </div>
              </div>

              <div className="pro_btn_addtocart">
                <p>Add to Cart</p>
              </div>
              </>
              }

              <p className="pro_item_detail">
                The Women's Essentials halfzip mockneck is made in reverse
                French cotton terry. The piece is designed with volume to create
                a round, cropped silhouette. Details include a mock neckline,
                side seam pockets, elastic binding on the cuffs, and waist hem.
                New minimalist branding is seen in the rubberized Essentials
                Fear of God black bar on the cuff. A Fear of God rubberized
                label is at the back collar.
              </p>
            </div>

            <div className="pro_others">
              <div className="pro_single_other">
                <p
                  onClick={() => {
                    Settoggle_details(!toggle_details);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Details <span>{toggle_details ? "-" : "+"}</span>
                </p>
                {toggle_details && (
                  <div className="pro_detail_div">
                    <ul>
                      100% reverse French Terry
                      <li>Women's Essentials fit - relaxed body, sleeves</li>
                      <li>Fear of God black bar on the center front.</li>
                      <li>Side seam pockets</li>
                      <li>
                        Mock neckline, cuffs, and waistband with stretch binding
                      </li>
                      <li>
                        Essentials Fear of God rubberized black bar on cuff
                      </li>
                      <li>Fear of God rubberized label at back collar</li>
                      <li>Imported</li>
                    </ul>
                  </div>
                )}
              </div>


              <div className="pro_single_other">
                <p
                  onClick={() => {
                    Settoggle_shipping(!toggle_shipping);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Shipping Policy <span>{toggle_shipping ? "-" : "+"}</span>
                </p>
                {toggle_shipping && (
                  <div class="pro_detail_div">
                    <ul>
                      <li>
                        Standard processing time for orders is 5-7 business days
                        to be processed and shipped.
                      </li>

                      <li>
                        Read our full Shipping Policy HERE.
                      </li>
                    </ul>
                  </div>
                )}
              </div>


              <div className="pro_single_other">
                <p
                  onClick={() => {
                    Settoggle_share(!toggle_share);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Share <span>{toggle_share ? "-" : "+"}</span>
                </p>
                {toggle_share && (
                  <div class="pro_detail_div pro_social">
                    <p>Facebook</p>
                    <p>Instagram</p>
                    <p>Whatsapp</p>
                  </div>
                )}
              </div>
            </div>

            {isScrolled && 
              <>
              <div className="pro_variants">
                <div className="single_variant">
                  <div className="single_box">
                    <p>Vintage White</p>
                  </div>
                  <p className="pro_vari_detail">MORE COLORS</p>
                </div>

                <div className="single_variant">
                  <div className="single_box" onClick={()=>{Setopensize(!opensize)}}>
                    <p>Select Size</p>
                    {!opensize ? <MdKeyboardArrowDown/> : <MdKeyboardArrowUp/>}
                  </div>
                  <p className="pro_vari_detail">Size Chart</p>
                  {opensize && 
                  <div className="size_chart_pro">
                    {sizes.map((el,i)=>(
                        <div className="single_size">
                         <p>{el.size}</p>
                        </div>
                    ))}
                </div>
                }
                  
                </div>
              </div>

              <div className="pro_btn_addtocart">
                <p>Add to Cart</p>
              </div>
              </>
              }

            {isMobileMode &&  
              <div className="res-div-op">
                {!isScrolled && 
                <>
              <div className="pro_variants">
                <div className="single_variant">
                  <div className="single_box">
                    <p>Vintage White</p>
                  </div>
                  <p className="pro_vari_detail">MORE COLORS</p>
                </div>

                <div className="single_variant">
                  <div className="single_box" onClick={()=>{Setopensize(!opensize)}}>
                    <p>Select Size</p>
                    {!opensize ? <MdKeyboardArrowDown/> : <MdKeyboardArrowUp/>}
                  </div>
                  <p className="pro_vari_detail">Size Chart</p>
                  {opensize && 
                  <div className="size_chart_pro">
                    {sizes.map((el,i)=>(
                        <div className="single_size">
                         <p>{el.size}</p>
                        </div>
                    ))}
                </div>
                }
                  
                </div>
              </div>

              <div className="pro_btn_addtocart">
                <p>Add to Cart</p>
              </div>
              </>
              }
              </div>
              }
          </div>
        </div>
      </div>

      <div className="pro_you_may">
        <p className="head_pro_you">YOU MAY ALSO LIKE</p>
        <div className="pro_you_may_div">
            {you_may.map((el,i)=>(
                <div className="you_img_div">
                  <img src={el.img} className="pro_img_you_may"/>
                  <p>ESSENTIALS</p>
                  <p>{el.name}</p>
                  <p style={{marginTop:'10px', color:'rgba(0,0,0,0.7)'}}>&#8377; {el.price}</p>
                </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Product;
