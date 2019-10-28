import React from 'react'
import { mount } from 'enzyme'
import moment from 'moment'
import renderer from 'react-test-renderer'
import Stopwatch from '../../component/src/Stopwatch'

let wrapper
beforeEach(() => {
    wrapper = mount(<Stopwatch/>)
})

const getElapsedText = () => {
    return wrapper.find('.face__time--elapsed').first().text()
}

const getElapsedMilliseconds = () => {
    return moment(getElapsedText(), 'mm:ss.S').diff(moment().startOf('day'), 'milliseconds')
}

it('should render Stopwatch correctly', () => {
    expect(renderer.create(<Stopwatch/>).toJSON()).toMatchSnapshot()
})

it('should start the timer', (done) => {
    expect(getElapsedText()).toEqual('00:00.0')
    wrapper.find('.controls__button--play').simulate('click')
    setTimeout(() => {
        const milliseconds = getElapsedMilliseconds()
        expect(milliseconds).toBeGreaterThan(0)
        done()
    }, 500)
})

// play / pause
// reset
// lap

/*
tick
handlePlayPause
handleLap
handleReset
*/