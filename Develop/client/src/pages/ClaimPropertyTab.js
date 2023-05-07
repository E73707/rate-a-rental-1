import React, { useState, useEffect } from "react";
import {
  BlobServiceClient,
  AnonymousCredential,
  containerClient,
} from "@azure/storage-blob";
import { v4 as uuidv4 } from "uuid";
import { GET_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { ADD_AUTHORISE_QUEUE } from "../utils/mutations";

const ClaimPropertyTab = ({ propertyData }) => {
  const { loading, data } = useQuery(GET_ME);
  const [addAuthoriseQueue] = useMutation(ADD_AUTHORISE_QUEUE);
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    phone: "",
    file: null,
    propertyId: propertyData.property.id,
    userId: "",
  });
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (data) {
      console.log("data:", data);
      setUserData(data.me);
      setFormValues({ ...formValues, userId: data.me.id });
    }
    if (!data) {
      console.log("No data");
    }
  }, [data]);

  useEffect(() => {
    console.log("formValues updated:", formValues);
  }, [formValues]);

  async function uploadFile(file) {
    let storageAccountName = "ratearental";
    console.log(process.env.REACT_APP_AZURE_BLOB_SAS_KEY);
    let sasToken =
      "?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2023-05-07T19:19:23Z&st=2023-05-07T11:19:23Z&spr=https&sig=4SPWxUftk1oddI%2BETrS4W4kZER9PEt6aFQeP%2BYJoj8g%3D";
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
      console.log(randomFileName);
      const blobClient = containerClient.getBlockBlobClient(randomFileName);
      const options = { blobHTTPHeaders: { blobContentType: file.type } };
      await blobClient.uploadBrowserData(file, options);
      return blobClient.url;
    } else {
      console.error("No file selected");
      return null;
    }
  }

  if (!propertyData) {
    return <div>Loading...</div>;
  }

  const handleChange = (event) => {
    const { name, type, value } = event.target;
    if (type === "file") {
      setFormValues((prev) => ({ ...prev, [name]: event.target.files[0] }));
    } else {
      setFormValues((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formValues);

    let fileUrl;
    if (formValues.file) {
      fileUrl = await uploadFile(formValues.file);
      console.log("File uploaded to:", fileUrl);
    } else {
      console.log("No file selected");
      return;
    }

    try {
      await addAuthoriseQueue({
        variables: {
          fullName: formValues.fullName,
          email: formValues.email,
          phone: formValues.phone,
          file: fileUrl,
          userId: formValues.userId,
          propertyId: formValues.propertyId,
        },
      });
      console.log("Authorise queue added");
    } catch (error) {
      console.error("Error adding authorise queue:", error);
    }
  };

  return (
    <div className="claim-property-container">
      <div className="claim-property-wrapper">
        <h2>Claim Property</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <p className="property-claim-full-name property-claim-label">
              Full Name
            </p>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formValues.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <p className="property-claim-email property-claim-label">Email</p>
            <input
              type="email"
              id="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <p className="property-claim-phone property-claim-label">Phone</p>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formValues.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <p className="property-claim-proof property-claim-label">
              Proof of ownership
            </p>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};
export default ClaimPropertyTab;
