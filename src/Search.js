import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useRef } from 'react';
import './Search.css'
import { useNavigate } from 'react-router-dom';

const Search = (props) => {
    const TitleRef=useRef('')
    const DateRef=useRef('')
    const EndRef=useRef('')
    const navigate = useNavigate();

    const handleSearch = () => {
        console.log('Searching for events...')
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
            </div>
        </div>
    )
}

export default Search
