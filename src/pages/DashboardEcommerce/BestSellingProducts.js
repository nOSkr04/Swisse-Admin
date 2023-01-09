import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { bestSellingProducts } from "../../common/data";

const BestSellingProducts = () => {
    // 1
    return (
        <React.Fragment>
            <Col xl={6}>
                <Card>
                    <CardHeader className="align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">Swisse өндөр хандалттай бараанууд</h4>
                       
                    </CardHeader>

                    <CardBody>
                        <div className="table-responsive table-card">
                            <table className="table table-hover table-centered align-middle table-nowrap mb-0">
                                <tbody>
                                    {(bestSellingProducts || []).map((item, key) => (
                                        <tr key={key}>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div className="avatar-sm bg-light rounded p-1 me-2">
                                                        <img src={item.img} alt="" className="img-fluid d-block" />
                                                    </div>
                                                    <div>
                                                        <h5 className="fs-14 my-1"><Link to="/apps-ecommerce-product-details" className="text-reset">{item.label}</Link></h5>
                                                        <span className="text-muted">{item.date}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <h5 className="fs-14 my-1 fw-normal">${item.price}</h5>
                                                <span className="text-muted">Price</span>
                                            </td>
                                            <td>
                                                <h5 className="fs-14 my-1 fw-normal">{item.orders}</h5>
                                                <span className="text-muted">Orders</span>
                                            </td>
                                            <td>
                                                <h5 className="fs-14 my-1 fw-normal">{item.stock ? item.stock : <span className="badge badge-soft-danger">Out of stock</span>} </h5>
                                                <span className="text-muted">Stock</span>
                                            </td>
                                            <td>
                                                <h5 className="fs-14 my-1 fw-normal">${item.amount}</h5>
                                                <span className="text-muted">Amount</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="align-items-center mt-4 pt-2 justify-content-between d-flex">
                            <div className="flex-shrink-0">
                                <div className="text-muted">Showing <span className="fw-semibold">5</span> of <span className="fw-semibold">25</span> Results
                                </div>
                            </div>
                            <ul className="pagination pagination-separated pagination-sm mb-0">
                                <li className="page-item disabled">
                                    <Link to="#" className="page-link">←</Link>
                                </li>
                                <li className="page-item">
                                    <Link to="#" className="page-link">1</Link>
                                </li>
                                <li className="page-item active">
                                    <Link to="#" className="page-link">2</Link>
                                </li>
                                <li className="page-item">
                                    <Link to="#" className="page-link">3</Link>
                                </li>
                                <li className="page-item">
                                    <Link to="#" className="page-link">→</Link>
                                </li>
                            </ul>
                        </div>

                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default BestSellingProducts;