import React, { useState } from "react";
import { observer } from "mobx-react";

import Portal from "./Portal";

import styles from "./Modal.module.scss";
import Store, { Contact } from "../../store/Store";
import { v4 } from "uuid";

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  contact: Contact;
}

const Modal: React.FC<ModalProps> = observer(
  ({ isOpen, handleClose, contact }) => {
    const [nameInput, setNameInput] = useState(contact.name);
    const [phoneInput, setPhoneInput] = useState(contact.phone);
    const [noInput, setNoInput] = useState(false);

    if (!isOpen) return null;

    const editContactHandler = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (nameInput && phoneInput) {
        const newContact: Contact = {
          id: contact.id,
          name: nameInput,
          phone: phoneInput,
        };
        Store.editContact(newContact);
        setNameInput("");
        setPhoneInput("");
        handleClose();
      } else setNoInput(true);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNameInput(e.target.value);
      setNoInput(false);
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPhoneInput(e.target.value);
      setNoInput(false);
    };

    return (
      <Portal wrapperId="modal-container">
        <div onClick={handleClose} className={styles.modal}>
          <div
            onClick={(e) => e.stopPropagation()}
            className={styles["modal-content"]}
          >
            <h2>Edit contact</h2>
            <form
              onSubmit={editContactHandler}
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
              <button className={styles.button}>Save</button>
            </form>
          </div>
        </div>
      </Portal>
    );
  }
);

export default Modal;
