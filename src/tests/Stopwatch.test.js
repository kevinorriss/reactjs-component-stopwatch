import React from 'react'
import { mount } from 'enzyme'
import moment from 'moment'
import renderer from 'react-test-renderer'
import Stopwatch from '../../component/src/Stopwatch'

let wrapper
beforeEach(() => {
    wrapper = mount(<Stopwatch/>)
})

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

const elapsedToMilliseconds = (elapsedText) => {
    return moment(elapsedText, 'mm:ss.S').diff(moment().startOf('day'), 'milliseconds')
}

const getElapsedText = () => {
    return wrapper.find('.face__time--elapsed').first().text()
}

const getLapElapsedText = () => {
    return wrapper.find('.face__time--lap-elapsed').first().text()
}

const getElapsedMilliseconds = () => {
    return elapsedToMilliseconds(getElapsedText())
}

const getLapElapsedMilliseconds = () => {
    return elapsedToMilliseconds(getLapElapsedText())
}

const clickPlayPause = () => {
    wrapper.find('.controls__button--play').simulate('click')
}

const clickLap = () => {
    wrapper.find('.controls__button--lap').simulate('click')
}

const clickReset = () => {
    wrapper.find('.controls__button--reset').simulate('click')
}

it('should render Stopwatch correctly', () => {
    expect(renderer.create(<Stopwatch/>).toJSON()).toMatchSnapshot()
})

it('should start the timer', async () => {
    // expect a zero start
    expect(getElapsedMilliseconds()).toEqual(0)
    expect(getLapElapsedMilliseconds()).toEqual(0)

    // press play
    clickPlayPause()

    // wait half a second
    await sleep(500)

    // get the elapsed time
    const elapsed = getElapsedMilliseconds()

    // expect a non-zero elapsed time
    expect(elapsed).toBeGreaterThan(0)
    expect(getLapElapsedMilliseconds()).toEqual(elapsed)
})

it('should enable lap button on play', async () => {
    // expect the lap button to be disabled
    expect(wrapper.find('.controls__button--lap').first().prop('disabled')).toBeTruthy()
    
    // press play
    clickPlayPause()

    // wait half a second
    await sleep(500)

    // expect the lap button to be disabled
    expect(wrapper.find('.controls__button--lap').first().prop('disabled')).toBeFalsy()
})

it('should disable lap button on pause', async () => {
    // press play
    clickPlayPause()

    // wait half a second
    await sleep(500)

    // press play
    clickPlayPause()

    // wait half a second
    await sleep(500)

    // expect the lap button to be disabled
    expect(wrapper.find('.controls__button--lap').first().prop('disabled')).toBeTruthy()
})

it('should stop the timer', async () => {
    // expect a zero start
    expect(getElapsedMilliseconds()).toEqual(0)
    expect(getLapElapsedMilliseconds()).toEqual(0)

    // press play
    clickPlayPause()

    // wait half a second
    await sleep(500)

    // press pause
    clickPlayPause()

    // get the current elapsed time
    const milliseconds = getElapsedMilliseconds()
    const lapMilliseconds = getLapElapsedMilliseconds()

    // wait another half a second
    await sleep(500)

    // elapsed time should have stayed the same
    expect(getElapsedMilliseconds()).toEqual(milliseconds)
    expect(getLapElapsedMilliseconds()).toEqual(lapMilliseconds)
})

it('should resume the timer', async () => {
    // expect a zero start
    expect(getElapsedMilliseconds()).toEqual(0)
    expect(getLapElapsedMilliseconds()).toEqual(0)

    // play
    clickPlayPause()
    await sleep(500)

    // pause
    clickPlayPause()
    await sleep(500)

    // get the elapsed time
    const milliseconds = getElapsedMilliseconds()
    const lapMilliseconds = getLapElapsedMilliseconds()

    // play
    clickPlayPause()
    await sleep(500)

    // elapsed time should have increased
    expect(getElapsedMilliseconds()).toBeGreaterThan(milliseconds)
    expect(getLapElapsedMilliseconds()).toBeGreaterThan(lapMilliseconds)
})

it('should add laps', async () => {
    // expect a zero start
    expect(getElapsedMilliseconds()).toEqual(0)
    expect(getLapElapsedMilliseconds()).toEqual(0)

    // create two laps
    clickPlayPause()
    await sleep(1000)
    clickLap()
    await sleep(1000)
    clickLap()
    clickPlayPause()

    // expect the total elapsed to be higher than the current lap elapsed
    expect(getElapsedMilliseconds()).toBeGreaterThan(getLapElapsedMilliseconds())

    // expect two lap elements
    const laps = wrapper.find('.stopwatch__laps').first().children()
    expect(laps.length).toEqual(2)

    // expect lap one
    const lapOne = laps.at(1)
    expect(lapOne.find('.entry__elapsed h4').text()).toEqual('Lap 1')
    const lapOneElapsed = elapsedToMilliseconds(lapOne.find('.entry__elapsed small').text())
    expect(lapOneElapsed).toBeGreaterThan(0)
    const lapOneCreated = elapsedToMilliseconds(lapOne.find('.entry__created').text())
    expect(lapOneCreated).toEqual(lapOneElapsed)

    // expect lap two
    const lapTwo = laps.at(0)
    expect(lapTwo.find('.entry__elapsed h4').text()).toEqual('Lap 2')
    const lapTwoElapsed = elapsedToMilliseconds(lapTwo.find('.entry__elapsed small').text())
    expect(lapTwoElapsed).toBeGreaterThan(0)
    expect(elapsedToMilliseconds(lapTwo.find('.entry__created').text())).toBeGreaterThan(lapOneCreated)
})

it('should reset the stopwatch', async () => {
    // expect a zero start
    expect(getElapsedMilliseconds()).toEqual(0)
    expect(getLapElapsedMilliseconds()).toEqual(0)

    // create two laps, reset and wait
    clickPlayPause()
    await sleep(100)
    clickLap()
    await sleep(100)
    clickLap()
    clickReset()
    await sleep(500)

    // expect 0 elapsed and no laps
    expect(getElapsedMilliseconds()).toEqual(0)
    expect(getLapElapsedMilliseconds()).toEqual(0)
    expect(wrapper.find('.stopwatch__laps').first().children().length).toEqual(0)
    expect(wrapper.find('.controls__button--lap').first().prop('disabled')).toBeTruthy()
})