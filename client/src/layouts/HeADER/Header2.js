import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLoaderData, useNavigate } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  HeartIcon,
  ChevronDoubleDownIcon,
  Bars4Icon,
  ArrowPathIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  ChevronDoubleUpIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { RxCross1, RxCrossCircled } from "react-icons/rx";
import './Header.scss'
import Dropdown from "./Dropdown.js";
import Navbar from "./Navbar.js";
import { CartopenContex } from "../../Contexapi/Cartopencontex.js";
import Carts from "../../Components/carts/Viewcart/Carts.js";

import { NavOpenContex } from "../../Contexapi/NavopenContex.js";
import { Button } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { adminGetProducts, searchProducts } from "../../redux/Slice/ProductSlice/ProductSlice.js";
import { adminGetCategory } from "../../redux/Slice/categorySlice/categorySlice.js";
import Loading from "../../Components/Share/Loading.js";
import Cartsingle from "../../Components/Cart/Cartsingle.js";
import CartDetails from "../../Components/Cart/CartDetails.js";
import { clearCartData, getCart } from "../../redux/Slice/cartSlice/cartSlice.js";
import { clearuserLoggedInData, userLoggedIn, userLogout } from "../../redux/Slice/Userauthslice/userAuthSlice.js";


const Header2 = ({ activeheading }) => {
  const { AllProducts: { products } } = useSelector((state) => state.products)
  const { searchLoading } = useSelector((state) => state.products)
  const { searchProductsData: { searchproduct, results } } = useSelector((state) => state.products)

  const { userLoggedInData, userLogoutData, userLoginData } = useSelector((state) => state.user);
  const { getCartProduct } = useSelector((state) => state.cart)
  const { addtoCart } = useSelector((state) => state.cart)


  const { CategoryData } = useSelector((state) => state.category);

  const [pdData, setPdData] = useState(searchproduct);
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropdown, setDropDown] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [categoryState, setCategoryState] = useState([]);
  const { cartopen, setCartopen, cartRef } = useContext(CartopenContex);
  const { navOpen, setNavOpen } = useContext(NavOpenContex);

  const searchRef = useRef();

  const navRef = useRef();
  const categoryRef = useRef();


  ///get all products from database//
  const dispatch = useDispatch()
  const productApi = () => {

    dispatch(adminGetProducts())
  }

  useEffect(() => {
    productApi()
  }, [])


  // Search Product
  const searchproductApi = () => {
    const data = {
      productName: search
    }
    dispatch(searchProducts(data))
  }

  useEffect(() => {
    searchproductApi()
  }, [search])



  ///get All category from database//



  useEffect(() => {
    let array = [];
    for (let i = 0; i < CategoryData?.length; i++) {
      let newcatarry = {
        value: CategoryData[i]._id,
        label: CategoryData[i].categoryName,
      };
      array.push(newcatarry);
    }
    setCategoryState(array);
  }, [CategoryData]);

  useEffect(() => {
    dispatch(adminGetCategory());
  }, []);







  //Searchbar///
  // /hide search dropdown when Click outSide//
  useEffect(() => {
    const handler = (e) => {
      if (!searchRef?.current?.contains(e.target)) {
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler, true);

    return () => {
      document.removeEventListener("mousedown", handler, true);
    };
  }, []);

  // useEffect(() => {

  //   const handler = (e) => {
  //     if (!categoryRef?.current?.contains(e.target)) {
  //       setDropDown(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handler, true);

  //   return () => {
  //     document.removeEventListener("mousedown", handler, true);
  //   };
  // }, []);

  ////Navbar close for outside click///

  useEffect(() => {
    const handler = (e) => {
      if (!navRef?.current?.contains(e.target)) {
        setNavOpen(false);
      }
    };
    document.addEventListener("mousedown", handler, true);

    return () => {
      document.removeEventListener("mousedown", handler, true);
    };
  }, []);


  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearch(term);

    const filterProduct =
      searchproduct &&
      searchproduct.filter((pd) =>
        pd.productName
          .toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filterProduct);
  };


  const closesearbar = () => {
    setSearch("");
  };


  const closeMobileNavbar = () => {
    setNavOpen(false);
  };



  useEffect(() => {
    dispatch(userLoggedIn())
  }, [userLoginData])

  useEffect(() => {
    dispatch(getCart())
  }, [addtoCart, userLoginData])



  ///handle logout function///
  const userlogout = () => {
    dispatch(userLogout()).then((res) => {
      if (res.payload.message == "User successfully Logout") {

        // navigate("/login")
        dispatch(clearCartData());
        // dispatch(clearuserLogInData());
        dispatch(clearuserLoggedInData());
      }


    }).catch((err) => {
      dispatch(clearCartData());
      // dispatch(clearuserLogInData());
      dispatch(clearuserLoggedInData());
      // navigate("/login");

    })
  }

  const token = localStorage.getItem('usertoken')




  return (
    <>
      <div className="container">
        <div className="hidden  md:h-[50px] md:my-[20px] md:flex items-center justify-between">
          <div>
            <Link to="/">
              <h2 className="font-[600] text-[30px]">
                E <span className="text-[#4D2DB7]">SHOP</span>
              </h2>
            </Link>
          </div>
          {/* search Box... */}
          <div ref={searchRef} className="w-[50%]  relative">
            <input
              onChange={handleSearch}
              value={search}
              type="text"
              placeholder="Search product.."
              className=" h-[50px] ml-3 w-full px-2 border-[#4D2DB7] border-[2px] outline-none"
            />
            <MagnifyingGlassIcon className="text-[gray] w-[30px] absolute right-2 top-[11px] " />
            {search && searchData && searchData.length !== 0 ? (

              <div className="absolute overflow-y-auto h-[500px] w-full z-50 bg-slate-50 shadow-sm-2  p-4">
                {
                  searchproduct.length > 1 ? <p className="text-center text-sm">total {results} products match</p> : <p className="text-center text-sm">total {results} product match</p>
                }

                <>
                  {
                    searchLoading === true ? <div className="flex justify-center items-center h-auto">
                      <Loading />

                    </div> : <> {searchData &&
                      searchData.map((i, index) => {
                        const p = i.title;
                        const product_name = p?.replace(/\s+/g, "-");
                        return (
                          <Link onClick={closesearbar} to={`/allproduct/${i._id}`}>
                            <hr />
                            <div
                              key={index}
                              className="w-full flex items-start py-3"
                            >
                              <img
                                className="w-[40px] h-[40px] mr-[10px]"
                                src={i.images[0]}
                                alt=""
                              />
                              <h1>{i.productName
                              }</h1>
                            </div>
                            <hr />
                          </Link>
                        );
                      })}


                    </>
                  }

                </>
              </div>
            ) : searchData?.productName !== search ? (
              <div
                style={{
                  display: `${search && searchData?.productName !== search}`
                    ? "block"
                    : "none",
                }}
                className="text-center absolute min-w-full min-h-[10vh] bg-slate-50 shadow-sm-2 z-[9] p-4"
              >
                <h1 className="font-[600]">sry! no product found</h1>
              </div>
            ) : null}

          </div>
        </div>
      </div>
      <div
        className={`${active === true ? " shadow-2xl fixed top-0 left-0 z-50" : null
          } transition hidden md:flex items-center justify-between w-full bg-[white] ease-in-out duration-500`}
      >
        <div className="w-11/12 mx-auto relative flex justify-between">
          {/* catagory */}
          <div onClick={() => setDropDown(!dropdown)} >
            <div className="relative  h-[60px] mt-[10px] mb-[10px] w-[326px] hidden lg:block ">
              <Bars4Icon className="text-[black] w-[25px] absolute top-[18px] left-2 " />
              <button

                className={` h-[100%] w-full flex justify-between items-center pl-10 bg-[white] font-sans  text-lg font-[500] select-none rounded-lg `}
              >
                All Category
              </button>
              {!dropdown ? (
                <ChevronDoubleDownIcon
                  onClick={() => setDropDown(!dropdown)}
                  className="w-[25px] absolute right-2 top-[18px]"
                />
              ) : (
                <ChevronDoubleUpIcon className="w-[25px] absolute right-2 top-[18px]" />
              )}

              {dropdown ? (
                <Dropdown
                  activeheading={activeheading}
                  categoryRef={categoryRef}
                  pdData={CategoryData}
                  setDropDown={setDropDown}
                />
              ) : null}
            </div>
          </div>
          {/* navbar items */}
          <div className="flex  items-center">
            <Navbar activeheading={activeheading} />
          </div>
          {/* compare,addtocart,wishlist user*/}
          <div className=" mr-[5.25rem]">
            <div className=" group flex items-center pl-2">
              <div className=" relative cursor-pointer mr-[15px]">
                <div className="">
                  <UserCircleIcon
                    onClick={() => setUserDropdown(!userDropdown)}
                    color=" rgb(255 255 255 /83%)"
                    className="  text-[#5F5F5F] w-[30px] absolute top-[25px] left-[90px]"
                  />
                </div>


                <div className="relative">
                  <div
                    className="invisible group-hover:visible group-hover:-translate-y-4  duration-200 h-[auto] w-[170px] bg-[rgba(255,255,255,0.99)] absolute top-[70px] left-[-23px]  z-10 shadow-sm ">
                    <ul className=" divide-gray-500 text-center font-thin cursor-pointer text-sm">
                      <Link to="/myaccount/dashboard">
                        <li className="my-2"> My Account</li>
                      </Link>
                      <hr />
                      {
                        token ? <li onClick={userlogout} className="my-2">Logout</li> : <Link to="/login">
                          <li className="my-2">Login/Register</li>
                        </Link>
                      }


                    </ul>


                  </div>
                </div>
              </div>

            </div>

            <div className=" relative w-full">

            </div>

            <div className="flex items-center pl-2">
              <div className="relative cursor-pointer mr-[15px]">
                <ShoppingBagIcon
                  onClick={() => setCartopen(true)}
                  color=" rgb(255 255 255 /83%)"
                  className="
               
                  text-[#5F5F5F]  w-[30px] absolute top-[25px] left-[45px] "
                />
                {/* {cartopen ? <Carts setCartopen={setCartopen} /> : null} */}
                <span className="absolute left-[70px] top-6 rounded-full bg-[black] w-4 h-4 p-0 m-0 text-[white] font-mono text-[12px] text-center top right leading-tight">
                  {userLoggedInData?.length > 0 ? getCartProduct?.length : "0"}
                </span>
              </div>
            </div>
            <div className="flex items-center ">
              <div className="relative cursor-pointer mr-[15px]">
                <HeartIcon
                  color=" rgb(255 255 255 /83%)"
                  className="
                
                  text-[#5F5F5F] w-[30px] absolute top-[27px] left-2 "
                />
                <span className="absolute right-[-40px] top-6 rounded-full bg-[black] w-4 h-4 p-0 m-0 text-[white] font-mono text-[12px] text-center top right leading-tight">
                  0
                </span>
              </div>
            </div>

            <div className="flex items-center">
              <div className="relative cursor-pointer mr-[15px]">
                <ArrowPathIcon
                  color=" rgb(255 255 255 /83%)"
                  className="
           
                  text-[#5F5F5F] w-[30px] absolute top-[27px] right-2 "
                />
                <span className="absolute right-[4px] top-6 rounded-full bg-[black] w-4 h-4 p-0 m-0 text-[white] font-mono text-[12px] text-center top right leading-tight">
                  0
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header... */}





      <div
        className={`${active === true ? "shadow-2xl fixed top-0 left-0 z-[10]" : null
          } w-full bg-[#fff]  h-[70px] shadow-sm md:hidden z-50 top-0 left-0 mb-0 p-3 `}
      >
        <div className="w-full flex items-ccenter justify-between">
          <div onClick={() => setNavOpen(!navOpen)}>
            <HiMiniBars3CenterLeft size={40} className="ml-4" />
          </div>
          <div>
            <Link to="/">
              <h2 className="font-[600]  text-[30px]">
                E <span className="text-[black]">SHOP</span>
              </h2>
            </Link>
          </div>
          <div>
            <div
              onClick={() => setCartopen(true)}
              className="relative cursor-pointer mr-[15px]"
            >
              <ShoppingBagIcon
                color=" rgb(255 255 255 /83%)"
                className="
               
                text-[black] w-[23px] absolute top-2 right-0 "
              />
              <span className="absolute right-[-9px] top-1 rounded-full bg-[#3bc177] w-5 h-4 p-0 m-0 text-[white] font-mono text-[12px] text-center top right leading-tight">
                6
              </span>
            </div>
          </div>
          {/* hEADER POPUP.. */}

          <div className={`top-0 right-0 fixed z-50  ${navOpen ? 'bg-[rgba(0,0,0,.8)] w-full h-screen' : null}`}>
            <div className={`${navOpen ? ' translate-x-0' : ' -translate-x-full'} fixed left-0 w-3/4 bg-white z-50 shadow-lg  duration-1000 ease-out`}>
              {/* Sidebar content */}
              <div onClick={() => setDropDown(!dropdown)}>
                <div className="relative  h-[60px] mt-[10px] mb-[10px] w-[326px] hidden lg:block ">
                  <Bars4Icon className="text-[black] w-[25px] absolute top-[18px] left-2 " />
                  <button
                    className={`h-[100%] w-full flex justify-between items-center pl-10 bg-[black] font-sans  text-lg font-[500] select-none rounded-lg`}
                  >
                    Category
                  </button>
                  {!dropdown ? (
                    <ChevronDoubleDownIcon
                      onClick={() => setDropDown(!dropdown)}
                      className="w-[25px] absolute right-2 top-[18px]"
                    />
                  ) : (
                    <ChevronDoubleUpIcon className="w-[25px] absolute right-2 top-[18px]" />
                  )}

                  {dropdown ? (
                    <Dropdown
                      activeheading={activeheading}
                      // categoryRef={categoryRef}
                      pdData={pdData}
                      setDropDown={setDropDown}
                    />
                  ) : null}
                </div>
              </div>

              <div
                ref={navRef}
                className="w-[100%] h-screen top-0 left-0 z-10 bg-[#fff]"
              >
                <div className="w-full flex justify-between pr-3">
                  <div>
                    <div className="relative mr-[15px]">
                      <HeartIcon
                        color=" rgb(255 255 255 /83%)"
                        className="
                
                text-[black] w-[30px] absolute top-[27px] left-2 "
                      />
                      <span className="absolute right-[-40px] top-6 rounded-full bg-[#3bc177] w-4 h-4 p-0 m-0 text-[white] font-mono text-[12px] text-center top right leading-tight">
                        0
                      </span>
                    </div>
                  </div>

                  <RxCross1
                    className="cursor-pointer mt-5 ml-3"
                    onClick={() => setNavOpen(!navOpen)}
                    size={30}
                  />
                </div>

                <div
                  ref={searchRef}
                  className="my-8 w-[92%] m-auto h-[40px] relative"
                >
                  <input
                    type="search"
                    placeholder="Search Product..."
                    className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md outline-none"
                    onChange={handleSearch}
                    value={search}
                  />

                  {search && searchData && searchData.length !== 0 ? (
                    <div className="absolute overflow-y-auto h-[500px] z-50 bg-slate-50 shadow-sm-2  p-4">
                      {searchData &&
                        searchData.map((i, index) => {
                          const p = i.title;
                          const product_name = p?.replace(/\s+/g, "-");
                          return (
                            <Link onClick={closeMobileNavbar} to={`/allproduct/${i._id}`}>
                              <div
                                key={index}
                                className="w-full flex items-start py-3"
                              >
                                <img
                                  className="w-[40px] h-[40px] mr-[10px]"
                                  src={i.images[0]}
                                  alt=""
                                />
                                <h1>{i.productName.slice(0, 50)
                                }</h1>
                              </div>
                            </Link>
                          );
                        })}
                    </div>
                  ) : searchData?.title !== search ? (
                    <div
                      style={{
                        display: `${search && searchData?.title !== search}`
                          ? "block"
                          : "none",
                      }}
                      className="text-center absolute min-w-full min-h-[10vh] bg-slate-50 shadow-sm-2 z-[9] p-4"
                    >
                      <h1 className="font-[600]">sry! no product found</h1>
                    </div>
                  ) : null}
                </div>

                {/* Mobile Navigation Starts */}

                <Navbar activeheading={activeheading} />

                {/* Mobile Navigation End */}

                {/* mobile caategory start */}
                <div onClick={() => setDropDown(!dropdown)}>
                  <div className="relative w-full  h-[60px] mt-[10px] mb-[10px]   ">
                    <Bars4Icon className="text-[white] w-[25px] absolute top-[18px] left-2 " />
                    <button
                      className={`h-[100%] w-[100%] flex justify-between items-center pl-10 bg-[#711DB0] text-[white] font-sans  text-lg font-[500] select-none rounded-lg`}
                    >
                      All Category
                    </button>
                    {!dropdown ? (
                      <ChevronDoubleUpIcon className="w-[25px] text-[white] absolute right-[5px]  top-[18px]" />
                    ) : (
                      <ChevronDoubleDownIcon
                        onClick={() => setDropDown(!dropdown)}
                        className="w-[25px] absolute text-[white] right-[5px] top-[18px]"
                      />
                    )}

                    {dropdown ? (
                      <Dropdown
                        activeheading={activeheading}
                        // categoryRef={categoryRef}
                        pdData={CategoryData}
                        setDropDown={setDropDown}
                      />
                    ) : null}
                  </div>
                </div>
                {/* mobile category end */}
              </div>
            </div>
          </div>




        </div>






      </div>



      {/* /////Sidecart animated /// */}
      <div
        className={` ${cartopen
          ? "bg-[rgba(0,0,0,.8)] fixed top-0 right-0  w-full h-screen z-50"
          : null
          }`}
      >
        <div
          ref={cartRef}
          className={`${cartopen ? "translate-x-0 hidescrool" : "translate-x-full"
            } ease-out duration-700 bg-[white] md:w-[25%] min-h-full  w-[78%]  fixed top-0 right-0 z-10 overflow-y-auto`}
        >
          <CartDetails getCartProduct={getCartProduct} />
        </div>
      </div>
    </>
  );
};

export default Header2;
