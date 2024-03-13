import { PropTypes } from 'prop-types';
import { useContext } from 'react';
import { AppContext } from '../../AppContext';


import './ShopsList.css';

export default function ShopsList(){
    const items = ['store 1', 'store 2', 'store 3'];
    const { chosenStore, setChosenStore, data } = useContext(AppContext);


    return (
        <ul className='shops-list'>
            {data.stores.map(item=> {
                const itemClass = chosenStore === item.name ? 'shops-list__item shops-list__item_chosen' : 'shops-list__item';
                return (
                    <li key={item.id}>
                        <button onClick={()=> setChosenStore(item.name)} className={itemClass}>
                            {item.name}
                        </button>
                    </li>
                )
            })}
        </ul>
    )
}
