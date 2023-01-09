import React, { useState } from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import {
  Card,
  CardBody,
  Col,
  Container,
  CardHeader,
  Row,
  Input,
  Label,
  Form,
} from "reactstrap";

// Redux
import { useDispatch } from "react-redux";


import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
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

const BlogAdd = (props) => {
  document.title = "Алтан заан ХХК || Нийтлэл нэмэх";

  const history = useNavigate();
  const [customActiveTab, setcustomActiveTab] = useState("1");
  const [dest,setDest] = useState("")

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


  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      title: "",
      shortDescription: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Нийтлэлны нэр заавал байх ёстой"),
    }),
    onSubmit: (values) => {
      axios
        .post("https://altanzaan.org/api/v1/blogs", {
          title: values.title,
          shortDescription: values.shortDescription,
          description: dest,
        })
        .then((res) => {
          const newBlog = res.data;
          const data = new FormData()
          const xhr = new XMLHttpRequest()
          if (selectedFiles[0]) {
            data.append("file", selectedFiles[0])
            xhr.open(
              "PUT",
              `https://altanzaan.org/api/v1/blogs/${newBlog._id}/upload-images`,
            )
          }
        
          xhr.send(data)
          xhr.onload = function (e) {
            console.log("Request Status", xhr.status);
          };
          history.push("apps-ecommerce-products");
          validation.resetForm();
        })
        .catch((err) => console.log(err));
    },
  });
  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Нийтлэл үүсгэх" pageTitle="Дэлгүүр" />

        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}
        >
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  {/* title */}
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="product-title-input">
                      Нийтлэл гарчиг
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="product-title-input"
                      placeholder="Нийтлэлны нэр оруулна уу"
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
                    <Label>Нийтлэл дэлгэрэнгүй богино</Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="product-description-input"
                      placeholder="Нийтлэлны тайлбар оруулна уу"
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
                  </div>
                  <div>
                    <Label>Нийтлэл дэлгэрэнгүй</Label>
                    <CKEditor
                      editor={ClassicEditor}
                      data={dest}
                      onChange={(event,editor) => {
                        const data = editor.getData();
                        setDest(`${data}`)
                      }}
                      
                    />
                  </div>
                </CardBody>
              </Card>
              {/* image */}
              <Card>
                <CardHeader>
                  <h5 className="card-title mb-0">Нийтлэл зураг</h5>
                </CardHeader>
                <CardBody>
                  <div>
                    <h5 className="fs-15 mb-1">Нийтлэл зургийн цомог</h5>
                    <p className="text-muted">
                    Нийтлэл зургийн цомог нэмэх (Дээд тал нь 4 зураг!)
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

export default BlogAdd;
