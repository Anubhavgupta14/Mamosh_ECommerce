import React, { useEffect } from "react";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import CategoryLoader from "../../loaders/CategoryLoader";
import { useSearchParams } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import { useRouter } from 'next/router';
// import { useNavigate } from "react-router-dom";
import OutsideClickHandler from "react-outside-click-handler";
// import img from "next/img";

const Main = ({ data, aaya, queryParams, filtersopen, setfiltersOpen }) => {
  // const navigate = useNavigate();
  const router = useRouter();
  const location = router.pathname;
  const [open, setOpen] = useState(false);
  const [activeview2, Setactiveview2] = useState(false);
  const [activeview3, Setactiveview3] = useState(false);
  const [activeview4, Setactiveview4] = useState(true);
  const [hoveredItemIndex, setHoveredItemIndex] = useState(null);
  // const [searchparams, Setsearchparams] = useSearchParams();
  const [search, Setsearch] = useState("");

  let d = data;

  console.log(d, "data pahucha")

  const handleimgHover = (index) => {
    setHoveredItemIndex(index);
  };

  const handleimgLeave = () => {
    setHoveredItemIndex(null);
  };
  const active = () => {
    Setactiveview2(true);
    Setactiveview3(false);
    Setactiveview4(false);
  };
  const active2 = () => {
    Setactiveview3(true);
    Setactiveview2(false);
    Setactiveview4(false);
  };
  const active3 = () => {
    Setactiveview4(true);
    Setactiveview3(false);
    Setactiveview2(false);
  };
  const [selected, setSelected] = useState(0);
  const sort = [
    {
      name: "Curated for you",
      url: "manual",
    },
    {
      name: "Price (Low to High)",
      url: "price-ascending",
    },
    {
      name: "Price (High to Low)",
      url: "price-descending",
    },
    {
      name: "Newly Added",
      url: "newly-added",
    },
    {
      name: "Best Seller",
      url: "best-seller",
    },
  ];
  let applySort = (sort, i) => {
    setSelected(i);
    setOpen(false);
  };

  const searchProducts = (searchTerm) => {
    // Ensure searchTerm is a string and convert it to lowercase
    const lowerCaseSearchTerm =
      searchTerm && searchTerm.toString().toLowerCase().trim();

    if (!lowerCaseSearchTerm) {
      //   // If the search term is empty, set the original data
    } else {
      // Filter data based on search term and update state
      const filteredData = data.filter((product) =>
        product.name.toLowerCase().includes(lowerCaseSearchTerm)
      );
      d = filteredData;
      console.log(d, "okokokokok");
    }
  };

  //   useEffect(() => {
  //     // Function to fetch data based on the query string
  //     const fetchData = async () => {
  //         try {
  //             // Parse the query string
  //             const searchParams = new URLSearchParams(location.search);

  //             // Convert the query parameters to an object
  //             const param1 = searchParams.get('menu');
  //             console.log(param1,"=> param 1")
  //             const paramsObject = {};
  //             for (const [key, value] of searchParams.entries()) {
  //                 paramsObject[key] = value;
  //             }

  //             // Set the state with the query parameters
  //             setQueryParams(paramsObject);
  //             console.log(paramsObject,"=> paramsobject")

  //                 const response = await fetch(`https://backend.mamoshfashion.com/api/categories/fetchcat`, {
  //                     method: 'POST',
  //                     headers: {
  //                         'Content-Type': 'application/json',
  //                     },
  //                     body: JSON.stringify(paramsObject),
  //                 });

  //                 if (!response.ok) {
  //                     throw new Error('Network response was not ok');
  //                 }

  //                 const data1 = await response.json();
  //                 Setdata(data1)
  //                 Setbackup(data1)

  //                 console.log(data1, "data")
  //         } catch (error) {
  //             console.error('Error fetching data:', error);
  //         }
  //     };

  //     // Call the fetchData function when the component mounts or when the query string changes
  //     fetchData();
  // }, [location.search]);

  const go_to_prod = (id) => {
    router.push(`/product/?id=${id}`);
  };

  return (
    <div className="main-div">
      <p className="head-collec">{queryParams.menu} {queryParams.submenu}</p>
      <div className="col-search-div">
        <div className="search-bar">
          <input
            placeholder="Search for product in this collection"
            className="search"
            onChange={(e) => {
              Setsearch(e.target.value);
              // dosearch(e.target.value)
            }}
          />
          <div className="search-btn">
            {/* <CiSearch onClick={dosearch} /> */}
          </div>
        </div>

        <div style={{ position: "relative" }} className="flex-fil">
        <OutsideClickHandler
        onOutsideClick={() => {
          setOpen(false)
        }}
      >
          <div className="view-btn" onClick={() => setOpen(!open)}>
            <p>{sort[selected].name}</p>
            <IoIosArrowDown className={`ar ${open ? "arrow" : null}`} />
          </div>
          </OutsideClickHandler>
          <div
            className="view-btn"
            onClick={() => setfiltersOpen(!filtersopen)}
          >
            <p>Filters</p>
          </div>
          <div className={`toggle-div ${open ? "toggle-visible" : null}`}>
            <ul>
              {sort.map((sort, i) => {
                return <li onClick={() => applySort(sort, i)}>{sort.name}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* <div className="menu-view">
        <div className="view">
          <p>View As</p>
          <div
            className={!activeview2 ? "box" : "box activebox_border"}
            onClick={active}
          >
            <div
              className={!activeview2 ? "boxes" : "boxes activebox_bg"}
            ></div>
            <div
              className={!activeview2 ? "boxes" : "boxes activebox_bg"}
            ></div>
          </div>
          <div
            className={!activeview3 ? "box" : "box activebox_border"}
            onClick={active2}
          >
            <div
              className={!activeview3 ? "boxes" : "boxes activebox_bg"}
            ></div>
            <div
              className={!activeview3 ? "boxes" : "boxes activebox_bg"}
            ></div>
            <div
              className={!activeview3 ? "boxes" : "boxes activebox_bg"}
            ></div>
          </div>
          <div
            className={!activeview4 ? "box box4" : "box activebox_border"}
            onClick={active3}
          >
            <div
              className={!activeview4 ? "boxes" : "boxes activebox_bg"}
            ></div>
            <div
              className={!activeview4 ? "boxes" : "boxes activebox_bg"}
            ></div>
            <div
              className={!activeview4 ? "boxes" : "boxes activebox_bg"}
            ></div>
            <div
              className={!activeview4 ? "boxes" : "boxes activebox_bg"}
            ></div>
          </div>
        </div>
        <div>
          <p>Items : {data && data.length}</p>
        </div>
      </div> */}

      {!aaya ? (
        <CategoryLoader />
      ) : (
        <div
          className={`store ${
            activeview2 ? "store-2" : activeview3 ? "store-3" : "store-4"
          }`}
        >
          {data && data.map((el, i) => (
            <div
              key={i}
              className={`product-box ${
                activeview2 ? "active-2" : activeview3 ? "active-3" : "active-4"
              }`}
              onClick={() => {
                go_to_prod(el._id);
              }}
            >
              <img
                src={
                  el.images &&
                  (hoveredItemIndex == i ? el.images[1] : el.images[0])
                }
                style={{ cursor: "pointer" }}
                onMouseEnter={() => handleimgHover(i)}
                onMouseLeave={handleimgLeave}
                alt="error"
                className={`img_main_col ${
                  activeview2 ? "active-2_img" : activeview3 ? "active-3_img" : "active-4_img"
                }`}
              />
              <p className="item-name">{el.name || ""}</p>
              <p className="item-price">Rs. {el.priceperunit || 0}</p>
              {el.discountTypeRs && el.discountperunit && (
                <p>Flat Rs. {el.discountperunit} Off</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Main;
