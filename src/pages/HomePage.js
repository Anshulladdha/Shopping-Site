import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import { Navigate, useNavigate } from "react-router-dom";
import {useAuth} from '../context/auth';
import axios from 'axios';
import { Checkbox ,Radio} from "antd";
import toast from "react-hot-toast";
import { Prices } from "../components/Prices";
import { AiOutlineReload } from "react-icons/ai";
import { useCart } from "../context/cart";
import "../styles/HomePage.css";
const HomePage=()=>{
  const navigate=useNavigate();
    const [auth,setAuth]=useAuth();
    const [cart, setCart] = useCart();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);


    //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data.category);
        getAllCategory();
      }
    } catch (error) {
      console.log(error);
      
    }
  };

  useEffect(()=>{
    getAllCategory();
    getTotal();
    //eslint-disable-next-line
  },[]);
    //get Products
    const getAllProducts = async () => {
        try {
          setLoading(true);
          const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
          setLoading(false);
          setProducts(data.products);
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      };
    
      useEffect(()=>{
        getAllProducts();
      },[]);

      //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

       // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    // getAllProducts();
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length,radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);
  //get filtered product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
    return (
        <Layout title={'Best Offers'}>
        <br></br><br></br><br></br>
        <div className="row">
        <div className="col-md-3 filters">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* Price filter */}
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
          <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>

            <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
          </div>
            </div>
            <div className="col-md-9">
           
            <h1 className="text-center">All products</h1>
            <div className="d-flex flex-wrap">
            {products?.map((p) => (
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description.substring(0,60)}</p>
                    <p className="card-text">${p.price}</p>
                    <button class="btn btn-primary" onClick={()=> navigate(`product/${p.slug}`)}>More Details</button>
                    <button class="btn btn-secondary ms-1" onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}>Add to cart</button>
                  </div>
                </div>
            ))}
            </div>
            <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Loadmore <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div>
            </div>
            </div>
        </Layout>
    )
};

export default HomePage;