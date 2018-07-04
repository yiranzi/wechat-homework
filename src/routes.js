/* eslint-disable */
import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

// 支付页面
import Layout from './component/layout/layout'
import Homework from './pages/homework'
import FeedBack from './pages/homework'

const routes = (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route path='/homework/buyDetail' component={Homework} />
        <Route path='/homework/feedback/:feedbackId' component={FeedBack} />
        <Route component={Homework} />
        {/*<Route render={(props) => { return <div>{props.match.url}routes nomatch 404</div>}} />*/}
      </Switch>
    </Layout>
  </BrowserRouter>
)

export default routes
