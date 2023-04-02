import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GameLevels, IStatisticsItem } from '../game/types';
import { getStatisticByLevel } from '../game/service/getStatisticByLevel';
import { controller as DialogController } from '../dialog/dialogProvider';
import { saveStatistics } from '../game/service/saveStatistics';
import { IRegisterResult, Register } from '../components/dialogs/register';
import { loadUser } from './userSlice';
import { RootState } from '../store/main';

export const loadStatistic = createAsyncThunk('statistic/load', ({level}: { level: GameLevels }) => {
    return getStatisticByLevel(level).then((data) => {
        return { [level]: data } as {[level in GameLevels]: IStatisticsItem[]};
    });
});

export const addStatistic = (): Promise<boolean> => {
    return import('../store/main').then(({store}) => {
        const save = (store: RootState): Promise<boolean> => {
            const level = store.game.level;
            return saveStatistics(level, {
                date: '',
                name: store.user.username,
                time: `${store.timer.time}`
            });
        };
        const state = store.getState();

        if (state.user.username) {
            return save(state);
        } else {
            if (!state.user.neverShowRegistration) {
                return new Promise((resolve) => {
                    let resolved = false;
                    const onResolve = (val: boolean | Promise<boolean>) => {
                        if (!resolved) {
                            resolved = true;
                            resolve(val)
                        }
                    };
                    DialogController.open<IRegisterResult>( {
                        id: 'register',
                        props: {
                            modal: true,
                            handlers: {
                                onResult(res) {
                                    store.dispatch(loadUser({
                                        neverShowRegistration: res.neverShowRegistration,
                                        username: res.username
                                    }));

                                    if (!res.neverShowRegistration && res.username) {
                                        onResolve(save(store.getState()));
                                    }
                                },
                                onClose() {
                                    onResolve(false);
                                },
                            }
                        },
                        template: Register
                    });
                });
            } else {
                return false;
            }
        }
    });
};

export const statisticSlice = createSlice({
    name: 'statistic',
    initialState: {
        beginner: [] as IStatisticsItem[],
        intermediate: [] as IStatisticsItem[],
        advanced: [] as IStatisticsItem[]
    },
    reducers: {
        showStatistics(state) {
            import('../components/dialogs/statistics').then(({ Statistics }) => {
                DialogController.open({
                    id: 'statistics',
                    props: {
                        modal: true
                    },
                    template: Statistics
                });
            });
        },
        clearStatistic(state) {
            state.beginner = [];
            state.intermediate = [];
            state.advanced = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loadStatistic.fulfilled, (state, action) => {
            state.beginner = action.payload.beginner || state.beginner;
            state.intermediate = action.payload.intermediate || state.intermediate;
            state.advanced = action.payload.advanced || state.advanced;
        });
    }
});

export const { showStatistics, clearStatistic } = statisticSlice.actions;

export type TStatisticState = ReturnType<typeof statisticSlice.reducer>;
