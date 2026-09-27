import { Link } from 'react-router-dom';
import "./navbar.css";



const Navbar = () => {
    return <nav>
        <Link to="/">
            <div id='home'>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6KhXFi3hOyOS7qP6ulyCpU6V1_L9tFzMV-fjl_PY7GA&s=10' alt='GitHub-Logo' />
                <h3>GitHub</h3>
            </div>
        </Link>
        <div id='main'>
            <Link to="/create"><p>Create a Repositry</p></Link>
            <Link to="/profile"><p>Profile</p></Link>
        </div>

    </nav>
};

export default Navbar;
