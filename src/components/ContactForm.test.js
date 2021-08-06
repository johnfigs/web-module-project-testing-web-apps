import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';
import { ErrorMessage } from 'react-hook-form';

test('renders without errors', ()=>{
    render(<ContactForm />);
});

test('renders the contact form header', ()=> {
    render(<ContactForm />);
    const header = screen.getByText("Contact Form");
    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    const firstNameInput = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstNameInput, 'John');
    const firstNameInputError = screen.getByText(/firstName must have at least 5 characters./i);
    expect(firstNameInputError).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    const submitButton = screen.getByRole("button");
    expect(submitButton);
    userEvent.click(submitButton);

    const errors = screen.getAllByText(/Error/i);
    expect(errors.length).toBe(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />)
    const firstNameInput = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstNameInput, 'Johnathan');

    const lastNameInput = screen.getByLabelText(/Last Name*/i)
    userEvent.type(lastNameInput, 'Figueroa');

    const submitButton = screen.getByRole("button");
    expect(submitButton);
    userEvent.click(submitButton);

    const errors = screen.getAllByText(/Error/i);
    expect(errors.length).toBe(1);

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />)
    const emailInput = screen.getByLabelText(/Email*/i);
    userEvent.type(emailInput, 'test');
    const emailInputError = screen.getByText(/email must be a valid email address/i);
    expect(emailInputError);
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />)

    const firstNameInput = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstNameInput, 'Johnathan');

    const emailInput = screen.getByLabelText(/Email*/i);
    userEvent.type(emailInput, 'test');

    const submitButton = screen.getByRole("button");
    expect(submitButton);
    userEvent.click(submitButton);

    const lastNameInputError = screen.getByText(/lastName is a required field./i);
    expect(lastNameInputError);

    expect()

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />)

    const firstNameInput = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstNameInput, 'Johnathan');

    const lastNameInput = screen.getByLabelText(/Last Name*/i)
    userEvent.type(lastNameInput, 'Figueroa');

    const emailInput = screen.getByLabelText(/Email*/i);
    userEvent.type(emailInput, 'test@test.com');

    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    const firstNameFeedback = screen.queryByText('Johnathan')
    expect(firstNameFeedback).toBeInTheDocument();
    
    const lastNameFeedback = screen.queryByText('Figueroa')
    expect(lastNameFeedback).toBeInTheDocument();

    const emailFeedback = screen.queryByText('test@test.com')
    expect(emailFeedback).toBeInTheDocument();

    const messageFeedback = screen.queryByText(/Message:/i);
    //console.log(messageFeedback)
    expect(messageFeedback).not.toBeInTheDocument();

});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />)

    const firstNameInput = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstNameInput, 'Johnathan');

    const lastNameInput = screen.getByLabelText(/Last Name*/i)
    userEvent.type(lastNameInput, 'Figueroa');

    const emailInput = screen.getByLabelText(/Email*/i);
    userEvent.type(emailInput, 'test@test.com');

    const messageInput = screen.getByLabelText(/Message/i);
    userEvent.type(messageInput, 'A little message.');

    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    const firstNameDisplay = screen.queryByText('Johnathan');
    expect(firstNameDisplay).toBeVisible();

    const lastNameDisplay = screen.queryByText('Figueroa');
    expect(lastNameDisplay).toBeVisible();

    const emailDisplay = screen.queryByText('test@test.com');
    expect(emailDisplay).toBeVisible();

    const messageDisplay = await screen.findByTestId('messageDisplay');
    expect(messageDisplay).toBeVisible();


});