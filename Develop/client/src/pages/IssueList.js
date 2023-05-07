import React, { useEffect, useState } from "react";

const IssueList = (propertyData) => {
  const [propData, setPropData] = useState(null);

  useEffect(() => {
    if (propertyData) {
      setPropData(propertyData.propertyData.property);
    }
  }, [propertyData]);

  return (
    <div>
      <h1>Issue List</h1>
    </div>
  );
};

export default IssueList;
