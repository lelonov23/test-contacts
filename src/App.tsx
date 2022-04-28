import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.scss";
import LoginPage from "./components/auth/LoginPage";
import ContactsPage from "./components/contacts/ContactsPage";
import Header from "./components/layout/Header";
import Store from "./store/Store";
import Cookies from "js-cookie";

function App() {
  const token = Cookies.get("token");

  useEffect(() => {
    fetch("http://localhost:3000/data")
      .then((res) => res.json())
      .then((data) => {
        Store.initContacts(data);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Navigate to={`${token ? "/contacts" : "/login"}`} />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
      </Routes>
    </div>
  );
}

export default App;
