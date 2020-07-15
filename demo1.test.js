import { generateConfig } from './demo1'

test('测试 generateConfig 函数',()=>{
    expect(generateConfig()).toMatchSnapshot();
})