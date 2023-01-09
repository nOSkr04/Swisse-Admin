import React, { useEffect, useState } from "react";

//Import Breadcrumb
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import {
  CardBody,
  Container,
  Card,
  Row,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";

// import { sellersList } from "../../../common/data/index";

//redux
import { useSelector, useDispatch } from "react-redux";
//Import actions
import { getSellers as onGetSellers } from "../../../store/ecommerce/action";

const EcommerceSellers = () => {
  document.title = "Алтан заан ХХК || Дэлгүүр";
  const dispatch = useDispatch();
  const [sellerList, setSellerList] = useState([]);

  const { sellers } = useSelector((state) => ({
    sellers: state.Ecommerce.sellers,
  }));

  useEffect(() => {
    setSellerList(sellers);
  }, [sellers]);

  useEffect(() => {
    dispatch(onGetSellers());
  }, [dispatch]);

  useEffect(() => {
    if (!isEmpty(sellers)) setSellerList(sellers);
  }, [sellers]);
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Дэлгүүр" pageTitle="Алтан заан" />
          <Row className="mt-4">
            {sellerList.map((seller, key) => (
              <React.Fragment key={key}>
                <Col xl={3} lg={6}>
                  <Card className="ribbon-box right overflow-hidden">
                    <CardBody className="text-center p-4">
                      {/* {seller.isTrending && (
                        <div className="ribbon ribbon-info ribbon-shape trending-ribbon">
                          <i className="ri-flashlight-fill text-white align-bottom"></i>{" "}
                          <span className="trending-ribbon-text">Trending</span>
                        </div>
                      )} */}
                      <img src={seller.img} alt="" height="45" />
                      <h5 className="mb-1 mt-4">
                        <Link
                          to="/apps-ecommerce-seller-details"
                          className="link-primary"
                        >
                          {/* {seller.label} */}
                          Swisse
                        </Link>
                      </h5>
                      <Row className="mt-4">
                        <Col lg={6} className="border-end-dashed border-end">
                          <h5>{seller.stock}</h5>
                          <span className="text-muted">Нийт үлдэгдэл</span>
                        </Col>
                        <Col lg={6}>
                          <h5>{seller.balance}</h5>
                          <span className="text-muted">Нийт дүн</span>
                        </Col>
                      </Row>
                      <div className="mt-4">
                        <Link
                          to="/apps-ecommerce-seller-details"
                          className="btn btn-light w-100"
                        >
                          Дэлгэрэнгүй
                        </Link>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </React.Fragment>
            ))}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EcommerceSellers;
