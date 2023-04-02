import { Inter } from '@next/font/google'
import Home from './home';
import { Provider } from "react-redux";
import { store } from '../store/main';
import Previewer from '../components/previewer';
import { DialogProvider } from '../dialog/dialogProvider';

const inter = Inter({ subsets: ['latin'] })

export default function Index() {
    return (
        <Provider store={store}>
            <DialogProvider>
                <Previewer>
                    <Home />
                </Previewer>
            </DialogProvider>
        </Provider>
    )
}
