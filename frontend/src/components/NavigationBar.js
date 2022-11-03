import React, { useState } from "react";
import "firebase/storage";
import { Navbar, Nav, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

export default function NavigationBar() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }
  return (
    <>
      <Navbar style={{ backgroundColor: "#160469" }}>
        <Navbar.Brand href="#" style={{ color: "#9d96ff" }}>
          Reschedule TimeTable
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/" style={{ color: "#ffffff" }}>
            Home
          </Nav.Link>

          {currentUser && (
            <>
              <Nav.Link href="/dashboard" style={{ color: "#ffffff" }}>
                Dashboard
              </Nav.Link>
            </>
          )}
        </Nav>
        <Nav className="ml-auto">
          {currentUser ? (
            <>
              <Nav.Link href="/update-profile" style={{ color: "#ffffff" }}>
                Update Profile
              </Nav.Link>
              <Nav.Link
                href="#"
                onClick={handleLogout}
                style={{ color: "#ffffff" }}
              >
                Logout
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link href="/login" style={{ color: "#ffffff" }}>
                Login
              </Nav.Link>
              <Nav.Link href="/register" style={{ color: "#ffffff" }}>
                Register
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar>

      {error && <Alert variant="danger">{error}</Alert>}
    </>
  );
}
