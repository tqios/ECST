import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React, {useState} from 'react';

function Focus() {
    const Calendar = () => {
        const [selectedDate, setSelectedDate] = useState(new Date());

        return (
            <DatePicker
                dateFormat="yyyy.MM.dd" // 날짜 형태
                shouldCloseOnSelect={true} // 날짜를 선택하면 datepicker가 자동으로 닫힘
                minDate={new Date('2000-01-01')} // minDate 이전 날짜 선택 불가
                maxDate={new Date()} // maxDate 이후 날짜 선택 불가
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
            />
        );
    };

    return (
        <div>
            <div className="text-xl font-bold ml-6 mt-5">
                <h1>Learning Mate</h1>
            </div>

            <div className="bg-sky-200">
                <div className=" text-3xl font-bold ml-10 mt-4">
                    <h1>나의 집중 기록</h1>
                </div>
            </div>
            <div className="ml-10 mt-6">
                날짜 선택 :
                <Calendar/>
            </div>
        </div>
    );
}

export default Focus;