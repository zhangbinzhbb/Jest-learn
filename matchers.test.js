// test('测试10与10相匹配', () => {
//     // toBe 匹配器 matchers object.is === 
//     const a = { "one": 1 }
//     expect(a).toBe({ "one": 1 })
// })

// test('测试对象内容相等', () => {
//     // toEqual 匹配器
//     const a = { "one": 1 }
//     expect(a).toEqual({ "one": 1 })
// })

test('测试对象内容相等', () => {
    // toEqual 匹配器
    const a = { "one": 1 }
    expect(a).toEqual({ "one": 1 })
})

test('两个浮点数字相加', () => {
    const value = 0.1 + 0.2;

    //expect(value).toBe(0.3);  // 这句会报错，因为浮点数有舍入误差
    expect(value).toBeCloseTo(0.3); // 这句可以运行
});


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


// toBeNull 只匹配 null
// toBeUndefined 只匹配 undefined
// toBeDefined 与 toBeUndefined 相反
// toBeTruthy 匹配任何 if 语句为真
// toBeFalsy 匹配任何 if 语句为假
