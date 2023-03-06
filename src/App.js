import {Route, Switch} from 'react-router-dom'

import Home from './components/Home'
import NotFound from './components/NotFound'
import CourseDetails from './components/CourseDetails'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/courses/:id" component={CourseDetails} />
    <Route component={NotFound} />
  </Switch>
)

export default App
