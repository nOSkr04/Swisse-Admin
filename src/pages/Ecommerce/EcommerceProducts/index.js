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
  UncontrolledCollapse,
  Row,
  Card,
  CardHeader,
  Col,
} from "reactstrap";
import classnames from "classnames";

// RangeSlider
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

import DeleteModal from "../../../Components/Common/DeleteModal";

import BreadCrumb from "../../../Components/Common/BreadCrumb";
import TableContainer from "../../../Components/Common/TableContainer";
import { Rating, Published, Price } from "./EcommerceProductCol";
//Import data
// import { productsData } from "../../../common/data";

//Import actions
import { getProducts as onGetProducts, deleteProducts as onDeleteProducts } from "../../../store/ecommerce/action";
import { isEmpty } from "lodash";
import Select from "react-select";

//redux
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const EcommerceProducts = (props) => {
  document.title = "Алтан заан ХХК || Бараанууд";
  const dispatch = useDispatch();

  const { products } = useSelector((state) => ({
    products: state.Ecommerce.products,
  }));


  const [productList, setProductList] = useState([]);
  const [activeTab, setActiveTab] = useState("1");

  const [product, setProduct] = useState(null);



  useEffect(() => {
    setProductList(products);
  }, [products]);

  useEffect(() => {
    if (products && !products.length) {
      dispatch(onGetProducts());
    }
  }, [dispatch, products]);

  useEffect(() => {
    if (!isEmpty(products)) setProductList(products);
  }, [products]);

  const toggleTab = (tab, type) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      let filteredProducts = products;
      if (type !== "all") {
        filteredProducts = products.filter((product) => product.status === type);
      }
      setProductList(filteredProducts);
    }
  };
  // useEffect(() => {
  //   onUpdate([0, 2000])
  // }, [])

  // const onUpdate = (value) => {
  //   setProductList( 
  //     productList.filter(
  //       (product) => product.price >= value[0] && product.price <= value[1],
  //       document.getElementById("minCost").value = value[0],
  //       document.getElementById("maxCost").value = value[1],
  //     )
  //   );
  // };

  const [cate, setCate] = useState("all");

  const categories = (category) => {
    let filteredProducts = products;
    if (category !== "all") {
      filteredProducts = products.filter((product) => product.subCategory === category);
    }
    setProductList(filteredProducts);
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
      dispatch(onDeleteProducts(product._id));
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
      dispatch(onDeleteProducts(element.value));
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
        Header: "Бараа",
        Cell: (product) => (
          <>
            <div className="d-flex align-items-center">
              {product.row.original.images && 
              <div className="flex-shrink-0 me-3">
                <div className="avatar-sm bg-light rounded p-1">
                  {/* {console.log(product),"aa"} */}
                  
                  <img
                    src={process.env.REACT_APP_API_URL + "/upload/" + product.row.original.images.image1}
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
                <p className="text-muted mb-0">
                  Category :{" "}
                  <span className="fw-medium">
                    {" "}
                    {product.row.original.subCategory}
                  </span>
                </p>
              </div>
            </div>
          </>
        ),
      },
      {
        Header: "Үлдэгдэл",
        accessor: "stock",
        filterable: false,
      },
      {
        Header: "Үнэ",
        accessor: "price",
        filterable: false,
        Cell: (cellProps) => {
          return <Price {...cellProps} />;
        },
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

                <DropdownItem href={`apps-ecommerce-edit-product/${cellProps.row.original.id}`}>
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
        <BreadCrumb title="Бүтээгдэхүүн" pageTitle="Бараа" />

        <Row>
          <Col xl={3} lg={4}>
            <Card>
              <CardHeader >
                <div className="d-flex mb-3">
                  <div className="flex-grow-1">
                    <h5 className="fs-16">Шүүх</h5>
                  </div>
                
                </div>

              </CardHeader>

              <div className="accordion accordion-flush">
                <div className="card-body border-bottom">
                  <div>
                    <p className="text-muted text-uppercase fs-12 fw-medium mb-2">
                      Дэлүүр
                    </p>
                    <ul className="list-unstyled mb-0 filter-list">
                      <li>
                        <Link to="#" className={cate === "Kitchen Storage & Containers" ? "active d-flex py-1 align-items-center" : "d-flex py-1 align-items-center"} onClick={() => categories("Kitchen Storage & Containers")}>
                          <div className="flex-grow-1">
                            <h5 className="fs-13 mb-0 listname">Swisse</h5>
                          </div>
                          <div className="flex-shrink-0 ms-2">
                            <span className="badge bg-light text-muted">5</span>
                          </div>
                        </Link>
                      </li>
                      {/* <li>
                        <Link to="#" className={cate === "Clothes" ? "active d-flex py-1 align-items-center" : "d-flex py-1 align-items-center"} onClick={() => categories("Clothes")}>
                          <div className="flex-grow-1">
                            <h5 className="fs-13 mb-0 listname">Nutrex</h5>
                          </div>
                          <div className="flex-shrink-0 ms-2">
                            <span className="badge bg-light text-muted">5</span>
                          </div>
                        </Link>
                      </li> */}
                    </ul>
                  </div>
                </div>

                <div className="card-body border-bottom">
                  <p className="text-muted text-uppercase fs-12 fw-medium mb-4">
                    Үнэ
                  </p>

                  {/* <Nouislider
                    range={{ min: 0, max: 2000 }}
                    start={[0, 2000]}
                    connect
                    onSlide={onUpdate}
                    data-slider-color="primary"
                    id="product-price-range"
                  /> */}
                   <div className="formCost d-flex gap-2 align-items-center mt-3">
                    <input className="form-control form-control-sm" type="text" id="minCost" readOnly />
                    <span className="fw-semibold text-muted">to</span>
                    <input className="form-control form-control-sm" type="text" id="maxCost" readOnly />
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button bg-transparent shadow-none"
                      type="button"
                      id="flush-headingBrands"
                    >
                      <span className="text-muted text-uppercase fs-12 fw-medium">
                        Категори
                      </span>{" "}
                  
                    </button>
                  </h2>
                  {/* <UncontrolledCollapse
                    toggler="#flush-headingBrands"
                    defaultOpen
                  >
                    <div
                      id="flush-collapseBrands"
                      className="accordion-collapse collapse show"
                      aria-labelledby="flush-headingBrands"
                    >
                      <div className="accordion-body text-body pt-0">
                        <div className="d-flex flex-column gap-2 mt-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="productBrandRadio5"
                              defaultChecked
                            />
                            <label
                              className="form-check-label"
                              htmlFor="productBrandRadio5"
                            >
                              Хүүхэд - Swisse
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="productBrandRadio4"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="productBrandRadio4"
                            >
                              Хүүхэд - Swisse
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="productBrandRadio3"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="productBrandRadio3"
                            >
                               Хүүхэд - Swisse
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </UncontrolledCollapse> */}
                </div>
              </div>
            </Card>
          </Col>

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
                        SearchPlaceholder={"Бараа хайх..."}
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
                          <h5>Бараа олдсонгеи</h5>
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

export default EcommerceProducts;
