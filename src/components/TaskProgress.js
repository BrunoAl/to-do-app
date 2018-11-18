import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Typography, LinearProgress } from '@material-ui/core'

function getTimeLeftUntilDueTime(dueDate) {
  return (new Date(dueDate) - new Date()) / 1000
}

function getTimeProgress(timeElapsedSinceCreation, totalTimeAssigned) {
  return (timeElapsedSinceCreation * 100) / totalTimeAssigned
}

class TaskProgress extends PureComponent {
  state = {
    dueIn: null,
    timeProgress: null
  }

  componentDidMount() {
    this.dueTimeListener()
  }

  componentWillUnmount() {
    this.clearDueTimeListener()
  }

  clearDueTimeListener = () => clearInterval(this.dueInterval)

  dueTimeListener = () => {
    this.dueInterval = setInterval(() => {
      const taskTotalTimeAssigned = new Date(this.props.item.dueDate) - new Date(this.props.item.createdAt)
      const timeElapsedSinceCreation = new Date() - new Date(this.props.item.createdAt)
      const timeProgress = getTimeProgress(timeElapsedSinceCreation, taskTotalTimeAssigned)

      const countDownSeconds = getTimeLeftUntilDueTime(this.props.item.dueDate)
      const countDownMinutes = (countDownSeconds / 60).toFixed(0)

      countDownMinutes
        ? this.setState({ dueIn: countDownMinutes, timeProgress })
        : this.clearDueTimeListener()
    }, 1000)
  }

  render() {
    const { dueIn, timeProgress } = this.state
    return (
      <>
        <Typography variant="subtitle2" gutterBottom>
          Due In: {Math.abs(dueIn)} minutes {dueIn < 0 ? 'ago' : ''}
        </Typography>
        <div>
          <LinearProgress
            color={timeProgress > 90 || timeProgress < 0  ? 'secondary' : 'primary'}
            variant="determinate"
            value={timeProgress < 100 && timeProgress > 0 ? timeProgress : 100}
          />
        </div>
      </>
    )
  }
}

TaskProgress.propTypes = {
  item: PropTypes.object.isRequired,
}

export default TaskProgress
