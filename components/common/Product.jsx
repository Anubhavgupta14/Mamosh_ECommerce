import React from "react";
import { useState, useRef, useEffect } from "react";
import { FiMinus } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import {updateCartFromBackend} from "../../features/cart/CartSlice"
import { FaPlus } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import ProductLoader from "../loaders/ProductLoader"
import Footer from "./Footer";
import toast, { Toaster } from "react-hot-toast";
import { addtocart, editqty } from "../../features/cart/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { IoPlayCircleOutline } from "react-icons/io5";
import { useRouter } from 'next/router';
import Navbar from "./Navbar2"
import Cart from "./cart"

const Detail = () => {
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
  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        // Make a GET request to the API endpoint with the provided productId
        const response = await fetch(
          `https://mamosh-backend.vercel.app/api/products/getOne/${productId}`
        );

        // Check if the response is successful (status code 200)
        if (response.ok) {
          // Parse the response JSON and update the state variable
          const data = await response.json();
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
          console.error("Error fetching data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    // Call the fetchData function when the component mounts
    fetchData();
  }, [productId]);

  const [selectedVariants, setSelectedVariants] = useState({});

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
  const [divcart, Setdivcart] = useState(false)
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
        console.log("seslct",select)
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
    check_full(selectedVariants);
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
  const isSmallScreen = windowWidth < 768;

  const contentHeight = isSmallScreen ? 500 : 906;
  const contentWidth = isSmallScreen ? 343.5 : 611.5;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const totalprice = useSelector((state) => state.cart.totalprice);
  const itemcount = useSelector((state) => state.cart.itemcount);
  const fullinfocart = useSelector((state) => state.cart);
  const [totalamount, Settotalamount] = useState(0)

  const [userlogged, Setuserlogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
        Setuserlogged(true);
        console.log("loggedin");

        
         fetch(`https://mamosh-backend.vercel.app/api/addcart/checkExist`, {
             method: 'POST',
            headers: {
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify({ token }),
         })
         .then(response => {
             if (!response.ok) {
                 throw new Error('Network response was not ok');
             }
             return response.json();
         })
         .then(data => {
            
             console.log(data);
             dispatch(updateCartFromBackend(data.existingCart))
             console.log("check hua cart")
         })
         .catch(error => {
          
             console.error('There was a problem with the fetch operation:', error);
         });
    }
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
        console.log(selind,"selvari")
        if (backend.connectedImage[selind].length===0) {
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
    value = { ...value, variants: vararray, price: finalprice + diffprice, productid: productId };

    console.log(value, "value");
    console.log(fullinfocart, "full");

    // console.log(cart, "full2")
    if (backend.color) {
      if (
        Object.keys(selectedVariants).length ===
        backend.variants.length + 1
      ) {
        setactive(true);
        Setdivcart(true)
        dispatch(addtocart({ ...value, price: finalprice + diffprice, productid: productId }));
      } else {
        toast.error("Select all varients");
        // alert("Select all varients")
      }
    } else {
      if (Object.keys(selectedVariants).length === backend.variants.length) {
        setactive(true);
        Setdivcart(true)
        dispatch(addtocart({ ...value, price: finalprice + diffprice, productid: productId }));
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
        const { query: { id } } = router;

        // Set the productId state
        SetproductId(id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchData function when the component mounts or when the query string changes
    fetchData();
  }, [router.query]);

  const checkout = () => {
    navigate(`/checkout`);
  };

  const logout = () => {
    localStorage.removeItem("persist:root");
    Setuserlogged(false);
    window.location.reload();
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const fetchPrices = async () => {
      
      const updatedPrices = await Promise.all(
        
        cart.map(async (el) => { // Start from index 1
          try {
            const response = await fetch(
              `https://mamosh-backend.vercel.app/api/products/getFinalPrice`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  productid: el.productid,
                  variants: el.variants[0], // assuming variants is an array and you want to send the first variant
                }),
              }
            );
            const data = await response.json();
            console.log("plplpll",data)
            return data; // Assuming you get the price from the response
          } catch (error) {
            console.error("Error fetching price:", error);
            return null;
          }
        })
      );
      setPrices(updatedPrices);
      console.log("kokok", updatedPrices)
      let sum = 0;
      for (let i = 0; i < updatedPrices.length; i++) {
        sum += updatedPrices[i];
      }
      console.log("total amount", sum)
      Settotalamount(sum)
    };
    {cart &&
    fetchPrices();
    }
  }, [cart]);


  

  return (
    <div>
      <Toaster />
      <Navbar/>
      {!backend.name ?
      <ProductLoader/> 
      :
      <>
      <div className="detail-imp">
        <div className={active ? "detail-main op" : "detail-main"}>
          <div className="sticky-height">
            <div className="sticky">
              <div className="div-photo">
                <div className="more-img">
                  {media.map((media, i) => (
                    <div
                      key={i}
                      className="imgs"
                      onClick={() => {
                        active_box_Change(i);
                      }}
                    >
                      <img
                        alt="error"
                        src={media}
                        width={70}
                        height={100}
                        className={active_box === i ? "bd" : "bd1"}
                      />
                    </div>
                  ))}
                </div>
                <div className="main-img">
                  <div className="middle" style={trans}>
                    
                    {mediabig.map((media, i) => (
                      <div key={i} className="big-img">
                        {media.includes(".mp4") ? (
                          <div
                            style={{
                              height: "100vh",
                              position: "relative",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              Setvideoplay(!videoplay);
                            }}
                          >
                            {videoplay && (
                              <IoPlayCircleOutline className="play" />
                            )}
                            <video
                              src={media}
                              loop
                              controls
                              style={{ height: "165%" }}
                            ></video>
                          </div>
                        ) : (
                          <img key={i} src={media} className="img_main_pro" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="detail">
            <div className="heading">
              <h2 className="detail-head">{backend.name}</h2>
              <p className="detail-p" style={{ marginTop: "3vh" }}>
                Rs. {finalprice + diffprice}
              </p>
              <p className="detail-p" style={{ marginTop: "1vh" }}>
                (incl. of all taxes)
              </p>
              <div className="br2"></div>
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
                              color2 && selectedVariants.Color === color
                                ? "color2"
                                : ""
                            }`}
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

              {backend.variants.map((el, i) => (
                <div key={i}>
                  <p className="detail-p2">{el.title}</p>
                  <div
                    style={{
                      display: "flex",
                      position: "relative",
                    }}
                    className="div-variant"
                  >
                    <select
                      className="select"
                      onChange={(e) => {
                        handleVariantChange(el.title, e.target.value);
                      }}
                    >
                      <option>Select {el.title}</option>
                      {el.options.map((op, j) => (
                        <option key={j}>{op}</option>
                      ))}
                    </select>
                    <IoIosArrowDown className="cart-logo2" />
                  </div>
                </div>
              ))}
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

              <div className="desc matter">
                <p
                  style={{
                    textAlign: "center",
                    marginBlock: "2vh",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setactive_offer(!active_offer);
                  }}
                  className="detail-p2"
                >
                  OFFERS FOR YOU{" "}
                  <span>
                    <IoIosArrowDown
                      className={
                        active_offer ? "detail-arrow arrow" : "detail-arrow"
                      }
                    />
                  </span>
                </p>
                <div className={active_offer ? "matter" : "matter dis"}>
                  <p
                    style={{
                      fontSize: "21px",
                      marginBlock: "3vh",
                      lineHeight: "20px",
                      fontWeight: "600",
                    }}
                  >
                    or Pay <span style={{ color: "#23821c" }}>₹400</span> and
                    rest later via{" "}
                    <span style={{ marginRight: "2vh", cursor: "pointer" }}>
                      <img
                        alt="error"
                        src="https://websdk-assets.s3.ap-south-1.amazonaws.com/shopify-messaging-app/snitchpay_logo.png"
                        width={137}
                        height={14}
                      />
                    </span>{" "}
                    <span style={{ cursor: "pointer" }}>
                      <img
                        alt="error"
                        src="https://websdk-assets.s3.ap-south-1.amazonaws.com/shopify-messaging-app/info-icon.png"
                        width={18}
                        height={18}
                      />
                    </span>
                  </p>
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      marginBottom: "1vh",
                      letterSpacing: "2px",
                    }}
                  >
                    BUY 1 GET 1 FREE!
                  </p>
                  <p
                    style={{
                      fontSize: "16px",
                      marginBottom: "1vh",
                      letterSpacing: "2px",
                    }}
                  >
                    Use Code :{" "}
                    <span style={{ fontWeight: "600" }}>LIKEABOSS</span>
                  </p>
                  <p
                    style={{
                      fontSize: "16px",
                      marginBottom: "1vh",
                      letterSpacing: "2px",
                    }}
                  >
                    Hurry! Limited Period Offer.
                  </p>
                </div>
              </div>

              <div className="desc matter" style={{ marginBottom: "2vh" }}>
                <p
                  style={{
                    textAlign: "center",
                    marginBlock: "2vh",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setactive_desc(!active_desc);
                  }}
                  className="detail-p2"
                >
                  DESCRIPTION
                  <span>
                    <IoIosArrowDown
                      className={
                        active_desc ? "detail-arrow arrow" : "detail-arrow"
                      }
                    />
                  </span>
                </p>
                <div className={active_desc ? "matter" : "matter dis"}>
                  <p
                    style={{
                      fontSize: "16px",
                      marginBottom: "1vh",
                      letterSpacing: "2px",
                    }}
                  >
                    {backend.info}
                  </p>

                  {/* <table style={{ marginBlock: "2vh" }}>
                    <tbody>
                      <tr>
                        <td className="td">Top Note</td>
                        <td className="td2">
                          Lemon, Green Notes, Bergamot, Mandarin Orange,
                          Pineapple, Cardamom, Papaya
                        </td>
                      </tr>
                      <tr>
                        <td className="td">Middle Note</td>
                        <td className="td2">
                          Lily of the Valley, Jasmine, Violet, Nutmeg, Rose,
                          Orris Root, Freesia
                        </td>
                      </tr>
                      <tr>
                        <td className="td">Base Note</td>
                        <td className="td2">
                          LGreen Accord, Musk, Cedar, Sandalwood, Oakmoss, Green
                          Tea, Amber
                        </td>
                      </tr>
                      <tr>
                        <td className="td">Fragrance Family</td>
                        <td className="td2">
                          Citrus, Green, Woody, Musky, Floral
                        </td>
                      </tr>
                    </tbody>
                  </table> */}
                  {/* <p style={{ fontWeight: "600", fontSize: "20px" }}>
                    Fragrance Type:{" "}
                    <span style={{ fontStyle: "italic", fontWeight: "500" }}>
                      Eau de Parfum
                    </span>
                  </p>
                  <p style={{ fontWeight: "600", fontSize: "20px" }}>
                    Size:{" "}
                    <span style={{ fontStyle: "italic", fontWeight: "500" }}>
                      100ml
                    </span>
                  </p>
                  <p style={{ fontWeight: "600", fontSize: "20px" }}>
                    Occasion:{" "}
                    <span style={{ fontStyle: "italic", fontWeight: "500" }}>
                      Casual
                    </span>
                  </p>
                  <p style={{ fontWeight: "600", fontSize: "20px" }}>
                    Usage Instructions:{" "}
                    <span style={{ fontStyle: "italic", fontWeight: "500" }}>
                      Spray on all pulse points chest, neck and wrists
                    </span>
                  </p>
                  <p style={{ fontWeight: "600", fontSize: "20px" }}>
                    Best Before:{" "}
                    <span style={{ fontStyle: "italic", fontWeight: "500" }}>
                      36 months from date of manufacturing
                    </span>
                  </p> */}
                  <p style={{ fontWeight: "600", fontSize: "20px" }}>
                    Delivery:{" "}
                    <span style={{ fontStyle: "italic", fontWeight: "500" }}>
                      {backend.delivery}
                    </span>
                  </p>

                  <p style={{ fontWeight: "600", fontSize: "20px" }}>
                    SKU:{" "}
                    <span style={{ fontStyle: "italic", fontWeight: "500" }}>
                      {backend.sku}
                    </span>
                  </p>
                  <p style={{ fontWeight: "600", fontSize: "20px" }}>
                    Returns:{" "}
                    <span style={{ fontStyle: "italic", fontWeight: "500" }}>
                      {backend.returns}
                    </span>
                  </p>
                </div>
              </div>

              <button className="detail-btn3">SELECT A SIZE</button>
              <button
                className="detail-btn3"
                onClick={() => {
                  addtoCart(cartdata);
                }}
              >
                ADD TO CART
              </button>
              <div className="detail-btn4">
                <CiHeart className="heart" />
                <p>Add to Wishlist</p>
              </div>
              <div className="pin-div">
                <p className="input-p">Estimated Delivery Date & COD Checker</p>
                <div className="input-place">
                  <input
                    placeholder="Enter your pincode"
                    className="input-field"
                  ></input>
                  <button className="input-btn">CHECK</button>
                </div>
              </div>
              <div className="chart">
                <p
                  className="detail-p2"
                  style={{ textAlign: "center", fontSize: "18px" }}
                >
                  Size Guide
                </p>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <tbody>
                    <tr>
                      <th className="td3"></th>
                      <th className="td3" style={{ fontWeight: "600" }}>
                        CHEST
                      </th>
                      <th className="td3" style={{ fontWeight: "600" }}>
                        SLEEVE LENGTH
                      </th>
                      <th className="td3" style={{ fontWeight: "600" }}>
                        FRONT LENGTH
                      </th>
                    </tr>
                    <tr>
                      <td className="td3" style={{ fontWeight: "600" }}>
                        S
                      </td>
                      <td className="td3">39</td>
                      <td className="td3">24</td>
                      <td className="td3">26</td>
                    </tr>
                    <tr>
                      <td className="td3" style={{ fontWeight: "600" }}>
                        M
                      </td>
                      <td className="td3">41</td>
                      <td className="td3">25</td>
                      <td className="td3">27</td>
                    </tr>
                    <tr>
                      <td className="td3" style={{ fontWeight: "600" }}>
                        L
                      </td>
                      <td className="td3">43</td>
                      <td className="td3">25.5</td>
                      <td className="td3">28</td>
                    </tr>
                    <tr>
                      <td className="td3" style={{ fontWeight: "600" }}>
                        XL
                      </td>
                      <td className="td3">45</td>
                      <td className="td3">26</td>
                      <td className="td3">29</td>
                    </tr>
                    <tr>
                      <td className="td3" style={{ fontWeight: "600" }}>
                        XXL
                      </td>
                      <td className="td3">46</td>
                      <td className="td3">26.5</td>
                      <td className="td3">30</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Cart active={active} setactive={setactive} divcart={divcart} Setdivcart={Setdivcart}/>
      </div>
      <div className={active ? "recent-div op" : "recent-div"}>
        <div className="br3"></div>
        <p className="p-head">RECENTLY VIEWED</p>
        <div className="detail-items">
          {items.map((el, i) => (
            <div key={i} style={{ cursor: "pointer" }}>
              <img src={el.img} width={250} height={380} alt="error" />
              <p style={{ textAlign: "center" }}>{el.name}</p>
            </div>
          ))}
        </div>
        <div className="manu-detail">
          <div className="tab">
            <div
              className={active1 ? "tab1 bg_change" : "tab1"}
              onClick={() => {
                setactive1(true);
                setactive2(false);
                setactive3(false);
              }}
            >
              <p>Manufacturing Details</p>
            </div>
            <div
              className={active2 ? "tab1 bg_change" : "tab1"}
              onClick={() => {
                setactive1(false);
                setactive2(true);
                setactive3(false);
              }}
            >
              <p>Returns / Exchange Policy</p>
            </div>
            <div
              className={active3 ? "tab1 bg_change" : "tab1"}
              onClick={() => {
                setactive1(false);
                setactive2(false);
                setactive3(true);
              }}
            >
              <p>Country of Origin</p>
            </div>
          </div>
          <div className={active1 ? "tab2" : "tab2 dis"}>
            <div className="subtab">
              <p style={{ fontWeight: "600" }}>Manufactured By:</p>
              <p>Aroma De France</p>
            </div>
            <div className="subtab">
              <p style={{ fontWeight: "600" }}>Marketed By:</p>
              <p>Snitch Apparels Pvt. Ltd.</p>
              <p style={{ marginBottom: "2vh" }}>
                No 1/1, St. Johns Church Road, Bharathinagar, Bengaluru - 560005
              </p>
            </div>
          </div>
          <div className={active2 ? "tab2" : "tab2 dis"}>
            <div className="subtab">
              <p>{backend.returns}</p>
              <p>
                For more details on our Returns & Exchange Policies, please{" "}
                <span style={{ fontWeight: "600" }}>click here․</span>
              </p>
            </div>
          </div>
          <div className={active3 ? "tab2" : "tab2 dis"}>
            <div className="subtab">
              <p>India</p>
            </div>
          </div>
        </div>
        <div className="br3"></div>
      </div>
      </>
      }
      <Footer active2={active} />
    </div>
  );
};

export default Detail;
