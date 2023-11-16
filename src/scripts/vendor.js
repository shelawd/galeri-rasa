import 'regenerator-runtime'
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';


import('lodash.filter')
  .then((module) => module.default)
  .then(filterContacts)
  .catch((error) => alert(error));

  const filterContacts = (filter) => {
  filter(contacts, contactType.value === 'all' ? {} : { type: contactType.value })
    .forEach(renderContact);
};