import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import './App.css'
import Nav from './components/Nav/Nav';
import Shop from './components/Shop/Shop';
import ShoppingChart from './components/ShoppingChart/ShoppingChart';
import { AppContext } from './AppContext';
import { chartData } from './initialData';

function App() {
  const [ shoppingChartData, setShoppingChartData] = useState(chartData);
  const [currentUserId, setCurrentUserId] = useState(1);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const pages = ['shop', 'shopping chart'];
  const [pageChosen, setPageChosen] = useState('shop');
  const [chosenStore, setChosenStore] = useState('store 1');
  const [ data, setData ] = useState(null);
  const [filters, setFilters] = useState([ 'newest']);

  useEffect(()=> {
    fetch('/data.json').then(res => res.json()).then(res => {setData(res)});
    const localData = localStorage.getItem('shoppingChart');
    if(localData){
      setShoppingChartData(JSON.parse(localData));
    }
  }, []);

  return (
    <AppContext.Provider value={
      {
        shoppingChartData, setShoppingChartData,
        filters, setFilters, 
        chosenStore, setChosenStore, 
        data,  setData, 
        currentOrderId, setCurrentOrderId,
        currentUserId
      }
    }>
      {createPortal(<Nav onItemClick={setPageChosen} chosen={pageChosen} pages={pages}/>, document.body.querySelector('header'))}
      {data && pageChosen === 'shop' && <Shop/>}
      {data && pageChosen === 'shopping chart' && <ShoppingChart/>}
    </AppContext.Provider>
  )
}

export default App
