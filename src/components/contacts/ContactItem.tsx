import { observer } from "mobx-react";
import React, { FC, useState } from "react";
import Store, { Contact } from "../../store/Store";
import Modal from "../layout/Modal";

import styles from "./ContactItem.module.scss";

interface ContactItemProps {
  contact: Contact;
}

const ContactItem: FC<ContactItemProps> = observer(({ contact }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleRemove = () => {
    Store.removeContact(contact.id);
  };

  return (
    <li key={contact.id} className={styles.contact}>
      <div>
        <h2>{contact.name}</h2>
        <p>{contact.phone}</p>
      </div>
      <div>
        <button onClick={() => setIsOpen(true)} className={styles.buttonEdit}>
          Edit
        </button>
        <button onClick={handleRemove} className={styles.buttonDelete}>
          Delete
        </button>
      </div>
      <Modal
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
        contact={contact}
      />
    </li>
  );
});

export default ContactItem;
