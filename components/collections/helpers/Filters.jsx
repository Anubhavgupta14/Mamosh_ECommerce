import React,{useState} from 'react'
import { IoMdArrowDropdown } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa6";


const Filters = ({filter,i}) => {
    console.log(filter,"-> filter÷÷")

    const [open,setOpen] = useState((i==0 || i==1) ?true:false);
    return (
        <>
            <div className="head" onClick={()=>{setOpen(!open)}}>
               
                <h5>{filter.name}</h5>
                <FaChevronDown style={{transform:open?"rotate(180deg)":"rotate(0deg)"}} />
            </div>
            <div className={open ? "collection" : "collection dis"}>
                {filter.filters.map((el, i) => (
                    <label for={filter.name+i} className="list">
                        <div className="check">
                            <input type="checkbox" id={filter.name+i} style={{ color: 'black', background: 'black' }} />
                            <p>{el.name}</p>
                        </div>
                        <p className="qty">({el.qty})</p>
                    </label>
                ))}
            </div>
            <div className="br"></div>
        </>
    )
}

export default Filters