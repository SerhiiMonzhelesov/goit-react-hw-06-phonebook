import Container from './Container/Container';
import ContactForm from './ContactForm/ContactForm';
import Contacts from './Contacts/Contacts';
import Filter from './Filter/Filter';
import { useDispatch, useSelector } from 'react-redux';
import { setContact, setFilter, setRemoveContact } from 'redux/phonebookSlice';

function App() {
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();

  const addContact = contactData => {
    const isAlready = contacts.some(
      contact => contact.name === contactData.name
    );
    isAlready
      ? alert(`${contactData.name} is already in contacts`)
      : dispatch(setContact(contactData));
  };

  const handleChangeFilter = e => {
    dispatch(setFilter(e.target.value));
  };

  const filterContacts = () => {
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase().trim())
    );
    return filteredContacts;
  };

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm contacts={contacts} addContact={addContact} />
      {contacts.length ? (
        <h2>Contacts</h2>
      ) : (
        <p className="message">No contacts in the phonebook</p>
      )}
      {!!contacts.length && <Filter handleChangeFilter={handleChangeFilter} />}
      <Contacts
        contacts={filterContacts()}
        removeContact={contactId => dispatch(setRemoveContact(contactId))}
      />
    </Container>
  );
}

export default App;
