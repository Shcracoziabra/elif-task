import './Shop.css';
import { useContext } from 'react';
import { AppContext } from '../../AppContext';

import ShopsList from "../ShopsList/ShopsList";
import GoodsList from "../GoodsList/GoodsList";
import GoodsItem from '../GoodsItem/GoodsItem';
import FilterPanel from '../FilterPanel/FilterPanel';


export default function Shop(){
    

    const { 
        filters, 
        data, 
        chosenStore, 
        currentUserId, 
        currentOrderId,
        shoppingChartData,
        setShoppingChartData 
    } = useContext(AppContext);

    const favourites = data.users.find(({id}) => id === currentUserId).favourites;

    const getSortedGoods = (goods) => {
        return  goods.sort((a, b) => {
            if (favourites.includes(a.id)){
                return -1;
            } else if (favourites.includes(b.id)) {
                return 1;
            }

            if(filters.includes('newest')){
                if(a.created > b.created) {
                    return -1
                } else if (a.created < b.created) {
                    return 1
                }
            }
            if(filters.includes('cheapest')){
                if(a.price < b.price) {
                    return -1
                } else if (a.price > b.price) {
                    return 1
                }
            }
            
            return 0;
        });
    }

    const allGoods = data.goods;
    
    const orderedGoods = shoppingChartData.order.map(({id}) => id) ;

    const goods = data.stores
                    .find(({name}) => name === chosenStore).goods
                    .map(({id}) => ({
                        ...allGoods.find((item) => item.id === id), 
                        marked: favourites.includes(id),
                        added: orderedGoods.includes(id)
                    }));

    const sortedGoods = getSortedGoods(goods);
    return (
        <section className='shop'>
            <div className='shop__title-mobile'>
                <h2>{chosenStore}</h2>
                <button>choose shop</button>
            </div>
            <FilterPanel/>
            <ShopsList/>
            <GoodsList>{sortedGoods.map(item => <GoodsItem item={item} key={chosenStore+''+item.id}/>)}</GoodsList>
        </section>
    )
}