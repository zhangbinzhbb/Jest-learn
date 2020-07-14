// 异步模式是回调函数
import { fetchData } from './fetchData'
import { request } from 'https';

const dataCode = {
    success: true
}
// test('fetchData 返回结果为 { success:true }', (done)=>{
//     fetchData((data)=>{
//         expect(data).toEqual({
//             success:true
//         })
//         done()
//     })
// })

// Promises

// test('fetchData 返回结果为 { success:true }', () => {
//     return fetchData().then(Response => {
//         expect(Response.data).toEqual(dataCode);
//     });
// })

// test('fetchData 返回结果为 404', () => {
//     expect.assertions(1);
//     return fetchData().catch((e) => {
//         expect(e.toString().indexOf('404') > -1).toBe(true)
//     })
// });

// resolves
// test('fetchData 返回结果为 { success:true }', () => {
//     return expect(fetchData()).resolves.toMatchObject({
//         data: {
//             success: true
//         }
//     })
// })

// rejects
// test('fetchData 返回结果为 404', () => {
//     return expect(fetchData()).rejects.toThrow()
// });

// await
test('fetchData 返回结果为 { success:true }', async () => {
    const response = await fetchData();
    expect(response.data).toEqual(dataCode)
});

// await 404 
// test('fetchData 返回结果为 { success:true }', async () => {
//     expect.assertions(1);
//     try {
//         await fetchData();
//     } catch (e) {
//         expect(e.toString()).toEqual('Error: Request failed with status code 404')
//     }
// });