import Header from './Header';
import IconError from './assets/images/icon-error.svg';
import IconRetry from './assets/images/icon-retry.svg';

export default function ErrorState() {
    return (
        <div>
            <Header />
            <div>
                <img src={IconError} alt="" />
                <h1>Something went wrong</h1>
                <p>We couldn't connect to the server (API error). Please try again in a few moments.</p>
                <button>
                    <img src={IconRetry} alt="" />
                    Retry
                </button>
            </div>
        </div>
    )
}