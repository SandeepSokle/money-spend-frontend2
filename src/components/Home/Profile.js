import React from "react";
import { useSelector } from "react-redux";
import Header from "./Header";

const ProfilePage = () => {
  const userData = useSelector((state) => {
    return state.user;
  });

  return (
    <>
      <Header page={"profile"} />
      <div style={styles.container}>
        <div style={styles.profileCard}>
          <div style={styles.profileHeader}>
            <h2>Profile Information</h2>
          </div>
          <div style={styles.profileDetails}>
            <p>
              <strong>Name:</strong> {userData.name}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              <strong>Phone:</strong> {userData.phone}
            </p>
            <p style={styles.address}>
              <strong>Address:</strong> {userData.address}
            </p>
            <p>
              <strong>Total Spends:</strong> 120000
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
    background: "#f0f0f0",
  },
  profileCard: {
    background: "#fff",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    minWidth: "30vw",
    maxWidth: "50vw",
    minHeight: "50vh",
    maxHeight: "80vh",
  },
  profileHeader: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  profileDetails: {
    lineHeight: "1.6",
  },
  address: {
    maxWidth: "34vw",
  },
};

export default ProfilePage;
