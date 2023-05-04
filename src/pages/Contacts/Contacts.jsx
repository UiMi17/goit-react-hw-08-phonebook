import ContactsListElement from '../../components/Contacts-element/ContactsListElement';
import { StyledContactsList } from './StyledContacts';
import { StyledTitle } from 'components/StyledTitle';
import ContactsForm from 'components/Contacts-form/ContactsForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectContacts,
  selectFilter,
  selectIsLoading,
} from 'redux/contactsSelectors';
import { useEffect } from 'react';
import {
  addContactThunk,
  deleteContactThunk,
  fetchContactsThunk,
} from 'redux/operations';
import { nanoid } from 'nanoid';
import { setFilter } from 'redux/contactsSlice';
import Filter from 'components/Filter/Filter';
import { TailSpin } from 'react-loader-spinner';

const Contacts = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const loading = useSelector(selectIsLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContactsThunk());
  }, [dispatch]);

  const createContact = ev => {
    const { name, number } = ev.target.elements;
    const USERNAME = name.value;
    const USER_NUMBER = number.value;

    const CONTACTS_NAMES = contacts.map(contact => {
      return contact.name;
    });

    if (!CONTACTS_NAMES.includes(USERNAME)) {
      dispatch(
        addContactThunk({ name: USERNAME, number: USER_NUMBER, id: nanoid() })
      );
    } else {
      alert(`${USERNAME} is already in contacts.`);
    }
  };

  const handleFormSubmit = ev => {
    ev.preventDefault();
    createContact(ev);
    ev.currentTarget.reset();
  };

  const handleSearchInputChange = ev => {
    dispatch(setFilter(ev.target.value));
  };

  const handleDeleteBtnClick = id => {
    dispatch(deleteContactThunk(id));
  };

  const filteredContacts = contacts.filter(contact => {
    return contact.name.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <>
      <StyledTitle>Phonebook</StyledTitle>
      <ContactsForm handleFormSubmit={handleFormSubmit} />
      <StyledTitle>Contacts</StyledTitle>
      <Filter handleSearchInputChange={handleSearchInputChange} />
      {loading ? (
        <div className='flex content-center'>
          <TailSpin
            height="80"
            width="80"
            color="#cb2657"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <StyledContactsList>
          {filteredContacts.map(({ name, number, id }) => {
            return (
              <ContactsListElement
                key={id}
                name={name}
                number={number}
                id={id}
                handleDeleteBtnClick={handleDeleteBtnClick}
              />
            );
          })}
        </StyledContactsList>
      )}
    </>
  );
};

export default Contacts;
