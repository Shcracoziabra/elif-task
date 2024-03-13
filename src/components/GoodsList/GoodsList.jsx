import { PropTypes } from 'prop-types';
import './GoodsList.css';
import GoodsItem from '../GoodsItem/GoodsItem';

export default function GoodsList({children}){
    const items = [1,2,3,4,5,6,7,8,9,10,11,12];

    return (
        <ul className='goods-list'>
            {children.map((item, i)=> {
                return <li key={i}>{item}</li>
            })}
        </ul>
    )
}

GoodsList.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element)
}