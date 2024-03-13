import { PropTypes } from 'prop-types';
import { AppContext } from '../../AppContext';
import { useContext } from 'react';
import './OrderItem.css';

export default function OrderItem({item}){
    const { 
        data, setData, 
        shoppingChartData,
        setShoppingChartData,
        currentUserId } = useContext(AppContext);

    const subtractItem = (id, count) => {
        const nextCount = count - 1;
        let nextData;
        if(nextCount === 0) {
            nextData = {
                ...shoppingChartData,
                order: shoppingChartData.order.filter(item => item.id !== id)
            }
        } else {
            nextData = {
                ...shoppingChartData,
                order: shoppingChartData.order.map(item => {
                    if(item.id === id){
                        return {...item, count: nextCount}
                    }
                    return item
                })
            }
        }  
        setShoppingChartData(nextData);
        localStorage.setItem('shoppingChart', JSON.stringify(nextData));
    }

    const addItem = (id, count) => {
        const nextCount = count + 1;
        const maxCount = data.goods.find(item => item.id === id).count;
        let nextData;
        if(nextCount <= maxCount) {
            nextData = {
                ...shoppingChartData,
                order: shoppingChartData.order.map(item => {
                    if(item.id === id){
                        return {...item, count: nextCount}
                    }
                    return item
                })
            }
        } 
        setShoppingChartData(nextData);
        localStorage.setItem('shoppingChart', JSON.stringify(nextData));
    }         

    const { descr, id, name, price, count } = item;
    return (
        <article className='order-item'>
            <div className='order-item__image'>
                <img src='https://media.istockphoto.com/id/164478117/photo/prescription-pills.jpg?s=612x612&w=0&k=20&c=VPhDgG5DOz1ppiZnjnFe6RyYx1RJlmRqs3w9rn5Ch6o=' alt='good image'/>
            </div>
            <h2 className='order-item__title'>{name}</h2>
            <p className='order-item__price'>{price} uah</p>
            <div className='order-item__count'>
                <button 
                    onClick={(e)=> {
                        e.preventDefault()
                        subtractItem(id, count)
                    }} 
                    className='order-item__count-control'>-</button>
                <span className='order-item__count-num'>{count}</span>
                <button 
                    onClick={(e)=> {
                        e.preventDefault()
                        addItem(id, count)
                    }}  
                    className='order-item__count-control'>+</button>
            </div>
        </article>
    )
}

OrderItem.propTypes = {
    item: PropTypes.object
}