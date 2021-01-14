import axios from 'axios'
const api = 'http://localhost:9999'
export const getCourses = async () => {
  const { data } = await axios.get(api + '/api/course')
  return data
}
export const addCourse = async params => {
  const {data}=await axios.post(api + '/api/addCourse', params)
  return data
}