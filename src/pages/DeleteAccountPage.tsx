import React, { FC, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'

import {
  DeleteAccountMutation,
  DeleteAccountMutationVariables,
  DeleteAccountDocument
} from '../graphql/generated'
import { Context } from '../lib/context'

import Portal from '../components/common/Portal'
import DeleteForm from '../components/auth/delete/Form'

import { Main, Heading, Box, BackButton } from './styles/deleteAccount'

const DeleteAccountPage: FC = () => {
  const { dispatch, SetTokenAction } = useContext(Context)
  const [completed, setCompleted] = useState<boolean>(false)
  const [nickname, setNickname] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { push, replace } = useHistory()

  const [
    deleteAccount,
    { loading: deleteAccountLoading, error: deleteAccountError }
  ] = useMutation<DeleteAccountMutation, DeleteAccountMutationVariables>(
    DeleteAccountDocument
  )

  return (
    <Main>
      <Box flex={0.5} alignItems='center'>
        <BackButton type='button' title='もどる' onClick={() => push('home')} />
      </Box>
      <Box flex={1}>
        <Heading>アカウントを削除するには必要事項を入力してください。</Heading>
      </Box>
      <Box flex={3}>
        <DeleteForm
          inputNickname={nickname}
          inputEmail={email}
          inputPassword={password}
          isLoading={deleteAccountLoading}
          disabled={completed}
          onNicknameChange={event => setNickname(event.target.value)}
          onEmailChange={event => setEmail(event.target.value)}
          onPasswordChange={event => setPassword(event.target.value)}
          onSubmit={async event => {
            event.preventDefault()

            await deleteAccount({
              variables: { nickname, email, password }
            })
              .then(() => {
                setNickname('')
                setEmail('')
                setPassword('')
                setCompleted(true)
              })
              .catch(() => console.error('Account Delete Error'))
          }}
          errors={deleteAccountError?.graphQLErrors[0].message as any}
        />
      </Box>
      {completed && (
        <Portal
          title='アカウントを削除しました'
          discription='ご利用ありがとうございました。'
          onPress={() => {
            dispatch(SetTokenAction(''))
            replace('/')
          }}
        />
      )}
    </Main>
  )
}

export default DeleteAccountPage
