const fs = require('fs');
const path = require('path');

const contactsPath = '../CLI-app/db/contacts.json';

function listContacts(filePath) {

    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log("ERROR", err.message);
            return
        };

        if (data) {
            const contactsList = JSON.parse(data);
            console.table(contactsList);
        };
    });
};

function getContactById(contactId) {

    fs.readFile(contactsPath, (err, data) => {
        if (err) {
            console.log("ERROR", err.message);
            return
        };

        if (data) {
            const contacts = JSON.parse(data)
            const contactById = contacts.find(contact => contact.id === Number(contactId))
            console.log("Found contact", contactById);
        };
    });
};

function removeContact(contactId) {
    fs.readFile(contactsPath, (err, data) => {
        if (err) {
            console.log("ERROR", err.message);
            return
        };

        if (data) {
            const contacts = JSON.parse(data)
            const contactsList = JSON.stringify(contacts.filter(contact => contact.id !== Number(contactId)))
            fs.writeFile(contactsPath, contactsList, (err) => {
                if(err) {
                    console.log(err.message);
                    return
                };
            });
            console.table(JSON.parse(contactsList));
        };
    });
};

function addContact(name, email, phone) {
    fs.readFile(contactsPath, (err, data) => {
        if (err) {
            console.log("ERROR", err.message);
            return
        };

        if (data) {
            const contacts = JSON.parse(data)
            const contactsList = JSON.stringify([ ...contacts, {id: contacts[contacts.length - 1].id + 1, name: name, email: email, phone: phone}])
            fs.writeFile(contactsPath, contactsList, (err) => {
                if(err) {
                    console.log(err.message);
                    return
                };
            });
            console.table(JSON.parse(contactsList));
        };
    });
};

// listContacts(contactsPath);

// getContactById(1);

// removeContact(2);

// addContact('Vadim', 'pnevmat01@ukr.net', '067-760-64-09');

const contactsOperations = {listContacts, getContactById, removeContact, addContact, contactsPath}

module.exports = contactsOperations;