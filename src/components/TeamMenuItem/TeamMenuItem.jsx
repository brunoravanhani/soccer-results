import './TeamMenuItem.css';
import { Link } from 'react-router-dom';

export default function TeamMenuItem({imageSrc, route}) {
    return (
        <div className='menu-item'><Link to={route}><img src={imageSrc}/></Link></div>
    );
}