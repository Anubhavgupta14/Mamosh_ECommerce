import React, { useEffect, useRef, useState } from "react";
// import "../../../styles/navbar/navbar.css"
import { AiOutlineDown, AiOutlineClose } from "react-icons/ai";
// import { useNavigate } from 'react-router-dom';
import HomeLoader from "../loaders/HomeLoader";
// import "../../../styles/homeloader.css"
import OutsideClickHandler from "react-outside-click-handler";
import Cart from "./cart";
import { useDispatch, useSelector } from "react-redux";
import { BsHandbag } from "react-icons/bs";
import { BsSearch, BsCart2 } from "react-icons/bs";
import Profilebtn from "./Profilebtn";
import { useRouter } from "next/router";
import { GoPerson } from "react-icons/go";
import { BiArrowBack } from "react-icons/bi";
const Navbar = () => {
  // const navigate = useNavigate();
  const router = useRouter();
  const [products, setProducts] = useState(null);
  const itemcount = useSelector((state) => state.cart.itemcount);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [come, setCome] = useState(true);
  const [active2, setActive2] = useState(!true);
  const [active, setactive] = useState(false);
  const [divcart, Setdivcart] = useState(false);
  const [temp, Settemp] = useState(false);
  // const [cats, setCats] = useState(categories)
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    let func = async () => {
      let res = await fetch("https://mamosh-backend.vercel.app/api/menu");
      console.log(res);
      let data = await res.json();
      console.log(data, "data");
      let { error } = data;
      if (error || !res.ok) {
        alert(error || "Some error occurred");
        return;
      }
      console.log(data);
      setCategories(data.reverse());
      Settemp(true);
    };
    func();
  }, []);

  // console.log(temp)

  const handleClick = async (index) => {
    setCome(false);
    console.log(categories, "");
    // return;
    let res = await fetch(
      `https://mamosh-backend.vercel.app/api/submenu/${categories[index]._id}`
    );
    console.log(res);
    let data = await res.json();
    let { error } = data;
    if (error || !res.ok) {
      alert(error || "Some error occurred");
      return;
    }
    console.log(data);
    setSelectedCategory(index);
    setSubCategories(data.reverse());
    setTimeout(() => {
      if (data.length > 0) {
        setSubCome(true);
      } else {
        router.push(`/collections/?menu=${categories[index].name}`);
      }
    }, 300 + 100 * (categories.length - 1));
  };

  const handleSubCatClick = (subCatName, index) => {
    router.push(
      `/collections/?menu=${
        categories[selectedCategory].name +
        "&submenu=" +
        subCategories[index].name
      }`
    );
  };

  let menuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenugo(true);
        setTimeout(() => {
          setActive2(true);
        }, 300);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const [menugo, setMenugo] = useState(false);
  let closemenu = () => {
    setMenugo(true);
    setTimeout(() => {
      setActive2(false);
    }, 300);
  };
  const [subcome, setSubCome] = useState(true);
  let goback = () => {
    // setCats(categories)
    setSubCome(!true);

    setTimeout(() => {
      setSelectedCategory(null);
      setSubCategories(null);
      setCome(true);
    }, 300);
    // setCome(true);
    // setActive(true);
    // setMenugo(false)
  };

  let contact = async () => {
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer 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", // Replace with your OpenAI API key
          },
          body: JSON.stringify({
            prompt: "GIve me the details of Taj mahal",
            max_tokens: 350,
            model: "gpt-3.5-turbo",
          }),
        }
      );

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [user, Setuser] = useState(false);

  const checkuser = () => {
    const token = localStorage.getItem("token");
    if (token) {
      Setuser(true);
    }
  };
  useEffect(() => {
    checkuser();
  }, []);

  return (
    <>
      <div className="nav-wrap">
        <div className="navbar" style={{ top: "0" }}>
          <div className="menu">
            <div
              className="menu-items flex-all"
              onClick={() => {
                setActive2(true);
                setMenugo(false);
              }}
            >
              Shop{" "}
              <span className="flex-all">
                <AiOutlineDown />
              </span>
            </div>
            <div className="menu-items flex-all">
              Discover{" "}
              <span className="flex-all">
                <AiOutlineDown />
              </span>
            </div>
            <div className="menu-items flex-all" onClick={contact}>
              Contact
            </div>
          </div>

          <div
            className="navbar-logo"
            onClick={() => {
              navigate("/");
            }}
          >
            Mamosh
          </div>
          <div className="navbar-right">
            <div className="menu-right-logo">
              <BsSearch />
            </div>

            <div
              className="menu-right-logo"
              onClick={() => {
                setactive(true);
                Setdivcart(true);
              }}
            >
              <div className="cart-count"><div>{itemcount}</div></div>
              <BsHandbag />
            </div>
            <div className="menu-right-logo" style={{ margin: "0px" }}>
              {user ? (
                <Profilebtn className="okok" />
              ) : (
                <GoPerson style={{color:'black', fontSize:'23px'}} onClick={()=>{router.push("/login")}}/>
              )}
            </div>
          </div>
        </div>
      </div>
      {active2 && (
        <div
          className="menu-overlay2"
          style={{
            background: menugo ? "rgba(0,0,0,0)" : "rgba(0,0,0,0.35)",
            pointerEvents: menugo ? "none" : "all",
          }}
        >
          <div
            ref={menuRef}
            className={`left-menu ${!menugo ? "menu-anime" : "menu-go"}`}
          >
            {!temp ? (
              <HomeLoader />
            ) : (
              <>
                {subCategories == null || subCategories.length == 0 ? (
                  <>
                    <div
                      className="menu-close-btn flex-all"
                      onClick={closemenu}
                    >
                      <AiOutlineClose />
                    </div>

                    {categories.map((cat, index) => {
                      return (
                        <div
                          className={`cats ${come ? "cat-anime" : "cat-go"}`}
                          style={{ animationDelay: 0.25 + index * 0.1 + "s" }}
                          onClick={() => {
                            handleClick(index);
                          }}
                        >
                          <div className="cat-name">{cat.name}</div>
                          <div className="cat-img">
                            <img src={cat.imgsrc} alt={cat.name} />
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <div className="menu-close-btn flex-all" onClick={goback}>
                      <BiArrowBack />
                    </div>

                    {subCategories.map((cat, index) => {
                      return (
                        <div
                          className={`cats  ${
                            subcome ? "cat-anime" : "cat-go"
                          }`}
                          style={{ animationDelay: index * 0.1 + "s" }}
                          onClick={() => handleSubCatClick(cat.name, index)}
                        >
                          <div className="cat-name">{cat.name}</div>
                          <div className="cat-img">
                            <img src={cat.imgsrc} alt={cat.name} />
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
      <Cart
        active={active}
        setactive={setactive}
        divcart={divcart}
        Setdivcart={Setdivcart}
      />
    </>
  );
};

export default Navbar;
