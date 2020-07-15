import timer from './timer'

jest.useFakeTimers()

test('timer 测试',()=>{
    const fn = jest.fn()
    timer(fn)
    jest.runAllTimers()
    expect(fn).toHaveBeenCalledTimes(1)
})

// runOnlyPendingTimers
// advanceTimersByTime 时间快进