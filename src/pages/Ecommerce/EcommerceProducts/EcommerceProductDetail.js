import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Tooltip,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";

import BreadCrumb from "../../../Components/Common/BreadCrumb";

import { Swiper, SwiperSlide } from "swiper/react";
import classnames from "classnames";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import SwiperCore, { FreeMode, Navigation, Thumbs } from "swiper";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

SwiperCore.use([FreeMode, Navigation, Thumbs]);

function EcommerceProductDetail(props) {
  let { id } = useParams();
  const [data, setData] = useState([]);


  useEffect(() => {
    axios
      .get("https://altanzaan.org/api/v1/products/" + id)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [ttop, setttop] = useState(false);
  const [customActiveTab, setcustomActiveTab] = useState("1");
  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };
  if (!data) {
    return null;
  }
  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Бараа дэлгэрэнгүй" pageTitle="Дэлгүүр" />
        <Row>
          <Col lg={12}>
            <Card>
              <CardBody>
                <Row className="gx-lg-5">
                  <Col xl={4} md={8} className="mx-auto">
                    <div className="product-img-slider sticky-side-div">
                      <Swiper
                        navigation={true}
                        thumbs={{ swiper: thumbsSwiper }}
                        className="swiper product-thumbnail-slider p-2 rounded bg-light"
                      >
                        <div className="swiper-wrapper">
                          {data.images && (
                            <>
                              <SwiperSlide>
                                <img
                                  src={`https://altanzaan.org/upload/${data.images.image1}`}
                                  alt=""
                                  className="img-fluid d-block"
                                />
                                {console.log(data.images.image1)}
                              </SwiperSlide>
                              {data.images.image2 && (
                                <SwiperSlide>
                                  <img
                                    src={`https://altanzaan.org/upload/${data.images.image2}`}
                                    alt=""
                                    className="img-fluid d-block"
                                  />
                                </SwiperSlide>
                              )}
                              {data.images.image3 && (
                                <SwiperSlide>
                                  <img
                                    src={`https://altanzaan.org/upload/${data.images.image3}`}
                                    alt=""
                                    className="img-fluid d-block"
                                  />
                                </SwiperSlide>
                              )}
                              {data.images.image4 && (
                                <SwiperSlide>
                                  <img
                                    src={`https://altanzaan.org/upload/${data.images.image4}`}
                                    alt=""
                                    className="img-fluid d-block"
                                  />
                                </SwiperSlide>
                              )}
                            </>
                          )}
                        </div>
                      </Swiper>

                      <div className="product-nav-slider mt-2">
                        <Swiper
                          onSwiper={setThumbsSwiper}
                          slidesPerView={4}
                          freeMode={true}
                          watchSlidesProgress={true}
                          spaceBetween={10}
                          className="swiper product-nav-slider mt-2 overflow-hidden"
                        >
                          <div className="swiper-wrapper">
                            {data.images && (
                              <>
                                <SwiperSlide className="rounded">
                                  <div className="nav-slide-item">
                                    <img
                                      src={`https://altanzaan.org/upload/${data.images.image1}`}
                                      alt=""
                                      className="img-fluid d-block rounded"
                                    />
                                  </div>
                                </SwiperSlide>
                                {data.images.image2 && (
                                  <SwiperSlide>
                                    <div className="nav-slide-item">
                                      <img
                                        src={`https://altanzaan.org/upload/${data.images.image2}`}
                                        alt=""
                                        className="img-fluid d-block rounded"
                                      />
                                    </div>
                                  </SwiperSlide>
                                )}
                                {data.images.image3 && (
                                  <SwiperSlide>
                                    <div className="nav-slide-item">
                                      <img
                                        src={`https://altanzaan.org/upload/${data.images.image3}`}
                                        alt=""
                                        className="img-fluid d-block rounded"
                                      />
                                    </div>
                                  </SwiperSlide>
                                )}
                                {data.images.image4 && (
                                  <SwiperSlide>
                                    <div className="nav-slide-item">
                                      <img
                                        src={`https://altanzaan.org/upload/${data.images.image4}`}
                                        alt=""
                                        className="img-fluid d-block rounded"
                                      />
                                    </div>
                                  </SwiperSlide>
                                )}
                              </>
                            )}
                          </div>
                        </Swiper>
                      </div>
                    </div>
                  </Col>

                  <Col xl={8}>
                    <div className="mt-xl-0 mt-5">
                      <div className="d-flex">
                        <div className="flex-grow-1">
                          <h4>{data.title}</h4>
                          <div className="hstack gap-3 flex-wrap">
                            <div>
                              <Link to="#" className="text-primary d-block">
                                {data.subCategory}
                              </Link>
                            </div>
                            <div className="vr"></div>
                            {/* <div className="text-muted">
                              Katегори :{" "}
                              <span className="text-body fw-medium">
                                Хүүхэд
                              </span>
                            </div> */}
                            <div className="vr"></div>
                            <div className="text-muted">
                              Нийтэлсэн :{" "}
                              <span className="text-body fw-medium">
                                {data.createdAt}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <div>
                            <Tooltip
                              placement="top"
                              isOpen={ttop}
                              target="TooltipTop"
                              toggle={() => {
                                setttop(!ttop);
                              }}
                            >
                              Өөрчлөх
                            </Tooltip>
                            <a
                              href={`apps-ecommerce-edit-product/${data.id}`}
                              id="TooltipTop"
                              className="btn btn-light"
                            >
                              <i className="ri-pencil-fill align-bottom"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <Row className="mt-4">
                        <Col lg={3} sm={6}>
                          <div className="p-2 border border-dashed rounded">
                            <div className="d-flex align-items-center">
                              <div className="avatar-sm me-2">
                                <div className="avatar-title rounded bg-transparent text-info fs-24">
                                  <i className="ri-money-dollar-circle-fill"></i>
                                </div>
                              </div>
                              <div className="flex-grow-1">
                                <p className="text-muted mb-1">Үнэ :</p>
                                <h5 className="mb-0">{data.price}</h5>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col lg={3} sm={6}>
                          <div className="p-2 border border-dashed rounded">
                            <div className="d-flex align-items-center">
                              <div className="avatar-sm me-2">
                                <div className="avatar-title rounded bg-transparent text-info fs-24">
                                  <i className="ri-stock-fill"></i>
                                </div>
                              </div>
                              <div className="flex-grow-1">
                                <p className="text-muted mb-1">Үлдэгдэл :</p>
                                <h5 className="mb-0">{data.stock}</h5>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col lg={3} sm={6}>
                          <div className="p-2 border border-dashed rounded">
                            <div className="d-flex align-items-center">
                              <div className="avatar-sm me-2">
                                <div className="avatar-title rounded bg-transparent text-info fs-24">
                                  <i className="ri-stock-fill"></i>
                                </div>
                              </div>
                              <div className="flex-grow-1">
                                <p className="text-muted mb-1">
                                  Төсөөллийн ашиг :
                                </p>
                                <h5 className="mb-0">
                                  {data.stock * data.price}
                                </h5>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                      <div className="mt-4 text-muted">
                        <h5 className="fs-14">Танилцуулга :</h5>
                        <p>
                         {data.shortDescription}
                        </p>
                      </div>

                      {/* <Row>
                        <Col sm={6}>
                          <div className="mt-3">
                            <h5 className="fs-14">Features :</h5>
                            <ul className="list-unstyled">
                              <li className="py-1">
                                <i className="mdi mdi-circle-medium me-1 text-muted align-middle"></i>{" "}
                                Full Sleeve
                              </li>
                              <li className="py-1">
                                <i className="mdi mdi-circle-medium me-1 text-muted align-middle"></i>{" "}
                                Cotton
                              </li>
                              <li className="py-1">
                                <i className="mdi mdi-circle-medium me-1 text-muted align-middle"></i>{" "}
                                All Sizes available
                              </li>
                              <li className="py-1">
                                <i className="mdi mdi-circle-medium me-1 text-muted align-middle"></i>{" "}
                                4 Different Color
                              </li>
                            </ul>
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div className="mt-3">
                            <h5 className="fs-14">Services :</h5>
                            <ul className="list-unstyled product-desc-list">
                              <li className="py-1">10 Days Replacement</li>
                              <li className="py-1">
                                Cash on Delivery available
                              </li>
                            </ul>
                          </div>
                        </Col>
                      </Row> */}

                      <div className="product-content mt-5">
                        <h5 className="fs-14 mb-3">
                          Барааны бүрэн Танилцуулга :
                        </h5>
                        <Nav tabs className="nav-tabs-custom nav-success">
                          <NavItem>
                            <NavLink
                              style={{ cursor: "pointer" }}
                              className={classnames({
                                active: customActiveTab === "1",
                              })}
                              onClick={() => {
                                toggleCustom("1");
                              }}
                            >
                              Мэдээлэл
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              style={{ cursor: "pointer" }}
                              className={classnames({
                                active: customActiveTab === "2",
                              })}
                              onClick={() => {
                                toggleCustom("2");
                              }}
                            >
                              Дэлгэрэнгүй
                            </NavLink>
                          </NavItem>
                        </Nav>

                        <TabContent
                          activeTab={customActiveTab}
                          className="border border-top-0 p-4"
                          id="nav-tabContent"
                        >
                          <TabPane id="nav-speci" tabId="1">
                            <div className="table-responsive">
                              <table className="table mb-0">
                                <tbody>
                                  <tr>
                                    <th scope="row" style={{ width: "200px" }}>
                                      Category
                                    </th>
                                    <td>Мэдээлэл</td>
                                  </tr>
                                  {/* <tr>
                                    <th scope="row">Brand</th>
                                    <td>Tommy Hilfiger</td>
                                  </tr> */}
                                 
                                  <tr>
                                    <th scope="row">Орц</th>
                                    <td>{data.ingredients}</td>
                                  </tr>
                                  <tr>
                                    <th scope="row">Хэмжээ</th>
                                    <td>{data.weight}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </TabPane>
                          <TabPane id="nav-detail" tabId="2">
                            <div>
                              <h5 className="font-size-16 mb-3">
                                {data.title}
                              </h5>
                              <p>
                              {data.description}
                              </p>
                            </div>
                          </TabPane>
                        </TabContent>
                      </div>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default EcommerceProductDetail;
