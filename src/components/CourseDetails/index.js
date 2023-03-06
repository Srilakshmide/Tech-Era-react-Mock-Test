import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'
import Header from '../Header'

class CourseDetails extends Component {
  state = {courseList: {}, isLoading: true, statusFail: false}

  componentDidMount() {
    this.getCourseItemData()
  }

  getCourseItemData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)
    if (response.ok === true) {
      const data = await response.json()
      const formattedData = {
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }
      this.setState({courseList: formattedData, isLoading: false})
    } else {
      this.setState({statusFail: true})
    }
  }

  onClickRetryBtn = () => {
    this.getCourseItemData()
  }

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

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
    </div>
  )

  renderCourseDetails = () => {
    const {courseList} = this.state
    const {name, imageUrl, description} = courseList
    console.log(courseList)

    return (
      <div className="course-details">
        <div className="card">
          <img src={imageUrl} alt={name} className="image" />
          <div className="description-container">
            <h1 className="name">{name}</h1>
            <p className="description">{description}</p>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {isLoading, statusFail} = this.state

    return (
      <>
        <Header />
        {isLoading ? this.renderLoader() : ''}
        {statusFail ? this.renderFailureView() : this.renderCourseDetails()}
      </>
    )
  }
}

export default CourseDetails
