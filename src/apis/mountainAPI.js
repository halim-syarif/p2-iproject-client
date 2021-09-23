import axios from "axios"

const instance = axios.create({
    baseURL: 'https://halim-nanjakyuk.herokuapp.com/'
})

export default instance