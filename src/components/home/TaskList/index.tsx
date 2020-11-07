import React, { FC } from 'react'

import TaskItem from '../TaskItem'
import DoneButton from '../DoneButton'
import Loading from '../../common/Loading'

import { Container, Box, Absolute } from './style'
import { Props } from './type'

const TaskList: FC<Props> = ({
  tasks,
  disabled,
  isLoading,
  deleteId,
  onClick
}) => (
  <>
    {isLoading && (
      <Box width='90%' marginBottom='20px'>
        <Loading
          width='50px'
          height='50px'
          circleColor='rgba(45, 97, 135, 1)'
        />
      </Box>
    )}
    {tasks
      .sort((tasksA, tasksB) => (tasksA.id < tasksB.id ? 1 : -1))
      .map(({ id, task }, index) => (
        <Container
          style={{
            marginBottom: index === tasks.length - 1 ? 0 : 20,
            opacity: deleteId === id ? 0.5 : 1
          }}
          key={id}
        >
          {deleteId === id && (
            <Absolute>
              <Loading
                width='50px'
                height='50px'
                circleColor='rgba(45, 97, 135, 1)'
              />
            </Absolute>
          )}
          <Box width='90%' tabletWidth='80%' mobileWidth='70%'>
            <TaskItem task={task} />
          </Box>
          <Box width='10%' tabletWidth='15%' mobileWidth='25%'>
            <DoneButton
              title='完了'
              disabled={disabled}
              onClick={() => onClick(id)}
            />
          </Box>
        </Container>
      ))}
  </>
)

export default TaskList
