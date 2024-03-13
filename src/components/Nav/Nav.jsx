import { PropTypes } from 'prop-types';
import './Nav.css';

export default function Nav({chosen, pages, onItemClick}){

    return (
        <nav>
            <ul className='nav-menu'>
                {pages.map(page => {
                    const listClass = page ===  chosen ? 'nav-menu__item nav-menu__item_chosen' : 'nav-menu__item';
                    return (
                        <li 
                            key={page} className={listClass}>
                            <button onClick={()=> onItemClick(page)}>{page}</button>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

Nav.propTypes = {
    pages: PropTypes.arrayOf(PropTypes.string),
    chosen: PropTypes.string,
    onItemClick: PropTypes.func
}