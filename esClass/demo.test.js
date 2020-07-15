jest.mock('./util')

// Util,Util.a Util.b jest.fn

import Util from './util'

import demoFunction from './demo'

test('测试 demoFunction', ()=>{
    demoFunction()
    expect(Util).toHaveBeenCalled()
    expect(Util.mock.instances[0].a).toHaveBeenCalled()
    expect(Util.mock.instances[0].b).toHaveBeenCalled()
})
