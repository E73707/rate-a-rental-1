import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_AUTHORISE_QUEUE } from "../utils/queries";
import { useMutation } from "@apollo/client";
import { ADD_OWNER } from "../utils/mutations";

import "../styles/todo.css";

export default function Todo() {
  const { loading, data } = useQuery(GET_AUTHORISE_QUEUE);
  const [authoriseData, setAuthoriseData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [addOwner] = useMutation(ADD_OWNER);

  useEffect(() => {
    if (data) {
      setAuthoriseData(data.getAuthoriseQueue);
      console.log(authoriseData);
    }
    if (!data) {
      console.log("No data");
    }
  }, [data]);

  const filteredData = authoriseData.filter(
    (item) =>
      item.fullName.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.userId.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleApprove = async (e) => {
    const userId = e.currentTarget.getAttribute("data-userid");
    const propertyId = e.currentTarget.getAttribute("data-propertyid");
    console.log("User ID:", userId, "Property ID:", propertyId);

    try {
      const { data } = await addOwner({
        variables: {
          userId: userId,
          propertyId: propertyId,
        },
      });

      console.log("Mutation result:", data);
    } catch (err) {
      console.error("Error executing mutation:", err.message);
    }
  };

  return (
    <div className="Todo-list-container">
      <div className="Todo-list-wrapper">
        <div className="Todo-list-header">
          <h3 className="Todo-list-h">Todo List</h3>
          <input
            type="text"
            placeholder="Search by name or user ID"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="Todo-list-search-bar"
          />
          <div className="Todo-list-content">
            {filteredData.map((item) => (
              <div className="Todo-list" key={item.id}>
                <p className="Todo-list-number todo-list-card-title">
                  {item.fullName}
                </p>
                <p className="Todo-list-number">{item.email}</p>
                <p className="Todo-list-number">{item.phone}</p>
                <p className="Todo-list-number"></p>
                <p className="Todo-list-number">
                  Property ID: {item.propertyId}
                </p>
                <p className="Todo-list-number">User ID: {item.userId}</p>
                <p className="Todo-list-number">{item.dateOfSubmission}</p>

                <a href={item.file} target="_blank" rel="noreferrer">
                  <button className="todo-list-card-file-button">File</button>
                </a>

                <div className="todo-list-card-button-wrapper">
                  <button
                    data-userid={item.userId}
                    data-propertyid={item.propertyId}
                    className="todo-list-card-button"
                    onClick={handleApprove}
                  >
                    Approve
                  </button>

                  <button className="todo-list-card-button">Reject</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
