import { PropTypes } from 'prop-types';
import { useContext, useState } from 'react';
import { AppContext } from '../../AppContext';
import './ShoppingChart.css';
import GoodsList from '../GoodsList/GoodsList';
import OrderItem from '../OrderItem/OrderItem';
import { chartData } from '../../initialData';
import { createPortal } from 'react-dom';

function InputGroup({data, onInput}){

    const { title, type, required, value, placeholder, pattern } = data;

    return (
        <div className='shopping-chart__input-wrapper'>
            <label htmlFor={'chart'+title} className='shopping-chart__label'>{title}</label>
            <input 
                id={'chart'+title} 
                type={type} 
                placeholder={placeholder}
                required={required}
                value={value}
                className='shopping-chart__input'
                onChange={(e)=> onInput(title, e.target.value)}
            />
        </div>
    )
}

InputGroup.propTypes = {
    data: PropTypes.shape({
        title: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        required: PropTypes.bool.isRequired,
        value: PropTypes.string.isRequired,
        placeholder: PropTypes.string.isRequired,
    }),
    onInput: PropTypes.func
}

export default function ShoppingChart(){
    const { 
        data, 
        currentUserId, 
        shoppingChartData,
        setShoppingChartData
    } = useContext(AppContext);


    const [ messageOpen, setMessageOpen ] = useState(false);

    const onInput = (title, value) => {
        const nextInputs = shoppingChartData.inputs.map(item => {
            if(item.title === title) {
                return {...item, value}
            }
            return item
        });
        setShoppingChartData({...shoppingChartData, inputs: nextInputs});
        localStorage.setItem('shoppingChart',JSON.stringify({...shoppingChartData, inputs: nextInputs}));
    }

    const onSubmit = () => {
        const nextData = {...shoppingChartData, order: []}
        setShoppingChartData(nextData);
        localStorage.setItem('shoppingChart', JSON.stringify(nextData));
        setMessageOpen(true);
        setTimeout(()=> setMessageOpen(false), 4000);
        console.log(shoppingChartData.order);
    }

    const goodsChosen = shoppingChartData.order.map(item => (
        {...data.goods.find(({id}) => item.id === id), count: item.count}
        )); 

    const totalPrice = goodsChosen.map(({price, count}) => price*count).reduce((a, b) => a+b, 0);

    const chartForm =   <form className='shopping-chart'>
                                <div className='shopping-chart__userinfo'>
                                    {shoppingChartData.inputs.map(item=> {
                                        return <InputGroup key={item.title} data={item} onInput={onInput}/>})
                                    }
                                </div>
                                { goodsChosen.length ?  <GoodsList>
                                                            {goodsChosen.map(item => <OrderItem item={item} key={item.id}/>)}
                                                        </GoodsList> :
                                                        <h2 className='shopping-chart__empty'>No goods added</h2>
                                }
                                <div className='shopping-chart__footer'>
                                <span className='shopping-chart__total-price'>Total price: {totalPrice} uah</span>
                                <button 
                                    onClick={onSubmit}
                                    className='shopping-chart__submit'
                                    disabled={!goodsChosen || !goodsChosen.length}>
                                    submit order
                                </button>
                                </div>
                                {messageOpen && createPortal((
                                    <div className='overlay'>
                                        <div className='overlay__inner'>
                                            <h2>Order successfully accepted!</h2>
                                        </div>
                                    </div>
                                ), document.body)}
                            </form>;

    return (
        <>
        { chartForm }
        </>
    )
}

ShoppingChart.propTypes = {
    order: PropTypes.object
}