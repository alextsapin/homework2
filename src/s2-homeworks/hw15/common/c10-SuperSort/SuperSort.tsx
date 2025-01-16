import React from 'react'
import down from '../../images/down.svg'
import up from '../../images/up.svg'
import none from '../../images/none.png'
import s from '../../HW15.module.css'

// добавить в проект иконки и импортировать
const downIcon = down
const upIcon = up
const noneIcon = none

export type SuperSortPropsType = {
    id?: string
    sort: string
    value: string
    title?: string
    onChange: (sort: string) => void
}

export const pureChange = (sort: string, down: string, up: string) => {
    switch(sort) {
        case down: {
            return up
        }
        case up: {
            return ''
        }
        case '': {
            return down
        }
        default: {
            return down
        }
    }
}

const SuperSort: React.FC<SuperSortPropsType> = ({sort, value, title, onChange, id = 'hw15'}) => {
    const up = '0' + value
    const down = '1' + value

    const onChangeCallback = () => {
        onChange(pureChange(sort, down, up))
    }

    const icon = sort === down
        ? downIcon
        : sort === up
            ? upIcon
            : noneIcon

    return (
        <td className={s.header} onClick={onChangeCallback}>
            {title}
            <span id={id + '-sort-' + value}>
                <img id={id + '-icon-' + sort} src={icon} alt="icon"/>
            </span>
        </td>
    )
}

export default SuperSort
