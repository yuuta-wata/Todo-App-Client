import React, { FC, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'

import { Context } from '../lib/context'
import {
  TestUserLoginMutation,
  TestUserLoginMutationVariables,
  TestUserLoginDocument
} from '../graphql/generated'

import Portal from '../components/common/Portal'

import { Main, Box, Flex, Heading, Button } from './styles/top'

const TopPage: FC = () => {
  const { height, dispatch, SetTokenAction } = useContext(Context)
  const [
    testLogin,
    { loading: testLoginLoading, error: testLoginError }
  ] = useMutation<TestUserLoginMutation, TestUserLoginMutationVariables>(
    TestUserLoginDocument
  )
  const { push } = useHistory()

  return (
    <Main height={height}>
      <Box mediaFlex={1}>
        <Flex mediaJustifyContent='center'>
          <Heading>TODO APP</Heading>
        </Flex>
      </Box>
      <Box mediaFlex={3}>
        <Flex mediaJustifyContent='flex-start'>
          <Button
            type='button'
            title='ログイン'
            marginBottom={50}
            onClick={() => push('login')}
          />
          <Button
            type='button'
            title='新規登録'
            marginBottom={50}
            onClick={() => push('register')}
          />
          <Button
            type='button'
            title='テストユーザーログイン'
            isLoading={testLoginLoading}
            onClick={async () =>
              await testLogin({
                variables: { email: 'test@test.com', password: 'test' }
              })
                .then(({ data }) => {
                  if (data && data.testUserLogin) {
                    dispatch(SetTokenAction(data.testUserLogin.accessToken))
                    push('home')
                  } else {
                    throw new Error('アクセストークンを取得出来ませんでした。')
                  }
                })
                .catch(() => console.error('testLoginError'))
            }
          />
        </Flex>
      </Box>
      {testLoginError && (
        <Portal
          title='ログイン出来ませんでした'
          discription='サーバーエラーの可能性があります。'
          onPress={() => {
            window.location.reload()
          }}
        />
      )}
    </Main>
  )
}

export default TopPage
