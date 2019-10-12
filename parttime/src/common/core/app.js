import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom'
import routes from './router'
import Layout from '../layout'

let singlePages = []
let others = []
routes.forEach(item => {
    item.singlePage ? singlePages.push(item) : others.push(item)
})