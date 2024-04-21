import React, { useEffect, useState } from "react";
import "./Allproduct.scss";
import Products from "./Products";


import { useDispatch, useSelector } from "react-redux";
import { adminGetProducts } from "../../redux/Slice/ProductSlice/ProductSlice";

import Loading from "../Share/Loading";
const Allproduct = () => {

  const dispatch = useDispatch()
  const { AllProducts: { products }, loading, error } = useSelector((state) => state.products)
  const { getCartProduct } = useSelector((state) => state.cart)

  const productApi = () => {
    const data = {
      selectedCategory: "all"
    }
    dispatch(adminGetProducts(data))
  }

  useEffect(() => {
    productApi()
  }, [])


  return (
    <div className="all-products">

      <div className="container-fluide">
        

        <div className="productRow ">

          {
            loading === true ? <Loading /> : <div className="item grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-6 md:gap-6">


              {
                products && products.map((i, index) => {
                  return (
                    <Products

                      key={index}
                      data={i}
                    />

                  )
                })
              }

            </div>
          }



        </div>

      </div>

    </div>
  );
};

export default Allproduct;
