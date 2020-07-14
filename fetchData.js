import axios from 'axios'

// http://www.dell-lee.com/react/api/demo.json

const URL = 'http://www.dell-lee.com/react/api/demo.json'

// export const fetchData = (fn) =>{
//     axios.get(URL).then((Response)=>{
//         fn(Response.data)
//     })
// }

// Promises
export const fetchData = () => {
    return axios.get(URL)
}