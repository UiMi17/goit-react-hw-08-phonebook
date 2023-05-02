import PropTypes from 'prop-types';
import ContactsListElement from '../Contacts-element/ContactsElement';
import { StyledContactsList } from './StyledContactsList';

const ContactsList = ({ contacts, handleDeleteBtnClick }) => {
  return (
    <StyledContactsList>
      {contacts.map(({ name, phone, id }) => {
        return (
          <ContactsListElement
            key={id}
            name={name}
            number={phone}
            id={id}
            handleDeleteBtnClick={handleDeleteBtnClick}
          />
        );
      })}
    </StyledContactsList>
  );
};

export default ContactsList;

ContactsList.propTypes = {
  contacts: PropTypes.array.isRequired,
  handleDeleteBtnClick: PropTypes.func.isRequired,
};
