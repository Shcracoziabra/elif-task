import { PropTypes } from 'prop-types';
import { useContext } from 'react';
import { AppContext } from '../../AppContext';

import './GoodsItem.css';


export default function GoodsItem({item}){
    const { 
        data, 
        setData, 
        currentUserId, 
        currentOrderId, 
        setCurrentOrderId,
        shoppingChartData,
        setShoppingChartData 
    } = useContext(AppContext);

    const addToOrder = (id) => {

        if (!shoppingChartData.order.includes(id)) {
            let nextData = {
                ...shoppingChartData,
                order: [...shoppingChartData.order, {id, count: 1}]
            }
            setShoppingChartData(nextData);
            localStorage.setItem('shoppingChart',JSON.stringify(nextData));
        }

        // const openOrder = data.orders.filter(({userId}) => userId === currentUserId).find(({open}) => open);
        // if(openOrder) {
        //     nextData = {
        //         ...data, 
        //         orders: data.orders.map(order => {
        //             if(order.id === currentOrderId) {
        //                 if(order.items.find(item => item.id === id)){
        //                     return order;
        //                 }
        //                 return {...order, items: [...order.items, {id, count: 1}]}
        //             }
        //             return order
        //         })}
        // } else {
        //     const nextId = Date.now();
        //     setCurrentOrderId(nextId);
        //     nextData = {
        //         ...data,
        //         orders: [
        //             ...data.orders, 
        //             {
        //                 id: nextId, 
        //                 userId: currentUserId, 
        //                 items: [{id, count: 1}],
        //                 open: true
        //             }]
        //     }
        // }
        
        
    }

    const addToFavourites = (id) => {
        const nextData = {
            ...data, 
            users: data.users.map(item => {
                if(item.id === currentUserId) {
                    if(item.favourites.includes(id)) {
                        return item
                    }
                    return {
                        ...item, 
                        favourites: [...item.favourites, id]
                    }
                }
                return item;
            })
        }
        setData(nextData);
    }

    const removeFromFavourites = (id) => {
        const nextData = {
            ...data, 
            users: data.users.map(item => {
                if(item.id === currentUserId) {
                    return {
                        ...item, 
                        favourites: item.favourites.filter(item => item !== id)
                    }
                }
                return item;
            })
        }
        setData(nextData);
    }


    const { id, price, name, descr, marked, added, created } = item;
    return (
        <article className='goods-item'>
            <div className='goods-item__image'>
                <img src='https://media.istockphoto.com/id/164478117/photo/prescription-pills.jpg?s=612x612&w=0&k=20&c=VPhDgG5DOz1ppiZnjnFe6RyYx1RJlmRqs3w9rn5Ch6o=' alt='good image'/>
            </div>
            <h2 className='goods-item__title'>{name}</h2>
            <p className='goods-item__descr'>{descr}</p>
            <p className='goods-item__descr'>{created}</p>
            <p className='goods-item__descr'>{price} uah</p>
            <button 
            onClick = {
                () => {
                    marked ? removeFromFavourites(id) : addToFavourites(id)
                }
            }
            className={
                marked ? 
                    'goods-item__mark goods-item__mark_chosen' : 
                    'goods-item__mark goods-item__mark_unchosen'
                }></button>
                <button 
                    disabled={added}
                    onClick={()=> addToOrder(id)} 
                    className={added ? 'goods-item__btn goods-item__btn_added' : 'goods-item__btn'}>
                        {added ? 'added' : 'add to chart'}
                </button>
        </article>
    )
}

GoodsItem.propTypes = {
    item: PropTypes.object
}