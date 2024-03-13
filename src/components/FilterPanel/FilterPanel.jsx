import { AppContext } from '../../AppContext';
import { useContext } from 'react';
import './FilterPanel.css';

export default function FilterPanel(){
    const { filters, setFilters } = useContext(AppContext);


    const onFilterClick = (filter) => {
        let nextFilter;
        if(filter === 'show all') {
            nextFilter = [];
        } else if (filters.includes(filter)) {
            nextFilter = filters.filter(item => item !== filter);
        } else {
            nextFilter = [...filters, filter];
        }
        setFilters(nextFilter);
    }
    const items = ['show all', 'cheapest', 'newest'];
    const elems = items.map(item => {
        const itemClass = item === 'show all' && !filters.length ? 
                            'filter-panel__item filter-panel__item_chosen' :
                            filters.includes(item) ? 'filter-panel__item filter-panel__item_chosen' :
                            'filter-panel__item';
        return (
            <button key={item}
                onClick={() => onFilterClick(item)}
                className={itemClass}>{item}
            </button>
        ) 
    })

    return (
        <div className='filter-panel'>
            {elems}
        </div>
    )
}