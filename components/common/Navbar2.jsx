import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineDown, AiOutlineClose } from 'react-icons/ai'
import HomeLoader from "../loaders/HomeLoader"
import Cart from "./cart"
import { useDispatch, useSelector } from "react-redux";
import { BsHandbag } from "react-icons/bs";
import { BsSearch, BsCart2 } from 'react-icons/bs';
import Profilebtn from "./Profilebtn"
import { useRouter } from 'next/router';
import { BiArrowBack } from 'react-icons/bi';
import { GoPerson } from "react-icons/go";
import {getMenu, getSubMenu} from "../../api_fetch/admin/Menu"
import {fetchuser} from "../../features/user/UserSlice"
import {fetchMenuAsync} from "../../features/menu/MenuSlice"
const Navbar = () => {
    const router = useRouter();
    const itemcount = useSelector((state) => state.cart.itemcount);
    const dispatch = useDispatch();
    dispatch(fetchuser())
    const user = useSelector((state)=> state.user.user)
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [come, setCome] = useState(true);
    const [active2, setActive2] = useState(!true);
    const [active, setactive] = useState(false);
    const [divcart, Setdivcart] = useState(false)
    // const [temp, Settemp] = useState(false)
    // const [categories, setCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [subcome, setSubCome] = useState(true);
    // const [user, Setuser] = useState(false)
    const categories = useSelector((state)=>state.menu.categories)
    const temp = useSelector((state)=>state.menu.temp)

    const checkuser =()=>{
        const token = localStorage.getItem("token");
        if(token){
            Setuser(true)
        }
    }

    const handleClickOutside = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setMenugo(true);
            setTimeout(() => {
                setActive2(true);
            }, 300);
        }
      };
    
    useEffect(()=>{
        dispatch(fetchMenuAsync())
        document.addEventListener("mousedown", handleClickOutside);
          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
    },[dispatch])

    

    const handleClick = async (index) => {
        setCome(false);
        console.log(categories, "")
        let data = await getSubMenu(categories[index]._id)
        console.log(data);
        console.log(data);
        setSelectedCategory(index);
        setSubCategories(data.reverse());
        setTimeout(() => {
            if (data.length > 0) {
                setSubCome(true);
            }
            else {
                router.push(`/collections/?menu=${categories[index].name}`);
            }
        }, 300 + 100 * (categories.length - 1));
    }

    const handleSubCatClick = (subCatName, index) => {
        router.push(`/collections/?menu=${categories[selectedCategory].name+"&submenu="+subCategories[index].name}`);
    }

    let menuRef = useRef(null);

    const [menugo, setMenugo] = useState(false);
    let closemenu = () => {
        setMenugo(true);
        setTimeout(() => {
            setActive2(false);

        }, 300);
    }

    let goback = () => {
        setSubCome(!true)
        setTimeout(() => {
            setSelectedCategory(null)
            setSubCategories(null)
            setCome(true)
        }, 300)
    }

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
            <div className="menu-items flex-all" >
              Contact
            </div>
          </div>

          <div
            className="navbar-logo"
            onClick={() => {
              router.push("/");
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
