import { runCallback } from './demo'
import axios from 'axios'

jest.mock('axios')

// mock 函数，
// 1、捕获函数调用和返回结果，以及this和调用顺序
// 2、它可以让我们自由的设置返回结果
// 3、改变函数的内部实现

test('测试 runCallback', () => {
    const func = jest.fn()
    runCallback(func)
    expect(func).toBeCalled()
})


test.only('测试 getData', async () => {
    axios.get.mockResolvedValue({ data: 'hello' })
    await getData().then(data => {
        expect(data).toBe('hello')
    })
})