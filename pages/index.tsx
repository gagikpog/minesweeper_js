import { Inter } from '@next/font/google'
import Home from '../components/home';
import { Provider } from 'react-redux';
import { store } from '../store/main';
import Previewer from '../components/previewer';
import { DialogProvider } from '../dialog/dialogProvider';
import { applicationInit } from '../game/funcs/applicationInit';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] })

applicationInit();

export default function Index() {
    return (
        <>
            <Head>
                <title>Minesweeper</title>
                <meta name='viewport' content='user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=320, height=device-height' />
                <link rel='manifest' href='/.webmanifest' />
                <meta http-equiv='X-UA-Compatible' content='ie=edge' />
                <link rel='icon' type='image/x-icon' href='/favicon.ico'></link>
            </Head>
            <Provider store={store}>
                <DialogProvider>
                    <Previewer>
                        <Home />
                    </Previewer>
                </DialogProvider>
            </Provider>
        </>
    )
}
