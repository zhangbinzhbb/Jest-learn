// function expect(result){
//     return {
//         toBe:function (actual){
//             if(result !== actual){
//                 throw new Error(`预期值和实际值不相等 预期${actual} 结果却是${result}`)
//             }
//         }
//     }
// }

// function test(desc,fn){
//     try {
//         fn()
//         console.log(`${desc} 通过测试`)
//     } catch (e) {
//         console.log(`${desc} 没有通过测试 ${e}`)
//     }
// }

// const indexTest = require('./index')
// const {add,minus,multi} = indexTest

import {add,minus,multi} from './index.js'

test('测试加法 3+7',()=>{
    expect(add(3,7)).toBe(10)
})

test('测试减法 3-3',()=>{
    expect(minus(3,3)).toBe(0)
})

// npm run test
// jest (babel-jest)
// babel-core
// 取 .babelrc配置
// 在运行测试之前，结合babel,先把你代码做了一次转化
// 运行转化过的测试试用例代码