import React from 'react';
import {render, fireEvent} from "@testing-library/react";
import ModalFind from "../modals/ModalFind";

test('calls onSubmit with userName', () =>{
    const handleFind = jest.fn();
    const {getByLabelText} = render(<ModalFind onClick={handleFind} />);
    fireEvent.click(getByLabelText(/userName/i), {target: {userName: 'octocat'}});
    expect(handleFind).toHaveBeenCalledWith({
        userName: 'octocat',
    });
   expect(handleFind).toHaveBeenCalledTimes(1);
});
