const {Command} = require('commander');

const {onReadFile, contactsPath} = require('./contacts.js');

const program = new Command();

program
    .option('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'user id')
    .option('-n, --name <type>', 'user name')
    .option('-e, --email <type>', 'user email')
    .option('-p, --phone <type>', 'user phone')
program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
      case 'list':
        onReadFile(contactsPath, action);
        break;
  
      case 'get':
        onReadFile(contactsPath, action, id);
        break;
  
      case 'add':
        onReadFile(contactsPath, action, null, name, email, phone);
        break;
  
      case 'remove':
        onReadFile(contactsPath, action, id);
        break;
  
      default:
        console.warn('\x1B[31m Unknown action type!');
    };
};

invokeAction(argv);