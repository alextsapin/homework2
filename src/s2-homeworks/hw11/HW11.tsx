import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import s from './HW11.module.css'
import s2 from '../../s1-main/App.module.css'
import { restoreState } from '../hw06/localStorage/localStorage'
import SuperRange from './common/c7-SuperRange/SuperRange'

/*
* 1 - передать значения в оба слайдера
* 2 - дописать типы и логику функции change
* 3 - сделать стили в соответствии с дизайном
* */

const CustomSlider = styled(SuperRange)({
    margin: '0 15px',
    color: '#8B8B8B',
    height: 4,
    width: 160,
    padding: '13px 0',
    position: 'relative',
    left: -5,
    '& .MuiSlider-thumb': {
        height: 18,
        width: 18,
        background: 'white',
        border: '1px solid #00CC22',
        '&:after': {
            display: 'block',
            height: 6,
        },
        '&:hover': {
            boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
        },
        '& .airbnb-bar': {
            height: 9,
            width: 1,
            backgroundColor: 'currentColor',
            marginLeft: 1,
            marginRight: 1,
        },
    },
    '& .MuiSlider-track': {
        height: 3,
    },
    '& .MuiSlider-rail': {
        color: '#00CC22',
        opacity: 1,
        height: 3,
    },
});

function HW11() {
    // for autotests // не менять // можно подсунуть в локалСторэдж нужные числа, чтоб увидеть как они отображаются
    const [value1, setValue1] = useState(restoreState<number>('hw11-value1', 0))
    const [value2, setValue2] = useState(restoreState<number>('hw11-value2', 100))

    const change = (event: Event, newValue: number | number[]) => {
        // пишет студент // если пришёл массив - сохранить значения в оба useState, иначе в первый
        if(Array.isArray(newValue)) {
            setValue1(newValue[0])
            setValue2(newValue[1])
        } else {
            setValue1(newValue)
        }
    }

    return (
        <div id={'hw11'} className="container">
            <div className={s2.hwTitle}>Homework #11</div>

            <div className={s2.hw}>
                <div className={s.container}>
                    <div className={s.wrapper}>
                        <span id={'hw11-value'} className={s.number}>{value1}</span>
                        <CustomSlider
                            id={'hw11-single-slider'}
                            value={value1}
                            onChange={change}
                        />
                    </div>
                    <div className={s.wrapper}>
                        <span id={'hw11-value-1'} className={s.number}>{value1}</span>
                        <CustomSlider
                            id={'hw11-double-slider'}
                            value={[value1, value2]}
                            onChange={change}
                        />
                        <span id={'hw11-value-2'} className={s.number}>{value2}</span>
                    </div>
                </div>
            </div>
            <hr/>
        </div>
    )
}

export default HW11
