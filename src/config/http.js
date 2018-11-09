import axios from 'axios'

const API = process.env.APIURL

export const http = axios.create({
  baseURL: process.env.APIURL || 'http://localhost:8080/api'
  // baseURL: 'http://localhost:8080/api'
})
