import React from 'react';

const Filter = ({filterHandle}) => {
    return (
        <>
            <form>
                <div>
                    Filter shown with: <input id="filterInput" onChange={filterHandle} />
                </div>
            </form>
        </>
    )
};

export default Filter;