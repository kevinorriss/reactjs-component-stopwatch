import React from 'react'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import Moment from 'react-moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStopwatch, faUndo, faPlay, faPause } from '@fortawesome/free-solid-svg-icons'
import 'react-circular-progressbar/dist/styles.css'
import './styles.css'

class Stopwatch extends React.Component {
    constructor(props) {
        super(props)

        this.initialState = {
            counting: false,
            started: 0,
            elapsed: 0,
            lapStarted: 0,
            lapElapsed: 0,
            laps: [],
            timer: null
        }
        this.state = { ...this.initialState }

        this.tick = this.tick.bind(this)
        this.handlePlayPause = this.handlePlayPause.bind(this)
        this.handleLap = this.handleLap.bind(this)
        this.handleReset = this.handleReset.bind(this)
    }

    tick() {
        // calculate the elapsed time since starting
        const now = new Date().getTime()
        this.setState(prevState => ({
            ...prevState,
            elapsed: now - prevState.started,
            lapElapsed: now - prevState.lapStarted
        }))
    }

    handlePlayPause() {
        // start/resume the timer (adjusting the start time to account for the pause)
        if (!this.state.counting) {
            const now = new Date().getTime()
            this.setState(prevState => ({
                ...prevState,
                counting: true,
                started: now - prevState.elapsed,
                lapStarted: now - prevState.lapElapsed,
                timer: setInterval(this.tick, 10)
            }))
        // stop timer
        } else {
            this.setState(prevState => ({
                ...prevState,
                counting: false,
                timer: clearInterval(prevState.timer)
            }))
        }
    }

    handleLap() {
        this.setState(prevState => ({
            ...prevState,
            lapStarted: new Date().getTime(),
            lapElapsed: 0,
            laps: [{
                elapsed: prevState.lapElapsed,
                created: prevState.elapsed
            }, ...prevState.laps]
        }))
    }

    handleReset() {
        this.setState(prevState => ({
            ...this.initialState,
            timer: clearInterval(prevState.timer)
        }))
    }

    render() {
        return (
            <div className="stopwatch">
                <div className="stopwatch__face">
                    <CircularProgressbarWithChildren
                        value={this.state.elapsed % 60000}
                        maxValue={60000}
                        styles={{path:{transition: 'none'}}}
                    >
                        <Moment className="face__time--elapsed" format="mm:ss.S">{this.state.elapsed}</Moment>
                        <Moment className="face__time--lap-elapsed" format="mm:ss.S">{this.state.lapElapsed}</Moment>
                    </CircularProgressbarWithChildren>
                </div>
                <div className="stopwatch__laps">
                    {this.state.laps.map((lap, index) => (
                        <div key={index} className="laps__entry">
                            <div className="entry__elapsed">
                                <h4>Lap {this.state.laps.length - index}</h4>
                                <small><Moment format="mm:ss.S">{lap.elapsed}</Moment></small>
                            </div>
                            <div className="entry__created"><Moment format="mm:ss.S">{lap.created}</Moment></div>
                        </div>
                    ))}
                </div>
                <div className="stopwatch__controls">
                    <button className="controls__button controls__button--reset" onClick={this.handleReset}>
                        <FontAwesomeIcon icon={faUndo}/>
                    </button>
                    <button className="controls__button controls__button--play" onClick={this.handlePlayPause}>
                        <FontAwesomeIcon icon={this.state.counting ? faPause : faPlay} />
                    </button>
                    <button className="controls__button controls__button--lap" onClick={this.handleLap} disabled={!this.state.counting}>
                        <FontAwesomeIcon icon={faStopwatch} />
                    </button>
                </div>
            </div>
        )
    }
}

export default Stopwatch