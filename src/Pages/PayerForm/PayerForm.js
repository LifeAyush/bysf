import React, { useState } from "react";
import "./payerform.css";

const PayerForm = () => {
  const [name, setName] = useState("");
  const [contactInfo, setContactInfo] = useState({
    personName: "",
    email: "",
    phone: "",
  });
  const [physicalAddress, setPhysicalAddress] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [taxID, setTaxID] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [payerPlansSupported, setPayerPlansSupported] = useState([]);
  const [documents, setDocuments] = useState({
    license: null,
    insurance: null,
    businessCertification: null,
  });
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
  });
  const handleContactInfoChange = (e) => {
    const { name, value } = e.target;
    setContactInfo((prevContactInfo) => ({
      ...prevContactInfo,
      [name]: value,
    }));
  };
  const handlePhysicalAddressChange = (e) => {
    setPhysicalAddress(e.target.value);
  };

  const handleBillingAddressChange = (e) => {
    setBillingAddress(e.target.value);
  };
  const handleSpecialtyChange = (e) => {
    setSpecialty(e.target.value);
  };
  const handlePayerPlansSupportedChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setPayerPlansSupported(selectedOptions);
  };
  const handleDocumentUpload = (e) => {
    const file = e.target.files[0];
    setDocuments((prevDocuments) => ({
      ...prevDocuments,
      license: file,
    }));
  };
  const handleUserCredentialsChange = (e) => {
    const { name, value } = e.target;
    setUserCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData for file uploads
    const formData = new FormData();

    // Append textual data to FormData
    formData.append("name", name);
    // formData.append("contactInfo", JSON.stringify(contactInfo));
    formData.append("physicalAddress", physicalAddress);
    formData.append("billingAddress", billingAddress);
    // formData.append("address", JSON.stringify(address));
    // formData.append("taxID", taxID);
    formData.append("specialty", specialty);
    // formData.append("payerPlansSupported", JSON.stringify(payerPlansSupported));
    // formData.append("userCredentials", JSON.stringify(userCredentials));

    // Append files to FormData
    if (documents.license) formData.append("license", documents.license);
    if (documents.insurance) formData.append("insurance", documents.insurance);
    if (documents.businessCertification)
      formData.append("businessCertification", documents.businessCertification);

    // console.log(formData);
    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
    // Send the request
    try {
      const response = await fetch("YOUR_API_ENDPOINT", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };

  return (
    <div className="form-flex">
      <div className="form-title">Please fill out the following details</div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-input-flex">
          <div className="form-label">Email</div>
          <input
            type="email"
            name="email"
            value={contactInfo.email}
            placeholder="Enter email"
            className="form-input"
            onChange={handleContactInfoChange}
          />
        </div>
        <div className="form-input-flex">
          <div className="form-label">Phone</div>
          <input
            type="tel"
            name="phone"
            value={contactInfo.phone}
            placeholder="Enter phone number"
            className="form-input"
            onChange={handleContactInfoChange}
          />
        </div>
        // Physical Address
        <div className="form-input-flex">
          <div className="form-label">Physical Street</div>
          <input
            type="text"
            name="physical.street"
            value={physicalAddress}
            placeholder="Enter physical street"
            className="form-input"
            onChange={handlePhysicalAddressChange}
          />
        </div>
        // Add similar fields for city, state, and zip // Billing Address
        <div className="form-input-flex">
          <div className="form-label">Billing Street</div>
          <input
            type="text"
            name="billing.street"
            value={billingAddress}
            placeholder="Enter billing street"
            className="form-input"
            onChange={handleBillingAddressChange}
          />
        </div>
        // Add similar fields for city, state, and zip
        <div className="form-input-flex">
          <div className="form-label">Specialty</div>
          <select
            name="specialty"
            value={specialty}
            className="form-input"
            onChange={handleSpecialtyChange}
          >
            <option value="">Select Specialty</option>
            {/* Add options for specialties */}
          </select>
        </div>
        {/* <div className="form-input-flex">
          <div className="form-label">Payer Plans Supported</div>
          <select
            name="payerPlansSupported"
            multiple
            value={payerPlansSupported}
            className="form-input"
            onChange={handlePayerPlansSupportedChange}
          >
            {/* Add options for payer plans *
          </select>
        </div> */}
        <div className="form-input-flex">
          <div className="form-label">Proof of License</div>
          <input
            type="file"
            name="license"
            className="form-input"
            onChange={handleDocumentUpload}
          />
        </div>
        <div className="form-input-flex">
          <div className="form-label">Proof of Insurance</div>
          <input
            type="file"
            name="insurance"
            className="form-input"
            onChange={handleDocumentUpload}
          />
        </div>
        <div className="form-input-flex">
          <div className="form-label">Business Certification</div>
          <input
            type="file"
            name="businessCertification"
            className="form-input"
            onChange={handleDocumentUpload}
          />
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PayerForm;
