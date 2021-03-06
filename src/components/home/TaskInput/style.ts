import styled from 'styled-components'

import TaskInputArea from '../TaskInputArea'

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: rgba(255, 255, 255, 1);
  padding: 0 0 10px 0;
  margin: 0 0 20px 0;
`

export const Input = styled(TaskInputArea)`
  width: 80%;
  height: 50px;
`
