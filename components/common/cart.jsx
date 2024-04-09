import React from "react";
import { useState, useRef, useEffect } from "react";
import { FiMinus } from "react-icons/fi";
// import { IoIosArrowDown } from "react-icons/io";
import { updateCartFromBackend } from "../../features/cart/CartSlice";
// import { FaPlus } from "react-icons/fa6";
import { RiMastercardLine } from "react-icons/ri";
import { FaApplePay } from "react-icons/fa";
import { RiVisaLine } from "react-icons/ri";
// import { CiHeart } from "react-icons/ci";
// import ProductLoader from "../loaders/ProductLoader";
import { TbBrandPaypal } from "react-icons/tb";
import OutsideClickHandler from "react-outside-click-handler";
// import Footer from "../footer/Footer";
import { Navigate, useLocation } from "react-router-dom";
// import { CiShoppingCart } from "react-icons/ci";
import { RiDeleteBin2Line } from "react-icons/ri";
// import "../../../styles/detail.css";
import { FaGooglePay } from "react-icons/fa6";
// import { RxCross2 } from "react-icons/rx";
import toast, { Toaster } from "react-hot-toast";
import FinalpriceLoader from "../loaders/FinalpriceLoader";
// import { IoIosArrowForward } from "react-icons/io";
// import ContentZoom from "react-content-zoom";
import { addtocart, editqty } from "../../features/cart/CartSlice";
import { useDispatch, useSelector } from "react-redux";
// import { IoPlayCircleOutline } from "react-icons/io5";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../navbar/Navbar2";
import { FiPlus } from "react-icons/fi";
import { useRouter } from 'next/router';
// import { GoPlus } from "react-icons/go";

const Detail = ({ active, setactive, divcart, Setdivcart }) => {
  // const navigate = useNavigate();
  const router = useRouter();
  const [prices, setPrices] = useState([]);
  const location = router.pathname;
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

  //   const [active, setactive] = useState(false);
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
  const totalprice = useSelector((state) => state.totalprice);
  const itemcount = useSelector((state) => state.cart.itemcount);
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
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
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
        if (selind >= backend.connectedImage.length) {
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
    } else {
      if (Object.keys(selectedVariants).length === backend.variants.length) {
        setactive(true);
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
        // Parse the query string
        const searchParams = new URLSearchParams(location.search);

        // Convert the query parameters to an object
        const param1 = searchParams.get("id");
        // console.log(param1,"=> param 1")
        const paramsObject = {};
        for (const [key, value] of searchParams.entries()) {
          paramsObject[key] = value;
        }
        // console.log(paramsObject,"=> paramsobject")
        SetproductId(paramsObject.id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchData function when the component mounts or when the query string changes
    fetchData();
  }, [location.search]);

  const checkout = () => {
    router.push(`/checkout`);
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
        cart.map(async (el) => {
          // Start from index 1
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
        sum += updatedPrices[i] * cart[i].qty;
      }
      console.log("total amount", sum);
      Settotalamount(sum);
    };
    {
      cart && fetchPrices();
    }
  }, [cart]);

  useEffect(() => {
    // Set initial position when component mounts
    const cartDetail = document.querySelector(".cart-detail");
    if (cartDetail) {
      cartDetail.style.transform = !active
        ? "translateX(0)"
        : "translateX(-40vw)";
    }
  }, [active]);

  const may_data = [
    {
      img: "https://www.datocms-assets.com/11645/1687428692-copy-of-dsc07567-2-2-1.jpg?q=80&auto=format&dpr=1&w=800&fit=crop",
    },
    {
      img: "https://res.cloudinary.com/dhlsvwpny/image/upload/v1712142306/3_u5xr1p.jpg",
    },
    {
      img: "https://res.cloudinary.com/dhlsvwpny/image/upload/v1712142329/6_jzqguh.jpg",
    },
    {
      img: "https://res.cloudinary.com/dhlsvwpny/image/upload/v1712142302/5_arohla.jpg",
    },
  ];

  return (
    <div className="cart-parent" style={{background: active ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0)", pointerEvents:active ? "all":"none"}}>
      <OutsideClickHandler
        onOutsideClick={() => {
          setactive(false);
        }}
      >
        <Toaster />
        {active && 
        <p onClick={()=>{setactive(false)}} className="continueshop">Continue Shopping</p>
        }
        {divcart && (
          <div
            className={
              active ? "cart-detail menu-go" : "cart-detail menu-anime"
            }
          >
            <div className="cart-head">
              <p>Item {itemcount}</p>
              <div
                class="menu-close-btn flex-all"
                onClick={() => {
                  setactive(false);
                }}
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 1024 1024"
                  fill-rule="evenodd"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M799.855 166.312c.023.007.043.018.084.059l57.69 57.69c.041.041.052.06.059.084a.118.118 0 0 1 0 .069c-.007.023-.018.042-.059.083L569.926 512l287.703 287.703c.041.04.052.06.059.083a.118.118 0 0 1 0 .07c-.007.022-.018.042-.059.083l-57.69 57.69c-.041.041-.06.052-.084.059a.118.118 0 0 1-.069 0c-.023-.007-.042-.018-.083-.059L512 569.926 224.297 857.629c-.04.041-.06.052-.083.059a.118.118 0 0 1-.07 0c-.022-.007-.042-.018-.083-.059l-57.69-57.69c-.041-.041-.052-.06-.059-.084a.118.118 0 0 1 0-.069c.007-.023.018-.042.059-.083L454.073 512 166.371 224.297c-.041-.04-.052-.06-.059-.083a.118.118 0 0 1 0-.07c.007-.022.018-.042.059-.083l57.69-57.69c.041-.041.06-.052.084-.059a.118.118 0 0 1 .069 0c.023.007.042.018.083.059L512 454.073l287.703-287.702c.04-.041.06-.052.083-.059a.118.118 0 0 1 .07 0Z"></path>
                </svg>
              </div>
            </div>
            {itemcount == 0 ? (
              <div>
                <p className="no-p">
                  There's nothing in your Cart (yet). Have you seen these
                  Collections ?
                </p>

                <div className="you-may">
                  {may_data.map((el, i) => (
                    <div className="item-may" key={i}>
                      <img className="item-img" src={el.img}></img>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="main-div-cart">
                  <div className="cart_items_list">
                    {cart &&
                      cart.map((el, i) => {
                        if (true) {
                          const price = prices[i];
                          return (
                            <div className="cart-item" key={el.id}>
                              <img
                                src={el.img}
                                width={80}
                                height={100}
                                alt="error"
                              />
                              <div style={{ width: "100%" }}>
                                <div className="item-name">
                                  <p className="cart-p-main">{el.name}</p>
                                  <p
                                    className="cartremove"
                                    onClick={() => {
                                      dispatch(
                                        editqty({
                                          ...cartdata,
                                          work: -2,
                                          id: el.id,
                                          price: finalprice + diffprice,
                                        })
                                      );
                                    }}
                                  >
                                    <RiDeleteBin2Line />
                                  </p>
                                </div>

                                <div className="about-item">
                                  {el.variants.map((op, j) => (
                                    <div key={j} style={{ width: "20%" }}>
                                      {Object.keys(op).map(
                                        (
                                          key,
                                          index // Corrected usage of map
                                        ) => (
                                          <p className="cart-p" key={index}>
                                            {key}: <span>{op[key]}</span>
                                          </p>
                                        )
                                      )}
                                    </div>
                                  ))}

                                  <div className="qty-detail2">
                                    <div
                                      className="btn_detail"
                                      onClick={() => {
                                        dispatch(
                                          editqty({
                                            ...cartdata,
                                            work: -1,
                                            id: el.id,
                                            price: finalprice + diffprice,
                                          })
                                        );
                                      }}
                                      style={{ cursor: "pointer" }}
                                    >
                                      <FiMinus style={{fontSize:'11px'}} />
                                    </div>
                                    <div className="btn_edit">
                                      <p>{el.qty}</p>
                                    </div>
                                    <div
                                      className="btn_detail"
                                      onClick={() => {
                                        dispatch(
                                          editqty({
                                            ...cartdata,
                                            work: 1,
                                            id: el.id,
                                            price: finalprice + diffprice,
                                          })
                                        );
                                      }}
                                      style={{ cursor: "pointer" }}
                                    >
                                      <FiPlus className="edit-logo"/>
                                    </div>
                                  </div>
                                  {!price ? (
                                    <FinalpriceLoader />
                                  ) : (
                                    <p className="cart-p">₹ {price}</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        }
                      })}
                  </div>

                  <div className="bottom-cart">
                    <div className="br2"></div>
                    <div className="total">
                      <div className="finalprice-btn">
                        <p className="cart-p total-price">₹ {totalamount}</p>

                        <div className="order-btn" onClick={checkout}>
                          <p>Checkout</p>
                        </div>
                      </div>
                    </div>
                    <div className="after-price">
                      <div>
                        <p className="after-p">
                          {" "}
                          Your Standard Delivery is Free!
                        </p>
                        <p className="after-p">
                          Spend ₹50 more for Express Delivery
                        </p>
                      </div>
                      <div className="pay-logos-div">
                        <div className="border-logo">
                          <FaGooglePay className="pay-logo" />
                        </div>
                        <div className="border-logo">
                          <FaApplePay className="pay-logo" />
                        </div>
                        <div className="border-logo">
                          <RiMastercardLine className="pay-logo" />
                        </div>
                        <div className="border-logo">
                          <TbBrandPaypal className="pay-logo" />
                        </div>
                        <div className="border-logo">
                          <RiVisaLine className="pay-logo" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </OutsideClickHandler>
    </div>
  );
};

export default Detail;
