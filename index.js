const contacts = require('./contacts');
const { program } = require('commander');

program
  .option('-act, --action <type>')
  .option('-i, --id <type>')
  .option('-n, --name <type>')
  .option('-e, --email <type>')
  .option('-ph, --phone <type>');

program.parse();
const args = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contactList = await contacts.listContacts();
      console.table(contactList);
      break;

    case 'get':
      const contact = await contacts.getContactById(id);
      console.log(contact);
      break;

    case 'add':
      const newContact = await contacts.addContact(name, email, phone);
      console.log(newContact);
      break;

    case 'remove':
      const removedContact = await contacts.removeContact(id);
      console.log(removedContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(args);
