import { fetchData } from './mockDemo'
import axios from 'axios'

jest.mock('axios')
test('fetchData 测试', () => {
    axios.get.mockResolvedValue({ 
        data: "(function(){ return '123' })()" 
    })
    return fetchData().then(data => {
        expect(eval(data)).toEqual('123')
    })
})



jest.mock('./mockDemo')
import { fetchData } from './mockDemo'
test('fetchData 测试', () => {
    return fetchData().then(data => {
        expect(eval(data)).toEqual('123')
    })
})


jest.mock('./mockDemo')
import { fetchData } from './mockDemo'
const { getNumber } = jest.requireActual('./mockDemo')

test('fetchData 测试', () => {
    return fetchData().then(data => {
        expect(eval(data)).toEqual('123')
    })
})


test('getNumber 测试', ()=>{
    expect(getNumber()).toEqual(123)
})