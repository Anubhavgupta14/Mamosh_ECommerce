import React, { useState, useEffect } from 'react'
import Sidenav from "./helpers/Sidenav";
import Main from "./helpers/Main";
import { useSearchParams } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';
import CategoryLoader from "../loaders/CategoryLoader"
import Navbar from "../common/Navbar2"
import { useRouter } from 'next/router';
import {FetchCat} from "../../api_fetch/admin/Collections"



const Collection = () => {
    const router = useRouter();
    const location = router.pathname;
    const [queryParams, setQueryParams] = useState({});
    // const [searchparams, Setsearchparams] = useSearchParams();
    const [open,setOpen] = useState(false)
    // const location = useLocation();
    const [aaya, Setaaya] = useState(false)

    const [data, Setdata] = useState([
        {
            name: "",
            img: "",
            img2: "",
            price: "",
        }
    ])
    const [filters, setFilters] = useState([]);


   
    useEffect(() => {
        const fetchData = async () => {
          try {
            // Get query parameters from the router
            const { query: { menu, submenu } } = router;
            console.log(menu, submenu, "=> param 1 and param 2");
    
            // Set the state with the query parameters
            setQueryParams({ menu, submenu });
    
            // Send the query parameters to the backend API
            const responseData = await FetchCat({ menu, submenu })
    
             if (!responseData) {
               throw new Error('Network response was not ok');
             }
            console.log(responseData, "data from backend");
            Setdata(responseData.products);
            setFilters(responseData.filters);
            Setaaya(true);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, [router.query]);

    return (
        <>
        <Navbar/>
        <div className='main-wrapper top-coll'>
            <Sidenav filters={filters} open={open} setOpen={setOpen}/>
            
            <Main aaya={aaya} data={data} queryParams={queryParams} filtersopen={open} setfiltersOpen={setOpen} />
            
        </div>
        </>
    )
}

export default Collection