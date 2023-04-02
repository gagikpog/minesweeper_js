import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GameLevels, IStatisticsItem } from '../game/types';
import { getStatisticByLevel } from '../game/service/getStatisticByLevel';
import { controller as DialogController } from '../dialog/dialogProvider';
import { Statistics } from '../components/dialogs/statistics';

export const loadStatistic = createAsyncThunk('statistic/load', ({level}: { level: GameLevels }) => {
    return getStatisticByLevel(level).then((data) => {
        return { [level]: data } as {[level in GameLevels]: IStatisticsItem[]};
    });
});

export const statisticSlice = createSlice({
    name: 'statistic',
    initialState: {
        beginner: [] as IStatisticsItem[],
        intermediate: [] as IStatisticsItem[],
        advanced: [] as IStatisticsItem[]
    },
    reducers: {
        showStatistics(state) {
            DialogController.open({
                id: 'statistics',
                props: {
                    modal: true
                },
                template: Statistics
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
