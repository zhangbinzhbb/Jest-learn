- Automatic FrontEnd Testing 前端自动化测试
- Code Refactoring 代码重构
- Test Driven Development(TDD) 测试驱动的开发

**收获：**

1. 彻底入门前端自动化测试
2. 根据项目完成测试方案选项
3. 主流前端测试工具使用
4. 完成前端自动化测试项目落地
5. 形成多维度前端架构思维

[TOC]

## 前端自动化测试产生的背景及原理

TypeScript
Flow
EsLint
StyleLint

**index.js**

```
function add (a,b){
    return a+b
}

function minus(a,b){
    return a-b
}

function multi(a,b){
    return a*b
}
```
**index.test.js**

```
function expect(result){
    return {
        toBe:function (actual){
            if(result !== actual){
                throw new Error(`预期值和实际值不相等 预期${actual} 结果却是${result}`)
            }
        }
    }
}

function test(desc,fn){
    try {
        fn()
        console.log(`${desc} 通过测试`)
    } catch (e) {
        console.log(`${desc} 没有通过测试 ${e}`)
    }
}

test('测试加法 3+7',()=>{
    expect(add(3,7)).toBe(10)
})

test('测试减法 3-3',()=>{
    expect(minus(3,3)).toBe(0)
})
```
**index.html**

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>test</title>
</head>
<body>
    <script src="./index.js"></script>
</body>
</html>
```
## 前端自动化测试框架：Jest

性能、功能、易用性

**好用：**

速度快、API简单、易配置、隔离性好、监控模式、IDE整合、Snapshot、多项目并行、覆盖率、Mock丰富


```
npm install --save-dev jest@24.8.0
```

```
npx jest --init
```
增加 jest 配置项

```
npx jest --coverage
```
自动生成覆盖率的报告

```
  "scripts": {
    "test": "jest --watchAll",
    "coverage":"jest --coverage"
  },
```

**babel**

```
npm install @babel/core@7.4.5 @babel/preset-env@7.4.5 -D
```
.babelrc

```
{
    "presets": [
        [
            "@babel/preset-env",
            {
                "targets": {
                    "node": "current"
                }
            }
        ]
    ]
}

```
## Jest中匹配器

matchers

toBe

```
test('测试10与10相匹配', () => {
    // toBe 匹配器 matchers object.is === 
    const a = { "one": 1 }
    expect(a).toBe({ "one": 1 })
})
```
toEqual

```
test('测试对象内容相等', () => {
    // toEqual 匹配器
    const a = { "one": 1 }
    expect(a).toEqual({ "one": 1 })
})

```
- BeNull 只匹配 null
- BeUndefined 只匹配 undefined
- BeDefined 与 toBeUndefined 相反
- BeTruthy 匹配任何 if 语句为真
- BeFalsy 匹配任何 if 语句为假

比较浮点数相等，使用 toBeCloseTo 而不是 toEqual，因为你不希望测试取决于一个小小的舍入误差

```
test('两个浮点数字相加', () => {
    const value = 0.1 + 0.2;
    //expect(value).toBe(0.3); 这句会报错，因为浮点数有舍入误差
    expect(value).toBeCloseTo(0.3); // 这句可以运行
})
```

Array 、 new Set()
```
const shoppingList = [
    'diapers',
    'kleenex',
    'trash bags',
    'paper towels',
    'beer',
];

test('the shopping list has beer on it', () => {
    expect(shoppingList).toContain('beer');
    expect(new Set(shoppingList)).toContain('beer');
});
```

异常

如果你想要测试的特定函数抛出一个错误，在它调用时，使用 toThrow


```
function compileAndroidCode() {
    throw new Error('you are using the wrong JDK');
}

test('compiling android goes as expected', () => {
    expect(compileAndroidCode).toThrow();
    expect(compileAndroidCode).toThrow(Error);

    // You can also use the exact error message or a regexp
    expect(compileAndroidCode).toThrow('you are using the wrong JDK');
    expect(compileAndroidCode).toThrow(/JDK/);
});
```

查看更多matchers 匹配器

https://jestjs.io/docs/zh-Hans/expect

## Jest 命令行工具的使用

- Press f to run only failed tests.
- Press o to only run tests related to changed files.
- Press p to filter by a filename regex pattern.
- Press t to filter by a test name regex pattern.
- Press q to quit watch mode.


- f只运行失败的测试。
- o只运行与更改文件相关的测试。配合git使用
- p以按文件名regex模式进行过滤。
- t按测试名称正则表达式过滤模式。
- q退出手表模式。

```
  "scripts": {
    "test": "jest --watch",
    "coverage":"jest --coverage"
  },
```

watch 默认进入O模式

## 异步代码的测试方法


```
npm install axios --save
```
新建fetchData.js


```
import axios from 'axios'

// http://www.dell-lee.com/react/api/demo.json

const URL = 'http://www.dell-lee.com/react/api/demo1.json'
export const fetchData = (fn) =>{
    axios.get(URL).then((Response)=>{
        fn(Response.data)
    })
}
```

Promises


```
import axios from 'axios'

// http://www.dell-lee.com/react/api/demo.json

const URL = 'http://www.dell-lee.com/react/api/demo.json'

// Promises
export const fetchData = () => {
    return axios.get(URL)
}
```


fetchData.test.js

done()
```
// 异步模式是回调函数
import { fetchData } from './fetchData'

test('fetchData 返回结果为 { success:true }', (done)=>{
    fetchData((data)=>{
        expect(data).toEqual({
            success:true
        })
        done()
    })
})
```
Promises


```
test('fetchData 返回结果为 { success:true }', () => {
    return fetchData().then(Response => {
        expect(Response.data).toEqual(dataCode);
    });
})
```

assertions 404

添加 expect.assertions 来验证一定数量的断言被调用
```
test('fetchData 返回结果为 404', () => {
    expect.assertions(1);
    return fetchData().catch((e) => {
        expect(e.toString().indexOf('404') > -1).toBe(true)
    })
});
```
resolves

```
test('fetchData 返回结果为 { success:true }', () => {
    return expect(fetchData()).resolves.toMatchObject({
        data: {
            success: true
        }
    })
})
```
rejects 404

```
test('fetchData 返回结果为 404', () => {
    return expect(fetchData()).rejects.toThrow()
});
```
await

```
test('fetchData 返回结果为 { success:true }', async () => {
    const response = await fetchData();
    expect(response.data).toEqual(dataCode)
});
```
await 404

```
test('fetchData 返回结果为 { success:true }', async () => {
    expect.assertions(1);
    try {
        await fetchData();
    } catch (e) {
        expect(e.toString()).toEqual('Error: Request failed with status code 404')
    }
});
```
## Jest中的钩子函数

新建counter.js

```
export default class Counter {
    constructor() {
        this.number = 0
    }
    addOne() {
        this.number += 1
    }
    addTwo() {
        this.number += 2
    }
    minusOne() {
        this.number -= 1
    }
    minusTwo() {
        this.number -= 2
    }
}
```

counter.test.js

加入beforeAll、beforeEach、afterEach、afterAll

分组 describe

```
import Counter from './counter'

describe('Counter 的测试代码', () => {
    let counter = null

    beforeAll(() => {
        console.log('beforeAll')
    });

    beforeEach(() => {
        counter = new Counter()
    });

    afterEach(() => {
        console.log('afterEach')
    });

    afterAll(() => {
        console.log('afterAll')
    });

    describe('测试增加相关的代码', () => {
        test('测试 Counter 中的 addOne 方法', () => {
            counter.addOne()
            expect(counter.number).toBe(1)
        })

        test('测试 Counter 中的 addTwo 方法', () => {
            counter.addTwo()
            expect(counter.number).toBe(2)
        })
    });

    describe('测试减少相关的代码', () => {
        test('测试 Counter 中的 minusOne 方法', () => {
            counter.minusOne()
            expect(counter.number).toBe(-1)
        })

        test('测试 Counter 中的 minusTwo 方法', () => {
            counter.minusTwo()
            expect(counter.number).toBe(-2)
        })
    });
});
```
## Jest中的Mock

新建mockDemo.js


```
import axios from 'axios'

export const fetchData = () => {
    return axios.get('/').then(res => res.data)
}


export const getNumber = () => {
    return 123
}

// {
//     data:"(function(){ return '123' })()"
// }
```

mockDemo.test.js

第一种：用 jest.mock(...) 函数自动模拟 axios 模块
```
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

```

第二种：

新建__mocks__文件夹 里面存放 mockDemo.js

mockDemo.js

用js 模拟数据返回格式

```
export const fetchData = () => {
    return new Promise((resolved,reject)=>{
        resolved({
            data: "(function(){ return '123' })()" 
        })
    })
}

```

mockDemo.test.js
```
jest.mock('./mockDemo')
import { fetchData } from './mockDemo'
test('fetchData 测试', () => {
    return fetchData().then(data => {
        expect(eval(data)).toEqual('123')
    })
})
```

jest.requireActual('./mockDemo')

```
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
```
第三种：jest.config.js


```
automock:true
```

vscode 安装 jest

## mock times

新建 timer.js


```
export default (callback)=>{
    setTimeout(() => {
        callback()
    }, 3000);
}
```

timer.test.js

```
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
```

## es6中类的测试

util.js
```
class Util {
    a(){

    }
    b(){

    }
}

export default Util
```
util.test.js
```
import Util from './util'

let  util = null

beforeAll(()=>{
    util = new Util()
})

test('测试a 方法', ()=>{

})

test('测试b 方法', ()=>{
    
})
```
demo.js

```
import Util from './util'

const demoFunction = (a,b)=>{
    const util = new Util()
    util.a(a)
    util.b(b)
}

export default demoFunction
```
demo.test.js


```
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
```

模拟mock

```
const Util = jest.fn()
Util.prototype.a = jest.fn()
Util.prototype.b = jest.fn()

export default Util
```

## Jest中对Dom节点操作测试



## snapshot 快照

- toMatchSnapshot
- toMatchInlineSnapshot

合理使用命令行方式

https://jestjs.io/docs/zh-Hans/snapshot-testing

## TDD 的开发流程

- 编写测试用例
- 运行测试，测试用例无法通过测试
- 编写代码，使测试用例通过测试
- 优化代码，完成开发
- 重复上述步骤

TDD 的优势

- 长期减少回归bug
- 代码质量更好（组织，可维护性）
- 测试覆盖率高
- 错误测试代码不容易出现

## 项目地址
https://github.com/zhangbinzhbb/Jest-learn