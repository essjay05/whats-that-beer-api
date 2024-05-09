import './BeerStyles.css'
import NavBar from '../../global/NavBar/NavBar.jsx'
import { Link } from 'react-router-dom'

const Beers = () => {
  return (
    <div className='page-container'>
      <NavBar/>
      <h1>Beers</h1>
      <aside className='side-nav'>
        <ul>
          <li><Link to='/create-beer'>Add a Beer</Link></li>
          <li>Favorited Beers</li>
        </ul>
      </aside>
    </div>
  )
}

export default Beers