import axios from '../plugins/axios'

export default {
  add (data) {
    return axios.post('/user', data)
  },
  update (data) {
    return axios.put('/user/' + data.id, data)
  },
  login (data) {
    return axios.post('/user/login', data)
  },
  get (id) {
    return axios.get('/user/' + id)
  },
  getList () {
    return axios.get('/user')
  },
  updatePassword (data) {
    return axios.put('/user/password', data)
  },
  delete (id) {
    return axios.delete('/user/' + id)
  }
}
