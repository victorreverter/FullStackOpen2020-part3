import React from 'react';

const Persons = ({ personsHandled, deleteHandle }) => {
    const handlePersons = personsHandled.map((item) => {
        const manageDelete = () => deleteHandle(item.id);
        // console.log(deleteHandle(item.id));

        return (
          <h4 key={item.id}>
            {item.name} {item.number}
            <button key={item.id} type="text" onClick={manageDelete}>
              Delete
            </button>
          </h4>
        );
    });

    return (
        <>
          {handlePersons}
        </>
    )
};

export default Persons;