import React from "react";

const SalesInfo = ({ name, Email, address, company, tel, fax }) => {
  return (
    <>
      <div className="companyInfo">
        <p>
          <strong>Company:</strong> {company}
        </p>
        <p>
          <strong>Address:</strong> {address}
        </p>
        <p>
          <strong>TEL:</strong>
          {tel}
        </p>
        <p>
          <strong>FAX:</strong>
          {fax}
        </p>
        <p>
          <strong>E-Mail:</strong>
          {Email}
        </p>
        <p>
          <strong>Sales Rep.:</strong>
          {name}
        </p>
      </div>
    </>
  );
};

export default SalesInfo;
