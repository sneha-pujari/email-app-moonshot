import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    read: [],
    fav: [],
    id: '',
    filter: ''
}

const sliceFilter = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        addRead(state, action) {
            if(!state.read.includes(action.payload)){
                state.read.push(action.payload)
            }
        },

        addFav(state, action) {
            if(!state.fav.include(action.payload)) {
                state.fav.push(action.payload)
            }
        },

        removeFav(state, action) {
            state.fav = state.fav.filter(fil => fil!==action.payload)
        },

        setState(state, action) {
            state.fav = action.payload.fav;
            state.read = action.payload.read;
        },

        setId(state, action) {
            state.id = action.payload;
        },

        setFilter(state, action) {
            state.filter = action.payload;
        }
    }
});
export const {addRead, addFav, removeFav, setState, setFilter, setId} = sliceFilter.actions;
export default sliceFilter.reducer;