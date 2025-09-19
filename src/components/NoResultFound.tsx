import Header from './Header';
import SearchPanel from './SearchPanel';

export default function NoResultFound() {
    return (
        <div>
            <Header />
            <SearchPanel />
            <p>No search result found!</p>
        </div>
        
    )
}