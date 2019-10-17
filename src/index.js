import React from 'react'
import ReactDOM from 'react-dom'
import Stopwatch from '@kevinorriss/stopwatch'

const style = {
    maxWidth: '35rem',
    margin: '0 auto'
}
ReactDOM.render(<div style={style}><Stopwatch /></div>, document.getElementById('root'))
