import React from 'react';

const Form = ({nameHandle, numberHandle, clickHandle}) => {
    return (
        <>
            <form>
                <div>
                    name: <input id="nameInput" onChange={nameHandle} />
                </div>
                <div>
                    number: <input id="numberInput" onChange={numberHandle} />
                </div>
                <div>
                    <button onClick={clickHandle} type="submit">
                        add
                    </button>
                </div>
            </form>
        </>
    )
};

export default Form;