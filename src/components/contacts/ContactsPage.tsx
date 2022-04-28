import Cookies from "js-cookie";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Store, { Contact } from "../../store/Store";
import ContactItem from "./ContactItem";
import { v4 } from "uuid";

import styles from "./ContactsPage.module.scss";

const ContactsPage = observer(() => {
  const [nameInput, setNameInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [noInput, setNoInput] = useState(false);
  const [query, setQuery] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value);
    setNoInput(false);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneInput(e.target.value);
    setNoInput(false);
  };

  const addContactHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nameInput && phoneInput) {
      const newContact: Contact = {
        id: v4(),
        name: nameInput,
        phone: phoneInput,
      };
      Store.addContact(newContact);
      setNameInput("");
      setPhoneInput("");
    } else setNoInput(true);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    Store.changeFilterString(e.target.value);
  };

  const contacts = Store.currentContacts;
  const token = Cookies.get("token");
  return (
    <section>
      <div className={styles.container}>
        {!token && (
          <h1>
            Please <Link to="/login">Log In</Link> to view this page
          </h1>
        )}
        {token && (
          <div>
            <div className={styles.controls}>
              <form
                onSubmit={addContactHandler}
                className={styles.addContactForm}
              >
                <div className={styles.fieldContainer}>
                  <label>
                    <p>Name</p>
                    <input
                      type="text"
                      onChange={handleNameChange}
                      value={nameInput}
                      className={styles.input}
                    />
                  </label>
                  <label>
                    <p>Phone</p>
                    <input
                      type="text"
                      onChange={handlePhoneChange}
                      value={phoneInput}
                      className={styles.input}
                    />
                  </label>
                </div>
                <div>
                  {noInput && (
                    <span className={styles.error}>
                      Please fill out both fields
                    </span>
                  )}
                </div>
                <button className={styles.button}>Add</button>
              </form>
              <label>
                <p>Search</p>
                <input
                  type="text"
                  onChange={handleSearch}
                  value={query}
                  className={styles.input}
                />
              </label>
            </div>
            <ul className={styles.list}>
              {contacts.map((contact) => {
                return <ContactItem key={contact.id} contact={contact} />;
              })}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
});

export default ContactsPage;
