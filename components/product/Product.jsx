import React from "react";
import Navbar from "../common/Navbar2";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import Caursel from "./Caursel";
import { useState, useRef, useEffect } from "react";
import { FiMinus } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { updateCartFromBackend } from "../../features/cart/CartSlice";
import { FaPlus } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import ProductLoader from "../loaders/ProductLoader";
import Footer from "../common/Footer";
import toast, { Toaster } from "react-hot-toast";
import { addtocart, editqty } from "../../features/cart/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { IoPlayCircleOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import Cart from "../common/cart";
import { checkExist, FinalPrice } from "../../api_fetch/admin/Cart";
import { editProduct } from "../../api_fetch/admin/Product";

const Product = () => {
  const router = useRouter();
  const [prices, setPrices] = useState([]);
  const [productId, SetproductId] = useState("");
  const [videoplay, Setvideoplay] = useState(true);
  const [active1, setactive1] = useState(true);

  const [media, Setmedia] = useState([]);
  const [mediabig, Setmediabig] = useState([]);
  const [active2, setactive2] = useState(false);
  const [active3, setactive3] = useState(false);
  const [color2, setcolor2] = useState(false);
  const [backend, setBackend] = useState({
    name: "",
    images: [],
    videos: [],
    videoPreviewImgs: [""],
    ribbon: "",
    info: "",
    delivery: "",
    returns: "",
    priceperunit: null,
    customTexts: [],
    sku: "0",
    discountTypeRs: false,
    discountperunit: 0,
    variants: [],
    variantsData: [[{}]],
    variantsDetails: [
      {
        priceDifference: 0,
        visibility: true,
        inventory: "In stock",
        _id: {
          $oid: `${productId}`,
        },
      },
    ],
    status: true,
    preOrder: true,
    categories: [],
    ind: 0,
    connectedImage: [],
    color: false,
    colorVar: [
      {
        title: "Color",
        options: [],
        _id: {
          $oid: `${productId}`,
        },
      },
    ],
  });
  const [finalprice, Setfinalprice] = useState(backend.priceperunit);
  const [cartdata, Setcartdata] = useState({
    name: backend.name,
    img: backend.images[0],
    qty: 1,
    price: backend.priceperunit,
  });
  const [cartdata2, Setcartdata2] = useState({
    name: backend.name,
    img: backend.images[0],
    qty: 1,
    price: backend.priceperunit,
  });
  
  const [selectedVariants, setSelectedVariants] = useState({});
  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        // Make a GET request to the API endpoint with the provided productId
        // const response = await fetch(
        //   `https://mamosh-backend.vercel.app/api/products/getOne/${productId}`
        // );

        const data = await editProduct(productId);
        console.log(data, "daaaaaaaa");

        // Check if the response is successful (status code 200)
        if (data) {
          // Parse the response JSON and update the state variable
          // const data = await response.json();
          setBackend(data);
          const d = {
            name: data.name,
            img: data.images[0],
            qty: 1,
            price: data.priceperunit,
            priceperunit: data.priceperunit,
            discountperunit: data.discountperunit,
            customTexts: data.customTexts,
          };
          Setcartdata(d);
          Setcartdata2(d);
          Setfinalprice(data.priceperunit);

          if (data.discountTypeRs) {
            Setfinalprice(data.priceperunit - data.discountperunit);
          } else {
            return;
          }
          let tempmedia = [...data.images, ...data.videoPreviewImgs];
          let tempmediabig = [...data.images, ...data.videos];
          Setmedia(tempmedia);
          Setmediabig(tempmediabig);
        } else {
          console.error("Error fetching data:", data.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    // Call the fetchData function when the component mounts
    fetchData();
  }, [productId]);


  const items = [
    {
      name: "Colossal Checks Cream Shirt",
      img: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS2625-01-M36.jpg?v=1705060547&width=600",
    },
    {
      name: "Whiffy Blue Shirt",
      img: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS2496-01-M14.jpg?v=1704966730&width=800",
    },
  ];

  const [active, setactive] = useState(false);
  const [active_offer, setactive_offer] = useState(false);
  const [active_desc, setactive_desc] = useState(false);
  const [active_box, setactive_box] = useState(0);
  const [temp, Settemp] = useState(0);
  const [allselected, Setallselected] = useState(false);
  const [currentIndex, SetcurrentIndex] = useState(0);
  const [diffprice, Setdiffprice] = useState(0);
  const [colorcount, Setcolorcount] = useState(0);
  const [varcount, Setvarcount] = useState(0);
  const active_box_Change = (i) => {
    setactive_box(i);
    SetcurrentIndex(i);
  };
  const [divcart, Setdivcart] = useState(false);
  const handleVariantChange = (variantTitle, option) => {
    setSelectedVariants((prevState) => ({
      ...prevState,
      [variantTitle]: option,
    }));
    let vari = backend.variants[backend.ind].title;
    if (vari == variantTitle) {
      Setvarcount(varcount + 1);
    }

    Settemp(temp + 1);
  };

  function combineObjects(obj1, obj2) {
    return { ...obj1, ...obj2 };
  }

  const check_full = (select) => {
    if (backend.color) {
      if (
        Object.keys(selectedVariants).length ===
        backend.variants.length + 1
      ) {
        Setallselected(true);
        // console.log(allselected)

        const resultIndex = linearSearch(backend.variantsData, select);
        console.log("seslct", select);
        Setdiffprice(backend.variantsDetails[resultIndex].priceDifference || 0);
      }
    } else {
      if (Object.keys(selectedVariants).length === backend.variants.length) {
        Setallselected(true);

        const resultIndex = linearSearch(backend.variantsData, select);
        Setdiffprice(backend.variantsDetails[resultIndex].priceDifference || 0);
      }
    }
  };

  useEffect(() => {
    const combinedObject = combineObjects(selectedVariants, cartdata2);
    // console.log("combine runs", selectedVariants, "cartdata", cartdata2)
    Setcartdata(combinedObject);
    if (Object.keys(selectedVariants).length != 0) {
      check_full(selectedVariants);
    }
  }, [temp]);

  // console.log(selectedVariants, "selected")
  // console.log(cartdata, "cartdata selected")
  // console.log("temp", temp)

  const trans = {
    transform: `translateX(calc(-${currentIndex} * ${
      100 / (backend.images.length + backend.videoPreviewImgs.length)
    }%))`,

    width: `${
      100 * (backend.images.length + backend.videoPreviewImgs.length)
    }%`,
  };
  let menuRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setactive(false);
      }
    };
    // document.addEventListener("mousedown", handler);
  });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const fullinfocart = useSelector((state) => state.cart);
  const [totalamount, Settotalamount] = useState(0);

  const [userlogged, Setuserlogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      Setuserlogged(true);
      console.log("loggedin");

      fetch(`https://mamosh-backend.vercel.app/api/addcart/checkExist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          dispatch(updateCartFromBackend(data.existingCart));
          console.log("check hua cart");
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    }


    const variants = backend.variants || [];
        const selected = {};

        variants.forEach((variant) => {
          if (variant.title && variant.options && variant.options.length > 0) {
            selected[variant.title] = variant.options[0];
          }
        });

        if(backend.color){
          console.log("trueeee")
          setSelectedVariants({Color:backend.colorVar[0].options[0]})
        }
        console.log(selected,"selected other")
        setSelectedVariants({...selectedVariants, ...selected})
        console.log(selectedVariants, "seleted")
  }, []);
  //   useEffect(() => {
  //     const token = localStorage.getItem("token");
  //     if (token) {

  //         // Fetch the API endpoint
  //         fetch(`https://mamosh-backend.vercel.app/api/addcart/checkvar`, {
  //             method: 'POST',
  //             headers: {
  //                 'Content-Type': 'application/json',
  //             },
  //             body: JSON.stringify({ token }),
  //         })
  //         .then(response => {
  //             if (!response.ok) {
  //                 throw new Error('Network response was not ok');
  //             }
  //             return response.json();
  //         })
  //         .then(data => {
  //             // Handle the response data
  //             console.log(data,"yayayayayay");
  //             dispatch(updateCartFromBackend(data))
  //         })
  //         .catch(error => {
  //             // Handle errors
  //             console.error('There was a problem with the fetch operation:', error);
  //         });
  //     }
  // }, []);

  useEffect(() => {
    if (backend.connectedImage.length !== 0) {
      if (backend.ind === backend.variants.length) {
        // color
        let selectcol = selectedVariants.Color;
        let selind = backend.colorVar[0].options.indexOf(selectcol);
        let tempseriescol = backend.connectedImage[selind];
        let tempbig = [...tempseriescol, ...backend.videos];
        tempseriescol = [...tempseriescol, ...backend.videoPreviewImgs];
        Setmedia(tempseriescol);
        Setmediabig(tempbig);
      }
    }
  }, [colorcount]);

  useEffect(() => {
    if (backend.connectedImage.length !== 0) {
      if (backend.ind !== backend.variants.length) {
        let vari = backend.variants[backend.ind].title; //get size as title
        let selvari = selectedVariants[vari]; // get a size
        let selind = backend.variants[backend.ind].options.indexOf(selvari);
        console.log(selind, "selvari");
        if (backend.connectedImage[selind].length === 0) {
          let tm = [...backend.images, ...backend.videoPreviewImgs];
          let tmv = [...backend.images, ...backend.videos];
          Setmedia(tm);
          Setmediabig(tmv);
        } else {
          let tempseriescol = backend.connectedImage[selind];
          let tempbig = [...tempseriescol, ...backend.videos];
          tempseriescol = [...tempseriescol, ...backend.videoPreviewImgs];
          Setmedia(tempseriescol);
          Setmediabig(tempbig);
        }
      }
    }
  }, [varcount]);

  // Call calculateFinalPrice whenever selectedVariants state changes
  function linearSearch(arr, criteria) {
    for (let i = 0; i < arr.length; i++) {
      const variant = arr[i];

      // Check if the variant object matches the search criteria
      if (isObjectMatch(variant, criteria)) {
        return i; // Return the index where the match is found
      }
    }

    return -1; // Return -1 if no match is found
  }

  function isObjectMatch(obj, criteria) {
    // Check if all properties in criteria match corresponding properties in obj
    return Object.keys(criteria).every((key) =>
      obj.some((prop) => prop[key] === criteria[key])
    );
  }

  const addtoCart = (value) => {
    const vararray = [];
    vararray.push(selectedVariants);
    value = {
      ...value,
      variants: vararray,
      price: finalprice + diffprice,
      productid: productId,
    };

    console.log(value, "value");
    console.log(fullinfocart, "full");

    // console.log(cart, "full2")
    if (backend.color) {
      if (
        Object.keys(selectedVariants).length ===
        backend.variants.length + 1
      ) {
        setactive(true);
        Setdivcart(true);
        dispatch(
          addtocart({
            ...value,
            price: finalprice + diffprice,
            productid: productId,
          })
        );
      } else {
        toast.error("Select all varients");
        console.log(selectedVariants,"selected")
        // alert("Select all varients")
      }
    } else {
      if (Object.keys(selectedVariants).length === backend.variants.length) {
        setactive(true);
        Setdivcart(true);
        dispatch(
          addtocart({
            ...value,
            price: finalprice + diffprice,
            productid: productId,
          })
        );
      } else {
        toast.error("Select all varients");
        // alert("Select all varients")
      }
    }
  };

  useEffect(() => {
    // Function to fetch data based on the query string
    const fetchData = async () => {
      try {
        // Get the query parameters from the router
        const {
          query: { id },
        } = router;

        // Set the productId state
        SetproductId(id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchData function when the component mounts or when the query string changes
    fetchData();
  }, [router.query]);

  useEffect(() => {
    const fetchPrices = async () => {
      const updatedPrices = await Promise.all(
        cart.map(async (el) => {
          // Start from index 1
          try {
            const data = await FinalPrice({
              productid: el.productid,
              variants: el.variants[0], // assuming variants is an array and you want to send the first variant
            });
            // const data = await response.json();
            console.log("plplpll", data);
            return data; // Assuming you get the price from the response
          } catch (error) {
            console.error("Error fetching price:", error);
            return null;
          }
        })
      );
      setPrices(updatedPrices);
      console.log("kokok", updatedPrices);
      let sum = 0;
      for (let i = 0; i < updatedPrices.length; i++) {
        sum += updatedPrices[i];
      }
      console.log("total amount", sum);
      Settotalamount(sum);
    };
    {
      cart && fetchPrices();
    }
  }, [cart]);

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
  let you_may = [
    {
      img: "https://fearofgod.com/cdn/shop/files/tvp0sczkigfzq1arpjqj_900x.jpg?v=1707185483",
      name: "Womens Essentials Sweatpaint",
      price: "65",
    },
    {
      img: "https://fearofgod.com/cdn/shop/files/tvp0sczkigfzq1arpjqj_900x.jpg?v=1707185483",
      name: "Womens Running Short",
      price: "85",
    },
    {
      img: "https://fearofgod.com/cdn/shop/files/oicem6mfx5iensf2obhn_900x.jpg?v=1707185482",
      name: "Nylon Halfzip Mockneck",
      price: "185",
    },
    {
      img: "https://fearofgod.com/cdn/shop/files/zjpq6hsbohjhacmajfx0_900x.jpg?v=1707185483",
      name: "Womens Running Short",
      price: "55",
    },
  ];
  let sizes = [
    {
      size: "XXS",
    },
    {
      size: "XS",
    },
    {
      size: "S",
    },
    {
      size: "M",
    },
    {
      size: "L",
    },
    {
      size: "XL",
    },
    {
      size: "XLL",
    },
  ];
  const [toggle_details, Settoggle_details] = useState(false);
  const [toggle_shipping, Settoggle_shipping] = useState(false);
  const [toggle_share, Settoggle_share] = useState(false);
  const [opensize, Setopensize] = useState(false);

  const [isMobileMode, setIsMobileMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [defcol,Setdefcol] = useState(0)

  const defaultvari = ()=>{
    if(backend.color){
      setSelectedVariants({Color : backend.colorVar[0].options[0],...selectedVariants})
      console.log(selectedVariants,"default")
    }
  }

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
    window.addEventListener("scroll", handleScroll);

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    console.log(selectedVariants,"selected")
    // defaultvari()

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="pro_main">
        {!isMobileMode ? (
          <div className="pro_img">
            {/* {images.map((el, i) => (
            <img src={el.img} className="pro_img_seperate" />
          ))} */}
            {mediabig.map((media, i) => (
              <div key={i}>
                {media.includes(".mp4") ? (
                  <div
                    onClick={() => {
                      Setvideoplay(!videoplay);
                    }}
                  >
                    {videoplay && <IoPlayCircleOutline className="play" />}
                    <video
                      src={media}
                      loop
                      controls
                      style={{ height: "165%" }}
                    ></video>
                  </div>
                ) : (
                  <img key={i} src={media} className="pro_img_seperate" />
                )}
              </div>
            ))}
          </div>
        ) : (
          <Caursel />
        )}

        <div className="pro_content">
          <div className="pro_inside_content">
            <div className="pro_head">
              <p className="pro_p_one">ESSENTIALS</p>
              <p className="pro_p_main">{backend.name}</p>
              <p className="pro_p_price">Rs. {finalprice + diffprice}</p>

              {!isMobileMode && (
                <>
                {backend.color && (
                <>
                  <p className="detail-p2">COLOR</p>
                  <div className="color-main-div">
                    {backend.colorVar.map((colorVarOption, i) => (
                      <div className="color-div" key={i}>
                        {colorVarOption.options.map((color, j) => (
                          <div
                            key={j}
                            className={`big-color ${
                              (color2 && (selectedVariants.Color === color) || j==defcol)
                                ? "color2"
                                : ""
                            }`}
                            onClick={() => {
                              setcolor2(true);
                              // Setcartdata((prevCartdata) => ({
                              //   ...prevCartdata,
                              //   color,
                              // }));
                              console.log(selectedVariants,"default")
                              // if(j!=0){
                                Setdefcol(j)
                              
                              setSelectedVariants({
                                ...selectedVariants,
                                Color: color,
                              });
                              Settemp(temp + 1);
                              Setcolorcount(colorcount + 1);
                            }}
                          >
                            <div
                              className="color"
                              style={{ backgroundColor: color }}
                              onClick={() => {
                                setcolor2(true);
                                // Setcartdata((prevCartdata) => ({
                                //   ...prevCartdata,
                                //   color,
                                // }));
                                setSelectedVariants({
                                  ...selectedVariants,
                                  Color: color,
                                });
                                Settemp(temp + 1);
                              }}
                            ></div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </>
              )}
                  <div className="pro_variants">
                    {backend.variants.map((el, i) => (
                      <div className="single_variant" key={i}>
                        <div
                          style={{
                            display: "flex",
                            position: "relative",
                          }}
                        >
                          <select
                            className="single_box"
                            onChange={(e) => {
                              handleVariantChange(el.title, e.target.value);
                            }}
                          >
                            <option>Select {el.title}</option>
                            {el.options.map((op, j) => (
                              <option key={j}>{op}</option>
                            ))}
                          </select>
                          {/* <IoIosArrowDown className="cart-logo2" /> */}
                        </div>
                        <p className="pro_vari_detail">{el.title}</p>
                        {opensize && (
                          <div className="size_chart_pro">
                            {sizes.map((el, i) => (
                              <div className="single_size">
                                <p>{el.size}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <p className="detail-p2">QUANTITY</p>
              <div className="qty-detail">
                <div
                  className="btn_detail2"
                  onClick={() => {
                    if (cartdata.qty > 1) {
                      Setcartdata((prevCartdata) => ({
                        ...prevCartdata,
                        qty: prevCartdata.qty - 1,
                      }));
                    }
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <FiMinus />
                </div>
                <div className="btn1">
                  <p>{cartdata.qty}</p>
                </div>
                <div
                  className="btn_detail2"
                  onClick={() => {
                    Setcartdata((prevCartdata) => ({
                      ...prevCartdata,
                      qty: prevCartdata.qty + 1,
                    }));
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <FaPlus />
                </div>
              </div>


                  <div className="pro_btn_addtocart" onClick={() => {
                  addtoCart(cartdata);
                }}>
                    <p>Add to Cart</p>
                  </div>
                </>
              )}

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

                      <li>Read our full Shipping Policy HERE.</li>
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
            <Cart active={active} setactive={setactive} divcart={divcart} Setdivcart={Setdivcart}/>

            {isScrolled && (
              <>
                <div className="pro_variants">
                  <div className="single_variant">
                    <div className="single_box">
                      <p>Vintage White</p>
                    </div>
                    <p className="pro_vari_detail">MORE COLORS</p>
                  </div>

                  <div className="single_variant">
                    <div
                      className="single_box"
                      onClick={() => {
                        Setopensize(!opensize);
                      }}
                    >
                      <p>Select Size</p>
                      {!opensize ? (
                        <MdKeyboardArrowDown />
                      ) : (
                        <MdKeyboardArrowUp />
                      )}
                    </div>
                    <p className="pro_vari_detail">Size Chart</p>
                    {opensize && (
                      <div className="size_chart_pro">
                        {sizes.map((el, i) => (
                          <div className="single_size">
                            <p>{el.size}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="pro_btn_addtocart">
                  <p>Add to Cart</p>
                </div>
              </>
            )}

            {isMobileMode && (
              <div className="res-div-op">
                {!isScrolled && (
                  <>
                    <div className="pro_variants">
                      <div className="single_variant">
                        <div className="single_box">
                          <p>Vintage White</p>
                        </div>
                        <p className="pro_vari_detail">MORE COLORS</p>
                      </div>

                      <div className="single_variant">
                        <div
                          className="single_box"
                          onClick={() => {
                            Setopensize(!opensize);
                          }}
                        >
                          <p>Select Size</p>
                          {!opensize ? (
                            <MdKeyboardArrowDown />
                          ) : (
                            <MdKeyboardArrowUp />
                          )}
                        </div>
                        <p className="pro_vari_detail">Size Chart</p>
                        {opensize && (
                          <div className="size_chart_pro">
                            {sizes.map((el, i) => (
                              <div className="single_size">
                                <p>{el.size}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pro_btn_addtocart">
                      <p>Add to Cart</p>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="pro_you_may">
        <p className="head_pro_you">YOU MAY ALSO LIKE</p>
        <div className="pro_you_may_div">
          {you_may.map((el, i) => (
            <div className="you_img_div">
              <img src={el.img} className="pro_img_you_may" />
              <p>ESSENTIALS</p>
              <p>{el.name}</p>
              <p style={{ marginTop: "10px", color: "rgba(0,0,0,0.7)" }}>
                &#8377; {el.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Product;
