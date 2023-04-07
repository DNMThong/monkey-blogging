import React from 'react';
import { useDropdown } from './dropdown-context';

const List = ({children,...props}) => {
    const { show } = useDropdown()

    return (
        <>
            {show && (
                <div className="absolute top-full left-0 w-full bg-white shadow-lg z-10">
                    {children}
                </div>
            )}
        </>
    );
};

export default List;