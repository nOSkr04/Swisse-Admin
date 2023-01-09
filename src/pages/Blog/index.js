import React, { useEffect, useState, useMemo } from "react";

import {
  Container,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Nav,
  NavItem,
  NavLink,
  Row,
} from "reactstrap";
import classnames from "classnames";

import DeleteModal from "../../Components/Common/DeleteModal";

import BreadCrumb from "../../Components/Common/BreadCrumb";
import TableContainer from "../../Components/Common/TableContainer";
import { Published,  } from "./BlogCol";
//Import data
// import { productsData } from "../../../common/data";

//Import actions
import { getBlogs as onGetBlogs, deleteBlogs as onDeleteBlogs } from "../../store/blog/action";
import { isEmpty } from "lodash";

//redux
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Blogs = (props) => {
  document.title = "Алтан заан ХХК || Нийтлэлнууд";
  const dispatch = useDispatch();

  const { blogs } = useSelector((state) => ({
    blogs: state.Ecommerce.blogs,
  }));


  const [productList, setProductList] = useState([]);
  const [activeTab, setActiveTab] = useState("1");

  const [product, setProduct] = useState(null);



  useEffect(() => {
    setProductList(blogs);
  }, [blogs]);

  useEffect(() => {
    if (blogs && !blogs.length) {
      dispatch(onGetBlogs());
    }
  }, [dispatch, blogs]);

  useEffect(() => {
    if (!isEmpty(blogs)) setProductList(blogs);
  }, [blogs]);

  const toggleTab = (tab, type) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      let filteredBlogs = blogs;
      if (type !== "all") {
        filteredBlogs = blogs.filter((product) => product.status === type);
      }
      setProductList(filteredBlogs);
    }
  };

  const [cate, setCate] = useState("all");

  const categories = (category) => {
    let filteredBlogs = blogs;
    if (category !== "all") {
      filteredBlogs = blogs.filter((product) => product.subCategory === category);
    }
    setProductList(filteredBlogs);
    setCate(category);
  };




  //delete order
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModalMulti, setDeleteModalMulti] = useState(false);

  const onClickDelete = (product) => {
    setProduct(product);
    setDeleteModal(true);
  };

  const handleDeleteProduct = () => {
    if (product) {
      dispatch(onDeleteBlogs(product._id));
      setDeleteModal(false);
    }
  };

  // Displat Delete Button
  const [dele, setDele] = useState(0);
  const displayDelete = () => {
    const ele = document.querySelectorAll(".productCheckBox:checked");
    const del = document.getElementById("selection-element");
    setDele(ele.length);
    if (ele.length === 0) {
      del.style.display = 'none';
    } else {
      del.style.display = 'block';
    }
  };

  // Delete Multiple
  const deleteMultiple = () => {
    const ele = document.querySelectorAll(".productCheckBox:checked");
    const del = document.getElementById("selection-element");
    ele.forEach((element) => {
      dispatch(onDeleteBlogs(element.value));
      del.style.display = 'none';
    });
  };

  const columns = useMemo(
    () => [
      {
        Header: "#",
        Cell: (cell) => {
          return <input type="checkbox" className="productCheckBox form-check-input" value={cell.row.original._id} onClick={() => displayDelete()} />;
        },
      },
      {
        Header: "Нийтлэл",
        Cell: (product) => (
          <>
            <div className="d-flex align-items-center">
              {product.row.original.thumbnail && 
              <div className="flex-shrink-0 me-3">
                <div className="avatar-sm bg-light rounded p-1">
                  {/* {console.log(product),"aa"} */}
                  
                  <img
                    src={process.env.REACT_APP_API_URL + "/upload/" + product.row.original.thumbnail}
                    alt=""
                    className="img-fluid d-block"
                  />
                </div>
              </div>
                       }
              <div className="flex-grow-1">
                <h5 className="fs-14 mb-1">
                  <Link
                    to={`/apps-ecommerce-product-details/${product.row.original.id}`}
                    className="text-dark"
                  >
                    {" "}
                    {product.row.original.title}
                  </Link>
                </h5>
              </div>
            </div>
          </>
        ),
      },
      {
        Header: "Хандалт",
        accessor: "count",
        filterable: false,
      },
      {
        Header: "Нийтэлсэн",
        accessor: "createdAt",
        filterable: false,
        Cell: (cellProps) => {
          return <Published {...cellProps} />;
        },
      },
      {
        Header: "Үйлдэл",
        Cell: (cellProps) => {
          return (
            <UncontrolledDropdown>
              <DropdownToggle
                href="#"
                className="btn btn-soft-secondary btn-sm"
                tag="button"
              >
                <i className="ri-more-fill" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem href={`apps-ecommerce-product-details/${cellProps.row.original.id}`}>
                  <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                  Үзэх
                </DropdownItem>

                <DropdownItem href="apps-ecommerce-add-product">
                  <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                  Өөрчлөх
                </DropdownItem>

                <DropdownItem divider />

                <DropdownItem
                  href="#"
                  onClick={() => {
                    const productData = cellProps.row.original;
                    onClickDelete(productData);
                  }}
                >
                  <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                  Устгах
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          );
        },
      },
    ],
    []
  );

  return (
    <div className="page-content">
      <ToastContainer closeButton={false} />
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteProduct}
        onCloseClick={() => setDeleteModal(false)}
      />
      <DeleteModal
        show={deleteModalMulti}
        onDeleteClick={() => {
          deleteMultiple();
          setDeleteModalMulti(false);
        }}
        onCloseClick={() => setDeleteModalMulti(false)}
      />
      <Container fluid>
        <BreadCrumb title="Нийтлэл" pageTitle="Нийтлэл" />

        <Row>
          <div className="col-xl-9 col-lg-8">
            <div>
              <div className="card">
                <div className="card-header border-0">
                  <div className="row align-items-center">
                    <div className="col">
                      <Nav
                        className="nav-tabs-custom card-header-tabs border-bottom-0"
                        role="tablist"
                      >
                        <NavItem>
                          <NavLink
                            className={classnames(
                              { active: activeTab === "1" },
                              "fw-semibold text-body"
                            )}
                            onClick={() => {
                              toggleTab("1", "all");
                            }}
                            href="#"
                          >
                            Бүгд{" "}
                          </NavLink>
                        </NavItem>
                    
                      </Nav>
                    </div>
                    <div className="col-auto">
                      <div id="selection-element">
                        <div className="my-n1 d-flex align-items-center text-muted">
                          Сонгогдсон{" "}
                          <div
                            id="select-content"
                            className="text-body fw-semibold px-1"
                          >{dele}</div>{" "}
                          Илэрц{" "}
                          <button
                            type="button"
                            className="btn btn-link link-danger p-0 ms-3"
                            onClick={() => setDeleteModalMulti(true)}
                          >
                            Устгах
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body pt-0">
                  {productList && productList.length > 0 ? (
                    <>
                      <TableContainer
                        columns={columns}
                        data={(productList || [])}
                        isGlobalFilter={true}
                        isAddUserList={false}
                        customPageSize={10}
                        divClass="table-responsive mb-1"
                        tableClass="mb-0 align-middle table-borderless"
                        theadClass="table-light text-muted"
                        isProductsFilter={true}
                        SearchPlaceholder={"Нийтлэл хайх..."}
                      />
                    </>
                  ) : (
                    <>
                      <div className="py-4 text-center">
                        <div>
                          <lord-icon
                            src="https://cdn.lordicon.com/msoeawqm.json"
                            trigger="loop"
                            colors="primary:#405189,secondary:#0ab39c"
                            style={{ width: "72px", height: "72px" }}
                          ></lord-icon>
                        </div>

                        <div className="mt-4">
                          <h5>Нийтлэл олдсонгеи</h5>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Blogs;
