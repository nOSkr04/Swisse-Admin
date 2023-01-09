import React, { useEffect, useState, useMemo } from "react";

import {
  CardBody,
  Container,
  Progress,
  Row,
  Card,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table,
} from "reactstrap";

//Import Breadcrumb
import BreadCrumb from "../../../Components/Common/BreadCrumb";

import Img2 from "../../../assets/images/companies/img-2.png";
import TableContainer from "../../../Components/Common/TableContainer";
//Import actions
import { getProducts as onGetProducts } from "../../../store/ecommerce/action";


import {
  Rating,
  Published,
  Price,
} from "../EcommerceProducts/EcommerceProductCol";


//redux
import { useSelector, useDispatch } from "react-redux";

const EcommerceSellerDetail = () => {
  document.title = "Алтан заан ХХК || Дэлгүүр дэлгэрэнгүй ";
  const dispatch = useDispatch();

  const { products } = useSelector((state) => ({
    products: state.Ecommerce.products,
  }));

  const [productList, setProductList] = useState([]);

  useEffect(() => {
    setProductList(products);
  }, [products]);

  useEffect(() => {
    dispatch(onGetProducts());
  }, [dispatch]);

  const columns = useMemo(
    () => [
      {
        Header: "#",
        Cell: () => {
          return <input type="checkbox" className="form-check-input"/>;
        },
      },
      {
        Header: "Product",
        Cell: (product) => (
          <>
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0 me-3">
                <div className="avatar-sm bg-light rounded p-1">
                  <img
                    src={process.env.REACT_APP_API_URL + "/images/products/" + product.row.original.image}
                    alt=""
                    className="img-fluid d-block"
                  />
                </div>
              </div>
              <div className="flex-grow-1">
                <h5 className="fs-14 mb-1">
                  <a
                    href="apps-ecommerce-product-details"
                    className="text-dark"
                  >
                    {" "}
                    {product.row.original.name}
                  </a>
                </h5>
                <p className="text-muted mb-0">
                  Category :{" "}
                  <span className="fw-medium">
                    {" "}
                    {product.row.original.category}
                  </span>
                </p>
              </div>
            </div>
          </>
        ),
      },
      {
        Header: "Stock",
        accessor: "stock",
        filterable: false,
      },
      {
        Header: "Price",
        accessor: "price",
        filterable: false,
        Cell: (cellProps) => {
          return <Price {...cellProps} />;
        },
      },
      {
        Header: "Orders",
        accessor: "orders",
        filterable: false,
      },
      {
        Header: "Rating",
        accessor: "rating",
        filterable: false,
        Cell: (cellProps) => {
          return <Rating {...cellProps} />;
        },
      },
      {
        Header: "Published",
        accessor: "publishedDate",
        filterable: false,
        Cell: (cellProps) => {
          return <Published {...cellProps} />;
        },
      },
      {
        Header: "Action",
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
                <DropdownItem href="apps-ecommerce-product-details">
                  <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                  View
                </DropdownItem>

                <DropdownItem href="apps-ecommerce-add-product">
                  <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                  Edit
                </DropdownItem>

                <DropdownItem divider />

                <DropdownItem
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#removeItemModal"
                >
                  <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                  Delete
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
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
        
          <BreadCrumb title="Дэлгүүр дэлгэрэнгүй" pageTitle="Дэлгүүр" />
          <Row>
            <div className="col-xxl-3">
              <Card>
                <CardBody className="p-4">
                  <div>
                    <div className="flex-shrink-0 avatar-md mx-auto">
                      <div className="avatar-title bg-light rounded">
                        <img src={Img2} alt="" height="50" />
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <h5 className="mb-1">Swisse</h5>
                      <p className="text-muted">2021 он</p>
                    </div>
                  
                  </div>
                </CardBody>
              </Card>
            </div>

            <div className="col-xxl-9">
              <Card>
                <CardBody>
                  <div
                    className="table-card gridjs-border-none pb-2"
                  >
                    <TableContainer
                      columns={columns}
                      data={(productList || [])}
                      isGlobalFilter={false}
                      isAddUserList={false}
                      customPageSize={10}
                      divClass="table-responsive"
                      tableClass="mb-0 table-borderless"
                      theadClass="table-light text-muted"
                    />
                  </div>
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EcommerceSellerDetail;
