const { program } = require('commander');

const contacts = require('./contacts');

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const contactsList = await contacts.listContacts();
      console.table(contactsList);
      break;

    case 'get':
      const contact = await contacts.getContactsById(id);
      console.log(contact);
      break;
    case 'remove':
      const removeResult = await contacts.removeContact(id);
      console.log(removeResult);
      break;
    case 'add':
      const createdContact = await contacts.addContact(name, email, phone);
      console.log(createdContact);
      break;
    default:
      break;
  }
};

program
  .option('-a, --action <type>')
  .option('-i, --id <type>')
  .option('-n, --name <type>')
  .option('-e, --email <type>')
  .option('-p, --phone <type>');

program.parse(process.argv);

const options = program.opts();
invokeAction(options);
