import React from 'react';
import PropTypes from 'prop-types';

import s from './ContactList.module.css';

export default function ContactList({ contacts, deleteContact }) {
  return (
    <ul className={s.list}>
      {contacts.map(contact => (
        <li className={s.item} key={contact.id}>
          {contact.name} {contact.number}
          <button type="button" onClick={() => deleteContact(contact.id)}>
            Delete user
          </button>
        </li>
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  deleteContact: PropTypes.func.isRequired,
};
