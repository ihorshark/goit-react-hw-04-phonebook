import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';

import Form from './Form';
import Filter from './Filter';
import ContactList from './ContactList';

// const initialContacts = [
//   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
// ];

export default function App() {
  const [contacts, setContacts] = useState(() => {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    return parsedContacts ? parsedContacts : [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  function formSumbitHandler(name, number) {
    const addingExistingName = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (addingExistingName) {
      alert(`${name} is already in contacts`);
      return;
    }

    setContacts(state => {
      return [...state, { name: name, number: number, id: nanoid() }];
    });
  }

  function handleFilterChange(evt) {
    setFilter(evt.target.value);
  }

  function getVisibleContacts() {
    if (filter === '') {
      return contacts;
    }
    const normalizedFilterText = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilterText)
    );
  }

  function deleteContact(id) {
    setContacts(() => {
      return contacts.filter(contact => contact.id !== id);
    });
  }

  const filteredContacts = getVisibleContacts();

  return (
    <div>
      <h1>Phonebook</h1>
      <Form submitHandler={formSumbitHandler} />
      <h1>Contacts</h1>
      <Filter value={filter} onChange={handleFilterChange} />
      <ContactList contacts={filteredContacts} deleteContact={deleteContact} />
    </div>
  );
}
