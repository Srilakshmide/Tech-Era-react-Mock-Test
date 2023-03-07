import {Component} from 'react'
import Loader from 'react-loader-spinner'

import CourseItem from '../CourseItem'
import Header from '../Header'
import './index.css'

class Home extends Component {
  state = {isLoading: true, courseData: [], statusFail: false}

  componentDidMount() {
    this.getCoursesData()
  }

  getCoursesData = async () => {
    const response = await fetch('https://apis.ccbp.in/te/courses')
    if (response.ok === true) {
      const fetchedData = await response.json()
      const formattedData = fetchedData.courses.map(eachCourse => ({
        id: eachCourse.id,
        name: eachCourse.name,
        logoUrl: eachCourse.logo_url,
      }))
      this.setState({courseData: formattedData, isLoading: false})
    } else {
      this.setState({statusFail: true})
    }
  }

  onClickRetry = () => {
    this.getCoursesData()
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <>
      <div className="failure">
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
          alt="failure view"
          className="failure-img"
        />
        <h1 className="failure-head">Oops! Something Went Wrong</h1>
        <p className="failure-desc">
          We cannot seem to find the page you are looking for.
        </p>
        <button type="button" className="retry-btn" onClick={this.onClickRetry}>
          Retry
        </button>
      </div>
    </>
  )

  renderCourses = () => {
    const {courseData} = this.state

    return (
      <>
        <h1 className="heading">Courses</h1>
        <ul className="list-items">
          {courseData.map(course => (
            <CourseItem key={course.id} course={course} />
          ))}
        </ul>
      </>
    )
  }

  render() {
    const {isLoading, statusFail} = this.state

    return (
      <>
        <Header />
        <div className="bg-container">
          {isLoading ? this.renderLoader() : ''}
          {statusFail ? this.renderFailureView() : this.renderCourses()}
        </div>
      </>
    )
  }
}

export default Home
