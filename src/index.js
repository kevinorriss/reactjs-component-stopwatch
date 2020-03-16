import React from 'react'
import ReactDOM from 'react-dom'
import Stopwatch from '@kevinorriss/stopwatch'

ReactDOM.render(
    <div className="card" style={{marginTop: '2rem', height: '30rem'}}>
        <div className="card-body">
            <Stopwatch />
        </div>
    </div>,
    document.getElementById('root')
)
