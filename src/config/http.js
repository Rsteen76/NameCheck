import axios from 'axios'

export const http = axios.create({
  // baseURL: 'https://brandorium.herokuapp.com/api'
  baseURL: process.env.baseURL
})
