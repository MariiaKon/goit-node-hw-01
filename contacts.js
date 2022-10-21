const fs = require('fs').promises;
const path = require('path');
const { Guid } = require('js-guid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contactsList = await listContacts();
  const idx = contactsList.findIndex(contact => contact.id === contactId);
  if (idx === -1) {
    return `Contact with id=${contactId} doesn't exist`;
  }
  return contactsList[idx];
}

async function removeContact(contactId) {
  const contactsList = await listContacts();
  const idx = contactsList.findIndex(contact => contact.id === contactId);
  if (idx === -1) {
    return `Contact with id=${contactId} doesn't exist`;
  }
  const [removedContact] = contactsList.splice(idx, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));

  return removedContact;
}

async function addContact(name, email, phone) {
  const contactsList = await listContacts();
  const newContact = { id: Guid.newGuid().StringGuid, name, email, phone };
  contactsList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
