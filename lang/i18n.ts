import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    statistics: {
                        caption: 'Lead board',
                        user: 'User',
                        date: 'Date',
                        time: 'Time',
                        number: '#'
                    },
                    common: {
                        beginner: 'Beginner',
                        intermediate: 'Intermediate',
                        advanced: 'Advanced'
                    },
                    settings: {
                        caption: 'Settings',
                        godMode: 'God mode',
                        blockSize: 'Zoom',
                        padding: 'Paddings',
                        resetAll: 'Reset all',
                        lang: 'Lang'
                    },
                    messages: {
                        gameOver: 'Game over',
                        gameWin: 'Win'
                    },
                    register: {
                        caption: 'Регистрация',
                        register: 'Register',
                        description: 'Enter your name and email address to save the leaderboard',
                        name: 'Name',
                        namePlaceholder: 'Enter your name',
                        neverShow: 'Never show registration'
                    }
                }
            },
            ru: {
                translation: {
                    statistics: {
                        caption: 'Таблица лидеров',
                        user: 'Имя',
                        date: 'Дата',
                        time: 'Время',
                        number: '№'
                    },
                    common: {
                        beginner: 'Новичок',
                        intermediate: 'Любитель',
                        advanced: 'Профессионал'
                    },
                    settings: {
                        caption: 'Настройки',
                        godMode: 'Помощник',
                        blockSize: 'Масштаб',
                        padding: 'Отступы',
                        resetAll: 'Сбросить все',
                        lang: 'Язык'
                    },
                    messages: {
                        gameOver: 'Проигрыш',
                        gameWin: 'Победа'
                    },
                    register: {
                        caption: 'Регистрация',
                        register: 'Регистрация',
                        description: 'Введите свое имя и адрес электронной почты, чтобы сохранить таблицу лидеров',
                        name: 'Имя',
                        namePlaceholder: 'Введите ваше имя',
                        neverShow: 'Никогда не показывать регистрацию'
                    }
                }
            }
        },
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
