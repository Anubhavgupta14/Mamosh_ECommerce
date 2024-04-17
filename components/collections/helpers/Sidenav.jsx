import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { useState } from "react";
import OutsideClickHandler from 'react-outside-click-handler';
import Filters from "./Filters";

const Sidenav = ({ filters,open,setOpen }) => {
  const collection = {
    name: "Collection",
    filters:

      [
        {
          name: "ACCESSORIES",
          qty: 15,
        },
        {
          name: "BOXES",
          qty: 24,
        },
        {
          name: "CARGO PANTS",
          qty: 36,
        },
        {
          name: "CHINOS",
          qty: 6,
        },
        {
          name: "CO-ORDS",
          qty: 8,
        },
        {
          name: "FORMAL TROUSERS",
          qty: 75,
        },
        {
          name: "HOODIES",
          qty: 29,
        },
        {
          name: "JACKETS",
          qty: 37,
        },
        {
          name: "JEANS",
          qty: 50,
        },
        {
          name: "JOGGERS",
          qty: 3,
        },
        {
          name: "SHIRTS",
          qty: 1100,
        },
        {
          name: "SWEATERS",
          qty: 13,
        },
        {
          name: "SWEATSHIRTS",
          qty: 25,
        },
        {
          name: "T-SHIRTS",
          qty: 139,
        },
        {
          name: "TRACK PANT",
          qty: 2,
        },
      ]
  }


  return (
    <div className="side-main" style={{background:open?"rgba(0,0,0,.6)":"rgba(0,0,0,0)",pointerEvents:open?"all":"none"}}>
      <div className="side-bg" >

      <OutsideClickHandler onOutsideClick={() => { setOpen(false) }}>
      <div className="side-wrapper" style={{transform:open?"translateX(0%)":"translateX(100%)"}}>
        <div className="side">
          <div className="side-rel">
        <div className="filter-p">Filters</div>
          { filters &&
            filters.map((filter, i) => {
              return (
                <Filters filter={filter} key={i} i={i} />
              )
            })
          }

        </div>
        <div className="side-down"></div>
        </div>
      </div>
      </OutsideClickHandler>
      </div>
    
    </div>
  );
};

export default Sidenav;
