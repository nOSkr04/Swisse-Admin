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

import BreadCrumb from "../../Components/Common/BreadCrumb";

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

function BlogDetail(props) {
  let { id } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("https://altanzaan.org/api/v1/blogs/" + id)
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
                          {data.thumbnail && (
                            <>
                              <SwiperSlide>
                                <img
                                  src={`https://altanzaan.org/upload/${data.thumbnail}`}
                                  alt=""
                                  className="img-fluid d-block"
                                />
                              </SwiperSlide>
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
                            {data.thumbnail && (
                              <>
                                <SwiperSlide className="rounded">
                                  <div className="nav-slide-item">
                                    <img
                                      src={`https://altanzaan.org/upload/${data.thumbnail}`}
                                      alt=""
                                      className="img-fluid d-block rounded"
                                    />
                                  </div>
                                </SwiperSlide>
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
                            <Link
                              to={`blog-edit/${id}`}
                              id="TooltipTop"
                              className="btn btn-light"

                            >
                              <i className="ri-pencil-fill align-bottom"></i>
                            </Link>
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
                                <p className="text-muted mb-1">Хандалт :</p>
                                <h5 className="mb-0">{data.count}</h5>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                         {data.shortDescription &&
                      <div className="mt-4 text-muted">
                        <h5 className="fs-14">Агуулга :</h5>
                        <p>
                          {data.shortDescription}
                        </p>
                      </div>
                         }
                      {data.description && <div dangerouslySetInnerHTML={{__html: data.description}} style={{marginTop:20}} />}
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

export default BlogDetail;
