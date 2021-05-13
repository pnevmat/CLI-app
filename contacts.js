const fs = require('fs');
const path = require('path');

const contactsPath = '../CLI-app/db/contacts.json';

const onReadFile = (filePath, action, contactId, name, email, phone) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log("ERROR", err.message);
            return
        };

        if (data) {
            const contactsList = JSON.parse(data);
            if (action === 'list') {
                return listContacts(contactsList);
            }

            if (contactId && action === 'get') {
                return getContactById(contactId, contactsList)
            }

            if (contactId && action === 'remove') {
                return removeContact(contactId, contactsList)
            }

            if (action === 'add' && name && email && phone) {
                return addContact(name, email, phone, contactsList)
            }
        };
    });
}

const listContacts = (contactsList) => {
    console.table(contactsList);
};

function getContactById(contactId, data) {
    const contactById = data.find(contact => contact.id === Number(contactId))
    console.log("Found contact", contactById);
};

function removeContact(contactId, data) {
    const contactsList = JSON.stringify(data.filter(contact => contact.id !== Number(contactId)))
    fs.writeFile(contactsPath, contactsList, (err) => {
        if(err) {
            console.log(err.message);
            return
        };
    });
    console.table(JSON.parse(contactsList));
};

function addContact(name, email, phone, data) {
    const id = data[data.length - 1].id + 1
    const contactsList = JSON.stringify([ ...data, {id: id, name: name, email: email, phone: phone}])
    fs.writeFile(contactsPath, contactsList, (err) => {
        if(err) {
            console.log(err.message);
            return
        };
    });
    console.table(JSON.parse(contactsList));
};

const contactsOperations = {onReadFile, contactsPath}

module.exports = contactsOperations;