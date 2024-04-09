import React, { useState } from "react";
import { FaSort } from "react-icons/fa";
import { MdOutlineOpenInNew } from "react-icons/md";
import style from "../../styles/common/Table.module.css";
// import { useNavigate } from "react-router-dom";

const Table = ({ columns, rows, editItem,setDeleteProduct }) => {
  // const navigate = useNavigate();
  const [openModel, setOpenModel] = useState(false);
  const [open, setOpen] = useState({ right: false });
  const [statusValue, setStatusValue] = useState(0);
  const [value, setValue] = useState([20, 37]);

  const toggleDrawer = (anchor, newOpen) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen({ ...open, [anchor]: newOpen });
  };

  const handleSelectChange = ({ target: { name, value } }) => {
    setStatusValue(value);
  };

  const valuetext = (value) => {
    return `₹ ${value}`;
  }
  const handlePopupModel = () => {
    setOpenModel(false);
  };


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const status = [
    { id: 0, name: "Inactive" },
    { id: 1, name: "Active" },
  ];
  return (
    <>
      <div className={style.tableCard}>
        
        <table className={style.table}>
          <thead>
            <tr>
              <th className={style.checktr}>
                <input type="checkbox" className={style.formCheckbox} />
              </th>
              {columns?.map((items) => {
                return (
                  <>
                    <th>
                      <span role="button">
                        {items} <FaSort className={style.sortIcon} />
                      </span>
                    </th>
                  </>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((items, i) => {
              const collections = items?.collections?.join(", ");
              return (
                <tr>
                  <td className={style.checktr}>
                    <input type="checkbox" className={style.formCheckbox} />
                  </td>
                  <td>
                    <div>
                        <p className="orderid1">Jan 1, 2024</p>
                        <p className="orderid2">1093094995 <MdOutlineOpenInNew /></p>
                    </div>
                  </td>
                  <td>
                    <div className={style.featureBox}>
                      <div className={style.tableImg}>
                        <img src={items.images[0]} fill alt={items.name} />
                      </div>
                      <div className={style.tableContent}>
                        <label className={style.tableTitle}>{items.name}</label>
                        <span className={style.tableCollections}>
                          {`${items.variantsCount} Variations${
                            collections ? " | " + collections : ""
                          }`}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>15-04-2024</td>
                  <td>
                    20-04-2024
                  </td>
                  <td>2000</td>
                  <td >
                    <span className={`${items.status == true?style.activeStatus:style.inactiveStatus}`}>
                    {items && items.status === true ? "Delivered" : "Pending"}
                    </span>
                    {/* Delivered */}
                    {/* <select className={style.fieldsSelect} name="status" value={statusValue} onChange={handleSelectChange}>
                        {status.map((items) => {
                            return (
                                <>
                                    <option value={items.id}>{items.name}</option>
                                </>
                            );
                        })}
                    </select> */}
                  </td>
                  <td>
                    {/* <div className={style.actions}>
                      <button className={style.items}>
                        <FiEye />
                      </button>
                      <button
                        className={style.items}
                        onClick={() => editItem(items._id)}
                      >
                        <FiEdit />
                      </button>
                      <button
                        className={style.items}
                        onClick={() => setDeleteProduct(items)}>
                        <FiTrash2 />
                      </button>
                    </div> */}
                    Track
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
