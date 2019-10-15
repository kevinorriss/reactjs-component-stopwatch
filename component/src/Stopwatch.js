import React, { Fragment } from 'react'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import Moment from 'react-moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStopwatch, faUndo, faPlay, faPause } from '@fortawesome/free-solid-svg-icons'
import 'react-circular-progressbar/dist/styles.css'

class Stopwatch extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            counting: false,
            started: 0,
            elapsed: 0,
            lapStarted: 0,
            lapElapsed: 0,
            laps: [],
            timer: null
        }
    }

    tick() {
        console.log('tick()')
        // const now = new Date().getTime()
        //     // calculate the elapsed time since starting
        //     setState(s => ({
        //         ...s,
        //         elapsed: now - s.started,
        //         lapElapsed: now - s.lapStarted
        //     }))
    }

    handlePlayPause() {
        console.log('handlePlayPause()')
        //     // start/resume the timer (adjusting the start time to account for the pause)
        //     if (!counting) {
        //         const now = new Date().getTime()
        //         setState(s => ({
        //             ...s,
        //             counting: true,
        //             started: now - s.elapsed,
        //             lapStarted: now - s.lapElapsed,
        //             timer: setInterval(tick, 10)
        //         }))
        //     // stop timer
        //     } else {
        //         setState(s => ({
        //             ...s,
        //             counting: false,
        //             timer: clearInterval(s.timer)
        //         }))
        //     }
    }

    handleLap() {
        console.log('handleLap()')
        //     setState(s => ({
        //         ...s,
        //         lapStarted: new Date().getTime(),
        //         lapElapsed: 0,
        //         laps: [{
        //             elapsed: s.lapElapsed,
        //             created: s.elapsed
        //         }, ...s.laps]
        //     }))
    }

    handleReset() {
        console.log('handleReset')
        //     setState(s => ({
        //         ...initialState,
        //         timer: clearInterval(s.timer)
        //     }))
    }

    render() {
        return (
            <Fragment>
            <div className="pl-5 pr-5">
                <CircularProgressbarWithChildren value={this.state.elapsed % 60000} maxValue={60000} className="d-felx align-items-center" styles={{path:{transition: 'none'}}}>
                    <h3 className="mt-4"><Moment format="mm:ss.SS">{this.state.elapsed}</Moment></h3>
                    <p className="mb-0"><Moment format="mm:ss.SS">{this.state.lapElapsed}</Moment></p>
                </CircularProgressbarWithChildren>
            </div>
            <div className="stopwatch-laps flex-grow-1">
                {this.state.laps.map((lap, index) => (
                    <div key={index}>
                        <div className="d-flex">
                            <div className="col-6 d-flex flex-column ml-1">
                                <div className="font-weight-bold" style={{ lineHeight: '1rem'}}>Lap {this.state.laps.length - index}</div>
                                <div style={{ lineHeight: '1rem'}}><small>Elapsed <Moment format="mm:ss.SS">{lap.elapsed}</Moment></small></div>
                            </div>
                            <div className="col-6 d-flex flex-row-reverse align-items-center mr-1">
                                <h4 className="font-weight-bold mb-0"><Moment format="mm:ss.SS">{lap.created}</Moment></h4>
                            </div>
                        </div>
                        <hr className="mt-1 mb-1"/>
                    </div>
                ))}
            </div>
            <div className="d-flex justify-content-around ml-5 mr-5">
                <button className="btn" onClick={this.handleReset}>
                    <FontAwesomeIcon icon={faUndo}/>
                </button>
                <button className="btn btn-light border shadow-sm" onClick={this.handlePlayPause}>
                    <FontAwesomeIcon icon={this.state.counting ? faPause : faPlay} />
                </button>
                <button className="btn" onClick={this.onLap} disabled={!this.state.counting}>
                    <FontAwesomeIcon icon={faStopwatch} />
                </button>
            </div>
        </Fragment>
        )
    }
}

export default Stopwatch