import React from 'react';
import {
  render,
  act,
  fireEvent,
  waitForDomChange,
  createEvent,
  RenderResult
} from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { BrowserRouter, Route } from 'react-router-dom';
import { Login } from '../../components/Login';

const email = 'todoman@todo.com';
const password = 'tooooooodo';

let component: RenderResult;

beforeAll(() => {
  component = render(
    <MockedProvider>
      <BrowserRouter>
        <Route component={Login} />
      </BrowserRouter>
    </MockedProvider>
  );
});
describe('Login', () => {
  test('input入力', () => {
    const inputEmail = component.getByPlaceholderText('email');
    const inputPassword = component.getByPlaceholderText('password');

    fireEvent.change(inputEmail, { target: { value: email } });
    fireEvent.change(inputPassword, { target: { value: password } });
    // component.debug();
  });
});