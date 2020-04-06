import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useDeleteAccountMutation } from '../generated/graphql';
import { loginGqlError } from '../models/loginGqlError';
import { DeleteAccountButton } from '../components/button/DeleteAccountButton';

let errorMessage: loginGqlError;

export const DeleteAccount: React.FC = () => {
  const history = useHistory();
  const [nickName, setNickName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [deleteAccount, { loading, error }] = useDeleteAccountMutation();

  if (error) {
    // GraphQLErrorを取得
    const arry = error.graphQLErrors.map(e => e.message);
    errorMessage = arry[0] as any;
  }

  return (
    <div className="main">
      <div className="delete-account-wrapper">
        <form
          className="delete-account-form"
          onSubmit={async event => {
            event.preventDefault();

            try {
              await deleteAccount({
                variables: {
                  nickName: nickName,
                  email: email,
                  password: password
                }
              });
              history.push('/');
            } catch {}
          }}
        >
          <div className="input-form-inner">
            {error ? (
              <p className="error">{errorMessage.message}</p>
            ) : (
              undefined
            )}
            <input
              className="form-input"
              value={nickName}
              placeholder="ニックネーム"
              onChange={event => {
                setNickName(event.target.value);
              }}
            />
            <input
              className="form-input"
              value={email}
              placeholder="Eメール"
              onChange={event => {
                setEmail(event.target.value);
              }}
            />
            <input
              className="form-input"
              type="password"
              value={password}
              placeholder="パスワード"
              onChange={event => {
                setPassword(event.target.value);
              }}
            />
            <DeleteAccountButton isDeleteAccountLoading={loading} />
          </div>
        </form>
      </div>
    </div>
  );
};
