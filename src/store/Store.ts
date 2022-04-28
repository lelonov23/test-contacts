import { makeAutoObservable } from "mobx";

export interface Contact {
  id: number | string;
  name: string;
  phone: string;
}

export class StoreImpl {
  contacts: Contact[] = [];
  currentContacts: Contact[] = [];
  filterString: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  initContacts(contacts: Contact[]) {
    this.contacts = contacts;
    this.filterContacts();
  }

  addContact(contact: Contact) {
    this.resetSearch();
    this.contacts = [...this.contacts, contact];
    this.filterContacts();
  }

  removeContact(id: number | string) {
    this.resetSearch();
    this.contacts = this.contacts.filter((contact) => contact.id !== id);
    this.filterContacts();
  }

  changeFilterString(query: string) {
    this.filterString = query;
    this.filterContacts();
  }

  resetSearch() {
    this.filterString = "";
    this.filterContacts();
  }

  filterContacts() {
    this.currentContacts = this.contacts.filter((contact) =>
      contact.name.includes(this.filterString)
    );
  }

  editContact(contact: Contact) {
    this.resetSearch();
    this.contacts = this.contacts.map((cont) => {
      if (contact.id === cont.id) {
        return contact;
      } else return cont;
    });
    this.filterContacts();
  }
}

const Store = new StoreImpl();
export default Store;
