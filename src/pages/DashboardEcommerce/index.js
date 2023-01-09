import React from "react";
import { Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import Widget from "./Widgets";
import BestSellingProducts from "./BestSellingProducts";
import RecentOrders from "./RecentOrders";
import StoreVisits from "./StoreVisits";
import TopSellers from "./TopSellers";


const DashboardEcommerce = () => {
  document.title = "Алтан заан || Хянах самбар";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="хянах самбар" pageTitle="Нүүр" />
          {/* <Row>
            <Col>
              <div className="h-100">
                <Row>
                  <Widget />
                </Row>
               
                <Row>
                  <BestSellingProducts />
                  <TopSellers />
                </Row>
                <Row>
                  <StoreVisits />
                  <RecentOrders />
                </Row>
              </div>
            </Col>
          </Row> */}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DashboardEcommerce;
