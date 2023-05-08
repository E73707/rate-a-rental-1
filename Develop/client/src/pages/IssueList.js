import React, { useEffect, useState } from "react";

const IssueList = (propertyData) => {
  const [propData, setPropData] = useState(null);
  const [issueList, setIssueList] = useState([]);

  useEffect(() => {
    if (
      propertyData &&
      propertyData.propertyData &&
      propertyData.propertyData.property &&
      propertyData.propertyData.property.issues
    ) {
      setIssueList(propertyData.propertyData.property.issues);
    }
  }, [propertyData]);

  return (
    <div className="issue-list-container">
      <div className="issue-list-header">
        <h2>Issue List</h2>
      </div>
      <div className="issue-list-wrapper">
        {issueList &&
          issueList.map((issue) => (
            <div className="issue-card-wrapper" key={issue.id}>
              <div className="issue-card">
                <p className="issue-title">{issue.title}</p>
                <p className="issue-description">{issue.description}</p>
                <div className="issue-image-wrapper">
                  <img
                    className="issue-image"
                    src={issue.issueImage}
                    alt={issue.title}
                  />
                </div>
                {issue.landlordResponse && (
                  <div>
                    <h3>Landlord Response</h3>
                    <p>{issue.landlordResponse.message}</p>
                    {issue.landlordResponse.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Response image ${index}`}
                        width="100"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default IssueList;
