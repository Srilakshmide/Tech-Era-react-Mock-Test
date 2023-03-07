import {Link} from 'react-router-dom'

import './index.css'

const CourseItem = props => {
  const {course} = props
  const {id, name, logoUrl} = course

  return (
    <li className="item">
      <Link to={`courses/${id}`} className="link-item">
        <div className="course-list-item">
          <img src={logoUrl} className="logo-img" alt={name} />
          <p className="title">{name}</p>
        </div>
      </Link>
    </li>
  )
}

export default CourseItem
