console.clear();
const fs = require('fs/promises');
const path = require('path');
const ObjectID = require('bson-objectid');

const contactsPath = path.join(__dirname, './db/contacts.json');

async function updateContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

async function listContacts() {
  const response = await fs.readFile(contactsPath);
  return JSON.parse(response);
}

async function getContactsById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  if (!result) {
    return null;
  }
  return result;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(idx, 1);
  await updateContacts(contacts);
  return removedContact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: ObjectID(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}

module.exports = {
  listContacts,
  getContactsById,
  removeContact,
  addContact,
};
