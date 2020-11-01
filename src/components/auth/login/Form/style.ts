import styled from 'styled-components'

import BaseInput from '../../../common/base/BaseInput'
import ErrorMessage from '../../../common/ErrorMessage'

export const StyledLoginForm = styled.form`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`

export const StyledLoginInput = styled(BaseInput)<{ marginBottom?: number }>`
  width: 100%;
  height: 50px;
  margin-bottom: ${({ marginBottom = 0 }) => `${marginBottom}px`};
`

export const LoginErrorMessage = styled(ErrorMessage)`
  height: 50px;
  font-size: 15px;
  line-height: 50px;
  margin: unset;
`