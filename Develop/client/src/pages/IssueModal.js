import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import Auth from "../utils/auth";
import { ADD_ISSUE } from "../utils/mutations";
import { GET_PROPERTY } from "../utils/queries";
import {
  BlobServiceClient,
  AnonymousCredential,
  containerClient,
} from "@azure/storage-blob";
import { v4 as uuidv4 } from "uuid";

const IssueModal = ({ open, onClose, onSubmit, propertyId, address }) => {
  const { loading, data } = useQuery(GET_ME);
  const [userData, setUserData] = useState({});

  const [addIssue] = useMutation(ADD_ISSUE, {
    refetchQueries: [{ query: GET_PROPERTY, variables: { address: address } }],
  });
  const [validated, setValidated] = useState(false);
  const [listformData, setListFormData] = useState(() => ({
    propertyId: "",
    description: "",
    title: "",
    issueImage: null,
    userId: data ? data.me.id : "",
  }));

  const [formInvalidWarning, setFormInvalidWarning] = useState(false);
  const [loginErrorWarning, setLoginErrorWarning] = useState(false);

  useEffect(() => {
    if (data) {
      console.log("data:", data.me.id);
      setUserData(data.me);
      setListFormData({ ...listformData, userId: data.me.id });
    }
    if (!data) {
      console.log("No data");
    }
  }, [data]);

  const handleInputChange = (event) => {
    const { name, type, value } = event.target;
    if (type === "file") {
      console.log("File input changed:", event.target.files[0]);
      setListFormData((listformData) => ({
        ...listformData,
        [name]: event.target.files[0],
      }));
    } else {
      setListFormData((listformData) => ({ ...listformData, [name]: value }));
      console.log(listformData);
    }
  };
  async function uploadFile(file) {
    let storageAccountName = "ratearental";
    console.log(process.env.REACT_APP_AZURE_BLOB_SAS_KEY);
    let sasToken =
      "?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2023-06-08T07:49:51Z&st=2023-05-07T23:49:51Z&spr=https&sig=UE6Iu9xTbCmqTkz3%2B7wUsoPIqykT9TV3ALgjiX6r5s0%3D";
    const blobService = new BlobServiceClient(
      `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
    );

    const containerClient = blobService.getContainerClient("myfile");
    await containerClient.createIfNotExists({
      access: "container",
    });

    if (file && file.name) {
      const randomFileName =
        uuidv4() + file.name.substring(file.name.lastIndexOf("."));
      const blobClient = containerClient.getBlockBlobClient(randomFileName);
      const options = { blobHTTPHeaders: { blobContentType: file.type } };
      await blobClient.uploadBrowserData(file, options);
      return blobClient.url;
    } else {
      console.error("No file selected");
      throw new Error("No file selected");
      return null;
    }
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    let fileUrl;
    try {
      if (listformData.issueImage) {
        fileUrl = await uploadFile(listformData.issueImage);
      } else {
        throw new Error("No file selected");
      }
    } catch (error) {
      console.error("Error uploading file:", error.message);
      return;
    }

    let loginErrorWarning = false;
    if (!token) {
      setLoginErrorWarning(true);
      console.log("you need to login");
      loginErrorWarning = true;
    } else {
      setLoginErrorWarning(false);
    }

    if (loginErrorWarning) return;
    let formInvalidWarning = false;

    if (
      listformData.title === "" ||
      listformData.description === "" ||
      listformData.issueImage === ""
    ) {
      setFormInvalidWarning(true);
      console.log("form is invalid");
      formInvalidWarning = true;
    } else {
      setFormInvalidWarning(false);
    }

    if (formInvalidWarning) return;

    try {
      await addIssue({
        variables: {
          title: listformData.title,
          description: listformData.description,
          propertyId: listformData.propertyId,
          issueImage: fileUrl,
          userId: data.me.id,
        },
      });

      console.log("Mutation result:");
    } catch (err) {
      console.error("Error executing mutation:", err.message);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    setListFormData({ ...listformData, propertyId: propertyId });
  }, [propertyId]);

  return (
    open && (
      <div className="overlay" onClick={handleOverlayClick}>
        <div className="modalContainer">
          <div className="close-container" onClick={onClose}>
            <div className="leftright"></div>
            <div className="rightleft"></div>
          </div>

          <div className="top-component">
            <h2 className="modal-header">Submit an Issue</h2>
          </div>
          <div className="content">
            <form
              className="review-form"
              noValidate
              onSubmit={handleFormSubmit}
            >
              <div className="title-wrapper">
                <p className="title-wrapper-header">Title</p>
                <input
                  type="text"
                  placeholder="Title"
                  name="title"
                  onChange={handleInputChange}
                  value={listformData.title}
                  required
                />
                <div className="invalid-feedback"></div>
              </div>
              <div className="description-wrapper">
                <p className="description-wrapper-header">Description</p>
                <textarea
                  rows={5}
                  placeholder="Description"
                  name="description"
                  onChange={handleInputChange}
                  value={listformData.description}
                  required
                ></textarea>
                <div className="invalid-feedback"></div>
              </div>
              <div className="image-wrapper">
                <p className="image-wrapper-header">Image</p>
                <input
                  type="file"
                  id="issueImage"
                  name="issueImage"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="invalid-feedback"></div>

              <div className="review-submit-btn-wrapper">
                <button className="review-submit-btn" type="submit">
                  Submit
                </button>
              </div>
              <div className="invalid-form-error">
                {formInvalidWarning && (
                  <div className="form-invalid-warning">
                    Please fill in all of the required input fields
                  </div>
                )}
              </div>
              <div className="invalid-login-error">
                {loginErrorWarning && (
                  <div className="login-invalid-warning">
                    Please login to add a review
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default IssueModal;
