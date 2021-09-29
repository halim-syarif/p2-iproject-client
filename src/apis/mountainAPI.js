import axios from "axios"

const instance = axios.create({
    baseURL: 'https://halim-nanjakyuk.herokuapp.com/'
    // baseURL: 'http://localhost:3000'
})

export default instance