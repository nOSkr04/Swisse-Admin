import React, { useState } from "react";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import {
  Card,
  CardBody,
  Col,
  Container,
  CardHeader,
  NavLink,
  Row,
  Input,
  Label,
  FormFeedback,
  Form,
} from "reactstrap";

// Redux
import { useDispatch } from "react-redux";
import {
  addNewProduct as onAddNewProduct,
  updateProduct as onUpdateProduct,
} from "../../../store/ecommerce/action";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import classnames from "classnames";
import Dropzone from "react-dropzone";
import { Link, useNavigate } from "react-router-dom";

//formik
import { useFormik } from "formik";
import * as Yup from "yup";

// Import React FilePond
import { registerPlugin } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import axios from "axios";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const EcommerceAddProduct = (props) => {
  document.title = "Алтан заан ХХК || Бараа нэмэх";

  const history = useNavigate();
  const dispatch = useDispatch();

  const [customActiveTab, setcustomActiveTab] = useState("1");
  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };
  const [selectedFiles, setselectedFiles] = useState([]);

  function handleAcceptedFiles(files) {
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    setselectedFiles(files);
  }

  /**
   * Formats the size
   */
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  const productCategory = [
    {
      options: [
        { label: "Swisse", value: "5e90434cd433fa11b078ed8a" },
        // { label: "Nutrex", value: "5e90434cd433fa11b078ed8a" },
      ],
    },
  ];

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      title: "",
      price: 0,
      category: "5e90434cd433fa11b078ed8a",
      stock: 0,
      description: "",
      shortDescription: "",
      subCategory: "Хүүхэд",
      otherInfo: "",
      weight: "",
      ingredients: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Барааны нэр заавал байх ёстой"),
      price: Yup.string().required("Барааны үнэ заавал байх ёстой"),
    }),
    onSubmit: (values) => {
      // const newProduct = {
      //   title: values.title,
      //   price: values.price,
      //   stock: values.stock,
      //   ingredients: values.ingredients,
      //   category: values.category,
      //   weight: values.weight,
      //   subCategory: values.subCategory,
      //   otherInfo: values.otherInfo,
      //   description: values.description,
      //   shortDescription: values.shortDescription,
      // };
      axios
        .post("https://altanzaan.org/api/v1/products", {
          title: values.title,
          price: values.price,
          stock: values.stock,
          ingredients: values.ingredients,
          category: values.category,
          weight: values.weight,
          subCategory: values.subCategory,
          otherInfo: values.otherInfo,
          description: values.description,
          shortDescription: values.shortDescription,
        })
        .then((res) => {
          const newProduct = res.data;
          const data = new FormData()
          const xhr = new XMLHttpRequest()
          console.log(newProduct)
          if (selectedFiles[0]) {
            data.append("file", selectedFiles[0])
            xhr.open(
              "PUT",
              `https://altanzaan.org/api/v1/products/${newProduct._id}/upload-images`,
            )
          }
          // if (selectedFiles[1]) {
          //   data.append("file1", selectedFiles[1])
          //   xhr.open(
          //     "PUT",
          //     `https://altanzaan.org/api/v1/products/${newProduct._id}/upload-images`,
          //   )
          // }
          if (selectedFiles[2]) {
            data.append("file1", selectedFiles[1])
            xhr.open(
              "PUT",
              `https://altanzaan.org/api/v1/products/${newProduct._id}/upload-images`,
            )
          }
          if (selectedFiles[2]) {
            data.append("file2", selectedFiles[2])
            xhr.open(
              "PUT",
              `https://altanzaan.org/api/v1/products/${newProduct._id}/upload-images`,
            )
          }
          if (selectedFiles[3]) {
            data.append("file3", selectedFiles[3])
            xhr.open(
              "PUT",
              `https://altanzaan.org/api/v1/products/${newProduct._id}/upload-images`,
            )
          }
          if (selectedFiles[4]) {
            data.append("file4", selectedFiles[4])
            xhr.open(
              "PUT",
              `https://altanzaan.org/api/v1/products/${newProduct._id}/upload-images`,
            )
          }
          xhr.send(data)
          xhr.onload = function (e) {
            console.log("Request Status", xhr.status);
          };
          // console.log(res);
          // dispatch(onAddNewProduct(newProduct));
          history.push("apps-ecommerce-products");
          validation.resetForm();
        })
        .catch((err) => console.log(err));
    },
  });
  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Бараа үүсгэх" pageTitle="Дэлгүүр" />

        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}
        >
          <Row>
            <Col lg={8}>
              <Card>
                <CardBody>
                  {/* title */}
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="product-title-input">
                      Барааны нэр
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="product-title-input"
                      placeholder="Барааны нэр оруулна уу"
                      name="title"
                      value={validation.values.title || ""}
                      onBlur={validation.handleBlur}
                      onChange={validation.handleChange}
                      invalid={
                        validation.errors.title && validation.touched.title
                          ? true
                          : false
                      }
                    />
                  </div>
                  {/* description */}
                  <div>
                    <Label>Барааны дэлгэрэнгүй</Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="product-description-input"
                      placeholder="Барааны тайлбар оруулна уу"
                      name="description"
                      value={validation.values.description || ""}
                      onBlur={validation.handleBlur}
                      onChange={validation.handleChange}
                      invalid={
                        validation.errors.description &&
                        validation.touched.description
                          ? true
                          : false
                      }
                    />
                    {/* <CKEditor
                      editor={ClassicEditor}
                      name="description"
                      data={validation.values.description}
                      onChange={(event,editor) => {
                        const data = editor.getData();
                        console.log({event,editor,data})
                      }}
                      onReady={(editor) => {
                        console.log(editor)
                      }}
                    /> */}
                  </div>
                  {/* subCategory */}
                  <div>
                    <Label>subCategory</Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="product-subCategory-input"
                      placeholder="Барааны тайлбар оруулна уу"
                      name="subCategory"
                      value={validation.values.subCategory || ""}
                      onBlur={validation.handleBlur}
                      onChange={validation.handleChange}
                      invalid={
                        validation.errors.subCategory &&
                        validation.touched.subCategory
                          ? true
                          : false
                      }
                    />
                  </div>
                  {/* OtherInfo */}
                  <div>
                    <Label>OtherInfo</Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="product-otherInfo-input"
                      placeholder="Барааны тайлбар оруулна уу"
                      name="otherInfo"
                      value={validation.values.otherInfo || ""}
                      onBlur={validation.handleBlur}
                      onChange={validation.handleChange}
                      invalid={
                        validation.errors.otherInfo &&
                        validation.touched.otherInfo
                          ? true
                          : false
                      }
                    />
                  </div>
                  {/* Weight */}
                  <div>
                    <Label>Weight</Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="product-weight-input"
                      placeholder="Барааны тайлбар оруулна уу"
                      name="weight"
                      value={validation.values.weight || ""}
                      onBlur={validation.handleBlur}
                      onChange={validation.handleChange}
                      invalid={
                        validation.errors.weight && validation.touched.weight
                          ? true
                          : false
                      }
                    />
                  </div>
                  {/* ingredients */}
                  <div>
                    <Label>ingredients</Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="product-ingredients-input"
                      placeholder="Барааны тайлбар оруулна уу"
                      name="ingredients"
                      value={validation.values.ingredients || ""}
                      onBlur={validation.handleBlur}
                      onChange={validation.handleChange}
                      invalid={
                        validation.errors.ingredients &&
                        validation.touched.ingredients
                          ? true
                          : false
                      }
                    />
                  </div>
                </CardBody>
              </Card>
              {/* image */}
              <Card>
                <CardHeader>
                  <h5 className="card-title mb-0">Барааны зураг</h5>
                </CardHeader>
                <CardBody>
                  <div>
                    <h5 className="fs-15 mb-1">Барааны зургийн цомог</h5>
                    <p className="text-muted">
                      Барааны зургийн цомог нэмэх (Дээд тал нь 4 зураг!)
                    </p>

                    <Dropzone
                      onDrop={(acceptedFiles) => {
                        handleAcceptedFiles(acceptedFiles);
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div className="dropzone dz-clickable">
                          <div
                            className="dz-message needsclick"
                            {...getRootProps()}
                          >
                            <div className="mb-3">
                              <i className="display-4 text-muted ri-upload-cloud-2-fill" />
                            </div>
                            <h5>Зураг чирч оруулах эсвэл над дээр дар.</h5>
                          </div>
                        </div>
                      )}
                    </Dropzone>
                    <div className="list-unstyled mb-0" id="file-previews">
                      {selectedFiles.map((f, i) => {
                        return (
                          <Card
                            className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                            key={i + "-file"}
                          >
                            <div className="p-2">
                              <Row className="align-items-center">
                                <Col className="col-auto">
                                  <img
                                    data-dz-thumbnail=""
                                    height="80"
                                    className="avatar-sm rounded bg-light"
                                    alt={f.name}
                                    src={f.preview}
                                  />
                                </Col>
                                <Col>
                                  <Link
                                    to="#"
                                    className="text-muted font-weight-bold"
                                  >
                                    {f.name}
                                  </Link>
                                  <p className="mb-0">
                                    <strong>{f.formattedSize}</strong>
                                  </p>
                                </Col>
                              </Row>
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                </CardBody>
              </Card>

              {/* <Card>
                <CardHeader>
                <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: customActiveTab === "2",
                        })}
                        onClick={() => {
                          toggleCustom("2");
                        }}
                      >
                        Meta (Google ийн хайлтын системд холбоно)
                      </NavLink>
                </CardHeader>

                <CardBody>
                      <Row>
                        <Col lg={6}>
                          <div className="mb-3">
                            <Label
                              className="form-label"
                              htmlFor="meta-title-input"
                            >
                               Meta гарчиг(Google ийн хайлтын системд илэрцэд харагдах гарчиг)
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              placeholder="Enter meta title"
                              id="meta-title-input"
                              name="meta_title"
                              value={validation.values.meta_title || ""}
                              onBlur={validation.handleBlur}
                              onChange={validation.handleChange}
                              invalid={
                                validation.errors.meta_title &&
                                validation.touched.meta_title
                                  ? true
                                  : false
                              }
                            />
                            {validation.errors.meta_title &&
                            validation.touched.meta_title ? (
                              <FormFeedback type="invalid">
                                {validation.errors.meta_title}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>

                        <Col lg={6}>
                          <div className="mb-3">
                            <Label
                              className="form-label"
                              htmlFor="meta-keywords-input"
                            >
                                Meta түлхүүр үг(Google ийн хайлтын системд хайх түлхүүр үг)
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              placeholder="Enter meta keywords"
                              id="meta-keywords-input"
                              name="meta_keyword"
                              value={validation.values.meta_keyword || ""}
                              onBlur={validation.handleBlur}
                              onChange={validation.handleChange}
                              invalid={
                                validation.errors.meta_keyword &&
                                validation.touched.meta_keyword
                                  ? true
                                  : false
                              }
                            />
                            {validation.errors.meta_keyword &&
                            validation.touched.meta_keyword ? (
                              <FormFeedback type="invalid">
                                {validation.errors.meta_keyword}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                      </Row>
                      <div>
                        <Label
                          className="form-label"
                          htmlFor="meta-description-input"
                        >
                          Meta тайлбар(Google ийн хайлтын системд илэрцэд харагдах тайлбар)
                        </Label>
                        <textarea
                          className="form-control"
                          id="meta-description-input"
                          placeholder="Meta тайлбар(Google ийн хайлтын системд холбоно)"
                          name="meta_description"
                          rows="3"
                        ></textarea>
                      </div>
                </CardBody>
              </Card> */}
            </Col>

            <Col lg={4}>
              <Card>
                <CardHeader>
                  <h5 className="card-title mb-0">Дэлгүүр сонгох</h5>
                </CardHeader>
                <CardBody>
                  {/* stock */}
                  <div className="mb-3">
                    <label className="form-label" htmlFor="product-stock-input">
                      Үлдэгдэл
                    </label>
                    <div className="input-group mb-3">
                      <Input
                        type="text"
                        className="form-control"
                        id="product-stock-input"
                        placeholder="Үлдэгдэл оруулна уу"
                        name="stock"
                        value={validation.values.stock || ""}
                        onBlur={validation.handleBlur}
                        onChange={validation.handleChange}
                        invalid={
                          validation.errors.stock && validation.touched.stock
                            ? true
                            : false
                        }
                      />
                      {validation.errors.stock && validation.touched.stock ? (
                        <FormFeedback type="invalid">
                          {validation.errors.stock}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </div>
                </CardBody>
                <CardBody>
                  {/* price */}
                  <div className="mb-3">
                    <label className="form-label" htmlFor="product-price-input">
                      Үнэ
                    </label>
                    <div className="input-group mb-3">
                      <span
                        className="input-group-text"
                        id="product-price-addon"
                      >
                        ₮
                      </span>
                      <Input
                        type="text"
                        className="form-control"
                        id="product-price-input"
                        placeholder="Үнэ оруулна уу"
                        name="price"
                        aria-label="Price"
                        aria-describedby="product-price-addon"
                        value={validation.values.price || ""}
                        onBlur={validation.handleBlur}
                        onChange={validation.handleChange}
                        invalid={
                          validation.errors.price && validation.touched.price
                            ? true
                            : false
                        }
                      />
                      {validation.errors.price && validation.touched.price ? (
                        <FormFeedback type="invalid">
                          {validation.errors.price}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </div>
                </CardBody>
              </Card>
              {/* category */}
              <Card>
                <CardHeader>
                  <h5 className="card-title mb-0">Дэлгүүр сонгох</h5>
                </CardHeader>
                <CardBody>
                  <p className="text-muted mb-2">Дэлгүүр сонгох</p>
                  <Input
                    name="category"
                    type="select"
                    className="form-select"
                    id="category-field"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.category || ""}
                  >
                    {productCategory.map((item, key) => (
                      <React.Fragment key={key}>
                        {item.options.map((item, key) => (
                          <option value={item.value} key={key}>
                            {item.label}
                          </option>
                        ))}
                      </React.Fragment>
                    ))}
                  </Input>
                  {validation.touched.category && validation.errors.category ? (
                    <FormFeedback type="invalid">
                      {validation.errors.category}
                    </FormFeedback>
                  ) : null}
                </CardBody>
              </Card>
              {/* shortdescriptio */}
              <Card>
                <CardHeader>
                  <h5 className="card-title mb-0">
                    Барааны богино Танилцуулга
                  </h5>
                </CardHeader>
                <CardBody>
                  <p className="text-muted mb-2">
                    Барааны богино танилцуулга нэмэх
                  </p>
                  <Input
                    type="text"
                    className="form-control"
                    id="product-shortDescription-input"
                    placeholder="Барааны тайлбар оруулна уу"
                    name="shortDescription"
                    value={validation.values.shortDescription || ""}
                    onBlur={validation.handleBlur}
                    onChange={validation.handleChange}
                    invalid={
                      validation.errors.shortDescription &&
                      validation.touched.shortDescription
                        ? true
                        : false
                    }
                  />
                </CardBody>
              </Card>
              <div className="text-end mb-3">
                <button type="submit" className="btn btn-success w-sm">
                  Оруулах
                </button>
              </div>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default EcommerceAddProduct;
