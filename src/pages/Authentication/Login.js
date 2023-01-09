import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Container, Input, Label, Row, Button, Form, FormFeedback, Alert } from 'reactstrap';
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";


// actions
import { loginUser,  resetLoginFlag } from "../../store/actions";

import logoLight from "../../assets/images/logo-light.png";


import withRouter from '../../Components/Common/withRouter';

const Login = (props) => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => ({
        user: state.Account.user,
    }));

    const [userLogin, setUserLogin] = useState([]);

    useEffect(() => {
        document.documentElement.setAttribute("data-body-image", "img-3")
        document.documentElement.setAttribute("data-layout-mode", "dark")
    }, []);

    useEffect(() => {

        if (user && user) {
            setUserLogin({
                phone: user.user.phone,
                password: user.user.confirm_password
            });
        }
    }, [user]);

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            phone: userLogin.phone || "97014400" || '',
            password: userLogin.password || "1234" || '',
        },
        validationSchema: Yup.object({
            phone: Yup.string().required("Please Enter Your phone"),
            password: Yup.string().required("Please Enter Your Password"),
        }),
        onSubmit: (values) => {
            dispatch(loginUser(values, props.router.navigate));
        }
    });

    const { error } = useSelector(state => ({
        error: state.Login.error,
    }));



   

    useEffect(() => {
        setTimeout(() => {
            dispatch(resetLoginFlag());
        }, 3000);
    }, [dispatch, error]);

    document.title = "Алтан заан ХХК Админ";
    return (
        <React.Fragment>
            <ParticlesAuth>
                <div className="auth-page-content">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="text-center mt-sm-5 mb-4 text-white-50">
                                    <div>
                                        <Link to="/" className="d-inline-block auth-logo">
                                            <img src={logoLight} alt="" height="20" />
                                        </Link>
                                    </div>
                                    <p className="mt-3 fs-15 fw-medium">Алтан заан ХХК </p>
                                </div>
                            </Col>
                        </Row>

                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5}>
                                <Card className="mt-4 card-bg-fill">
                                    <CardBody className="p-4">
                                        <div className="text-center mt-2">
                                            <h5 className="text-primary">Тавтай морил !</h5>
                                            <p className="text-muted">Админ эрхээр нэвтрэн орно уу.</p>
                                        </div>
                                        {error && error ? (<Alert color="danger"> {error} </Alert>) : null}
                                        <div className="p-2 mt-4">
                                            <Form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    validation.handleSubmit();
                                                    return false;
                                                }}
                                                action="#">

                                                <div className="mb-3">
                                                    <Label htmlFor="phone" className="form-label">phone</Label>
                                                    <Input
                                                        name="phone"
                                                        className="form-control"
                                                        placeholder="Enter phone"
                                                        type="phone"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.phone || ""}
                                                        invalid={
                                                            validation.touched.phone && validation.errors.phone ? true : false
                                                        }
                                                    />
                                                  
                                                </div>

                                                <div className="mb-3">
                                                  
                                                    <Label className="form-label" htmlFor="password-input">Нууц үг</Label>
                                                    <div className="position-relative auth-pass-inputgroup mb-3">
                                                        <Input
                                                            name="password"
                                                            value={validation.values.password || ""}
                                                            type="password"
                                                            className="form-control pe-5"
                                                            placeholder="Нууц үг"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            invalid={
                                                                validation.touched.password && validation.errors.password ? true : false
                                                            }
                                                        />
                                                        {validation.touched.password && validation.errors.password ? (
                                                            <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                                                        ) : null}
                                                        <button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted" type="button" id="password-addon"><i className="ri-eye-fill align-middle"></i></button>
                                                    </div>
                                                </div>

                                            

                                                <div className="mt-4">
                                                    <Button color="primary" className="btn btn-primary w-100" type="submit">Нэвтрэх</Button>
                                                </div>

                                            
                                            </Form>
                                        </div>
                                    </CardBody>
                                </Card>

                             

                            </Col>
                        </Row>
                    </Container>
                </div>
            </ParticlesAuth>
        </React.Fragment>
    );
};

export default withRouter(Login);