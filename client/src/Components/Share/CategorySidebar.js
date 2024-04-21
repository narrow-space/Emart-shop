import React, { useEffect, useRef, useState } from "react";
import "./CategorySidebar.scss";
import { data } from "../../product";
import Slider from "@mui/material/Slider";
import { pink } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";
import { Button, FormGroup } from "@mui/material";
import { CiFilter } from "react-icons/ci";
import { Link, useParams, useSearchParams } from "react-router-dom";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { FaFilter } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { adminGetBrand, filterProducts } from "../../redux/Slice/ProductSlice/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { adminGetCategory } from "../../redux/Slice/categorySlice/categorySlice";

const CategorySidebar = (props) => {
  const [value, setValue] = useState([6, 3000]);
  const [brand, setBrand] = useState([])
  const [params, setParams] = useSearchParams()
  const categoryid = params.get('categoryId')
  const filterRef = useRef()
  const [filteropen, setFilterOpen] = useState(false);
  const [sizes, setSizes] = useState([])
  function valuetext(value) {
    return value;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  ///Get category from database//
  const dispatch = useDispatch()
  const { CategoryData } = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(adminGetCategory());
  }, [dispatch]);



const handlereset=()=>{
  const data = {
    selectedCategory: categoryid,
    price: "",
    size: "",
    brand: "",
    sortBy: ""
  
  }
  dispatch(filterProducts(data))
}


  useEffect(() => {
    if (CategoryData.length > 0 && categoryid) {
      const filtercategory = CategoryData.find((category) => category._id === categoryid);
      const uniqueBrandArray = filtercategory?.brands?.filter(
        (brand, index, self) => self.findIndex((b) => b === brand) === index
      );
      setBrand(uniqueBrandArray);
      setSizes(filtercategory?.products?.reduce((acc, curr) => {
        console.log(acc,curr)
        curr.sizes.forEach((size) => {
          if (!acc.includes(size)) {
            acc.push(size);
          }
        });
        return acc;
      }, []));
    } else {
      setBrand([]);
      setSizes([]);
    }
  }, [categoryid, CategoryData]);




  






 
  useEffect(() => {
    props.filterByPrice(value[0], value[1]);

  }, [value]);


  const filterByBrand = (keyword) => {
    props.filterByBrand(keyword);
    console.log(keyword)
  };

  const filterBySize = (keyword) => {
    props.filterBySize(keyword);
  };

  ////click outside to close filter menu//
  useEffect(() => {
    const handler = (e) => {
      if (!filterRef?.current?.contains(e.target)) {
        setFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handler, true);

    return () => {
      document.removeEventListener("mousedown", handler, true);
    };
  }, []);






  return (
    <>
      <div className="hidden md:block">
        {/* filter for large device */}
        {/* Filter by category */}
        <div className="sidebarCard">
          <h3 className="text-2xl font-[600]">Filter By Categories</h3>
          <div className="h_line"></div>
          <div className="cat-list">
            <div className="all-cat flex flex-col">
              {props?.CategoryData?.length !== 0 &&
                props?.CategoryData?.map((el, index) => {
                  return (
                    <Link
                      to={`/products-filter?categoryId=${el._id}`}
                    >
                      <div className="flex items-center">
                        <h2>{el.categoryName} </h2>
                        {/* <span className="ml-auto">{alldata.length}</span> */}
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
        {/* Filter by Price */}
        <div className="sidebarCard mt-6">
          <h3 className="text-2xl font-[600]">Filter By Price</h3>
          <hr />


          <Slider
            getAriaLabel={() => 'Temperature range'}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            min={6} // Set the minimum value
            max={3000}
          />



          {/* <RangeSlider
            value={value}
            onInput={setValue}
            min={6}
            max={3000}
            step={1}
            className="my-3 bg-[#4D2DB7]"
            id="Rangeslider"
          /> */}

          <div className="range flex justify-between items-center ">
            <p>
              <strong className="text-[black]">from:</strong>${value[0]}
            </p>
            <p>
              {" "}
              <strong className="text-[black]">from:</strong>${value[1]}
            </p>
          </div>
          {/* Filter by brand */}
          <div className="filters">
            <h5 className="text-2xl font-[600]">Filters by Brands</h5>

            <div className="filter_color">
              <div className="flex items-center">

                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  {brand?.length !== 0 &&
                    brand?.map((item, index) => {
                      return (
                        
                        <FormControlLabel
                          key={index}
                          value={item}
                          control={
                            <Radio onChange={() => filterByBrand(item)} />
                          }
                          label={item}
                        />
                      );
                    })}
                </RadioGroup>
              </div>
            </div>

            {/* filter by size */}

            <div>
              <h5 className="text-2xl font-[600]">Filters by Sizes</h5>
              <div className="filter_Size">
                <div className="flex items-center">
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    {sizes.length !== 0 &&
                      sizes.map((item, index) => {
                        return (
                          <FormControlLabel
                            value={item}
                            control={
                              <Radio onChange={() => filterBySize(item)} />
                            }
                            label={item}
                          />
                        );
                      })}
                  </RadioGroup>
                </div>
                <button onClick={handlereset} className="btn btn-success">Reset</button>

              </div>
            </div>
          </div>
        </div>



        {/* Filter for small device*/}

      </div>


      <div>
        <div className="md:hidden block">
          <CiFilter
            onClick={() => setFilterOpen(!filteropen)}
            className="ml-auto cursor-pointer"
            size={25}
          />




          <div className={`top-0 right-0 fixed z-50  ${filteropen ? 'bg-[rgba(0,0,0,.8)] w-full h-screen' : null}`}>
            <div className={`${filteropen ? ' translate-x-0' : ' translate-x-full'} fixed -right-2 w-3/4 bg-white z-50 h-screen shadow-lg  duration-1000 ease-out`}>












              <div className="md:hidden block">
                <FiFilter
                  onClick={() => setFilterOpen(!filteropen)}
                  className="ml-auto cursor-pointer"
                  size={25}
                />

                {filteropen ? (
                  <div className="">
                    <div
                      className="filter fixed top-0 left-0 w-full  h-screen "
                    >
                      <div
                        ref={filterRef}
                        className={`filter1 overflow-y-auto z-2 fixed left-auto  top-0 h-[100%] right-0 w-[400px] max-w-[320px] bg-white shadow-xl`}>
                        <div className="w-full flex justify-between border-b-2 border-dark-500 p-3 items-center mt-6">
                          <h1 className="text-xl text-center">Filters</h1>
                          <RxCross1
                            className="cursor-pointer"
                            onClick={() => setFilterOpen(!filteropen)}
                            size={23}
                          />
                        </div>
                        <div >
                          {/* filter by category */}
                          <div className="sidebarCard">
                            <h3 className="text-2xl font-[600]">Filter By Categories</h3>
                            <div className="h_line"></div>
                            <div className="cat-list">
                              <div className="all-cat flex flex-col">
                                {props.CategoryData.length !== 0 &&
                                  props.CategoryData.map((el, index) => {
                                    return (
                                      <Link
                                        onClick={() => setFilterOpen(false)}
                                        to={`/products-filter?categoryId=${el._id}`}
                                      >
                                        <div className="flex items-center">
                                          <h2>{el.categoryName} </h2>
                                          {/* <span className="ml-auto">{alldata.length}</span> */}
                                        </div>
                                      </Link>
                                    );
                                  })}
                              </div>
                            </div>
                          </div>
                          {/* Filter by Price */}
                          <div className="sidebarCard mt-6">
                            <h3 className="text-2xl font-[600]">Filter By Price</h3>
                            <hr />

                            <RangeSlider

                              value={value}
                              onInput={setValue}
                              min={0}
                              max={3000}
                              step={1}
                              className="my-3 bg-[green]"
                              id="Rangeslider"

                            />

                            <div className="range flex justify-between items-center ">
                              <p>
                                <strong className="text-[black]">from:</strong>${value[0]}
                              </p>
                              <p>
                                {" "}
                                <strong className="text-[black]">from:</strong>${value[1]}
                              </p>
                            </div>
                            {/* Filter by brand */}
                            <div className="filters">
                              <h5 className="text-2xl font-[600]">Filters by Brands</h5>

                              <div className="filter_color">
                                <div className="flex items-center">

                                  <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                  >
                                    {brand?.length !== 0 &&
                                      brand?.map((item, index) => {
                                        return (
                                          <FormControlLabel
                                            key={index}
                                            value={item}
                                            control={
                                              <Radio onClick={() => setFilterOpen(false)} onChange={() => filterByBrand(item)} />
                                            }
                                            label={item}
                                          />
                                        );
                                      })}
                                  </RadioGroup>
                                </div>
                              </div>

                              {/* filter by size */}

                              <div>
                                <h5 className="text-2xl font-[600]">Filters by Sizes</h5>
                                <div className="filter_Size">
                                  <div className="flex items-center">
                                    <RadioGroup
                                      aria-labelledby="demo-radio-buttons-group-label"
                                      defaultValue="female"
                                      name="radio-buttons-group"
                                    >
                                      {sizes.length !== 0 &&
                                        sizes.map((item, index) => {
                                          return (
                                            <FormControlLabel
                                              onClick={() => setFilterOpen(!filteropen)}
                                              value={item}
                                              control={
                                                <Radio onChange={() => filterBySize(item)} />
                                              }
                                              label={item}
                                            />
                                          );
                                        })}
                                    </RadioGroup>
                                  </div>


                                </div>
                              </div>
                            </div>
                          </div>
                        </div>


                      </div>
                    </div>
                  </div>
                ) : null}
              </div>

            </div>
          </div>


        </div>
      </div>


    </>
  );
};

export default CategorySidebar;
