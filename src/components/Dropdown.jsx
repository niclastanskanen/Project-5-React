import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Options = React.forwardRef(({ onClick }, ref) => (
    <BsThreeDotsVertical
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    />
));

export const Dropdown = ({ handleEdit, handleDelete }) => {
    return (

        <div
            className='flex gap-10 p-2 rounded-lg mx-3 justify-center items-center'
            as={Options}
        >
            <AiOutlineEdit className='cursor-pointer' fontSize={34} onClick={handleEdit}>Edit</AiOutlineEdit>
            <AiOutlineDelete className='cursor-pointer' fontSize={34} onClick={handleDelete}>Delete</AiOutlineDelete>
        </div>
    );
};

export default Dropdown