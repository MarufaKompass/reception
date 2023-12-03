import React, { useState } from 'react';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import { styled } from '@mui/material/styles';

const StyledTimePicker = styled(TimePicker)({
  '& .rc-time-picker-input': {
    width: '50vw',
    height: '40px',
    borderColor: '#12A9B2',
    fontSize: '15px'
  }
});

export default function Test() {
  const defaultTime = moment();
  const [selectedTime, setSelectedTime] = useState(defaultTime);

  const handleTimeChange = (value) => {
    setSelectedTime(value);
  };

  return (
    <div>
      <h1>Time Picker Example</h1>
      <StyledTimePicker showSecond={false} onChange={handleTimeChange} format="h:mm a" use12Hours defaultValue={defaultTime} />
      <p>Selected Time: {selectedTime && selectedTime.format('HH:mm')}</p>
    </div>
  );
}
