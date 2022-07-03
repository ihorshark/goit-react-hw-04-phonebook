import React from 'react';
import PropTypes from 'prop-types';

import s from './ContactList.module.css';

export default function ContactList({ contacts, deleteContact }) {
  return (
    <ul className={s.list}>
      {contacts &&
        contacts.map(contact => {
          return (
            <li className={s.item} key={contact.id}>
              {contact.name} {contact.number}
              <button type="button" onClick={() => deleteContact(contact.id)}>
                Delete user
              </button>
            </li>
          );
        })}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.array,
  deleteContact: PropTypes.func,
};
