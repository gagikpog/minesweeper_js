import { Inter } from '@next/font/google'
import Home from './home';
import { Provider } from "react-redux";
import { store } from '../store/main';

const inter = Inter({ subsets: ['latin'] })

export default function Index() {
    return (
        <Provider store={store}>
            <Home />
        </Provider>
    )
}
