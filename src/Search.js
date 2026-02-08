import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useRef, useState } from 'react';
import useAxios from 'axios-hooks'
import './Search.css'
import { useNavigate } from 'react-router-dom';

const Search = (props) => {
    const TitleRef=useRef('')
    const DateRef=useRef('')
    const EndRef=useRef('')
    const navigate = useNavigate();

    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5102";
    const [{ data, loading, error }, refetch] = useAxios(`${API_URL}/Event/123`)

    const handleSearch = () => {
        // Logic for searching events
        console.log('Searching for events...')
        // refetch();
        navigate('/')
    }

    return (
        <div className='search-container'>
            <div className='search-card'>
                <h1 className='search-title'>חיפוש אירועים</h1>
                <p className='search-subtitle'>חפש אירועים לפי תאריך וכותרת</p>
                
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <div className='search-form'>
                        <div className='form-group'>
                            <label className='form-label'>תאריך התחלה</label>
                            <DatePicker 
                                ref={DateRef} 
                                slotProps={{ textField: { fullWidth: true } }}
                            />
                        </div>

                        <div className='form-group'>
                            <label className='form-label'>תאריך סיום</label>
                            <DatePicker 
                                ref={EndRef} 
                                slotProps={{ textField: { fullWidth: true } }}
                            />
                        </div>

                        <div className='form-group'>
                            <label className='form-label'>כותרת האירוע</label>
                            <input 
                                type='text'
                                placeholder='הכנס כותרת אירוע...' 
                                ref={TitleRef}
                                className='form-input'
                            />
                        </div>

                        <button className='search-button' onClick={handleSearch}>
                            חפש אירועים
                        </button>
                    </div>
                </LocalizationProvider>

                {loading && <p className='status-message'>טוען...</p>}
                {error && <p className='status-message error'>שגיאה בחיפוש</p>}
            </div>
        </div>
    )
}

export default Search