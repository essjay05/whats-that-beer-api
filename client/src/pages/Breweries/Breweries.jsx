import NavBar from "../../global/NavBar/NavBar"
import { Link } from 'react-router-dom'

const Breweries = () => {
  return (
    <div className='page-container breweries'>
      <NavBar/>
      <h1>Breweries</h1>
      <aside className='side-nav'>
        <ul>
          <li><Link to='/create-brewery'>Add a Brewery</Link></li>
          <li>Favorited Breweries</li>
        </ul>
      </aside>
    </div>
  )
}

export default Breweries