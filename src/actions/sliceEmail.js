import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const EMAIL_LIST_URL = "https://flipkart-email-mock.now.sh/";
const EMAIL_BODY_URL = "https://flipkart-email-mock.now.sh/?id=";

const iniState = {
    emailList: {},
    emailTotal: 0,
    emailPage: 1,
    emailBody: ''
}

export const fetchEmailList = createAsyncThunk('fetchEmailList', async(pNo) => {
    const {data} = (await axios.get(EMAIL_LIST_URL+'?page='+pNo));
    if(data) return data;
    return undefined;
});

export const fetchEmailBody = createAsyncThunk('fetchEmailBody', async(id) => {
    const {data} = (await axios.get(EMAIL_BODY_URL+id));
    if(data) return data;
    return undefined;
})

const sliceEmail = createSlice({
    name: 'email', 
    iniState,
    reducers: {
        setEmailPage(state, action) {
            state.emailPage = action.payload;
        },
        setEmailBody(state, action) {
            state.emailBody = action.payload;
        }
    },
    extraReducers: builder => { 
        builder
        .addCase(fetchEmailList.fulfilled, (state, action) => {
            state.emailList = action.payload.list.map(obj=>{
                obj.from.name = obj.from.name[0].toUpperCase()+obj.from.name.slice(1);
                const dateObject = new Date(obj.date);
                const minutes = dateObject.getMinutes() + 1;
                const hours = dateObject.getHours() + 1;
                const minutesFormat = (minutes < 10) ? '0' + minutes:minutes;
                const hoursFormat = (hours < 10) ? '0' + hours:hours;
                const ampm = (dateObject.getHours() < 12) ? 'am' : 'pm';
                const month = ['01','02','03','04','05','06','07','08','09','10','11','12'];
                const formatedDate = dateObject.getDate()+'/'+month[dateObject.getMonth()]+'/'+dateObject.getFullYear()+' '+hoursFormat+':'+minutesFormat+ampm;
                obj.date = formatedDate;
                return obj;
            })
            state.emailIotal = action.payload.total;
        })
        .addCase(fetchEmailBody.fulfilled, (state, action) => {
            state.emailBody = (action.payload.body) ? action.payload.body : 'Error';
        })}
})

export const {setEmailBody, setEmailPage} = sliceEmail.actions;
export default sliceEmail.reducer;