import React from 'react'
import down from '../../images/down.svg'
import up from '../../images/up.svg'
import none from '../../images/none.png'

// добавить в проект иконки и импортировать
const downIcon = down
const upIcon = up
const noneIcon = none

export type SuperSortPropsType = {
    id?: string
    sort: string
    value: string
    onChange: (sort: string) => void
}

export const pureChange = (sort: string, down: string, up: string) => {
    if (sort === down) {
        return up
      }
      if (sort === up) {
        return ''
      }
      if (sort === '') {
        return down
      }
    
      return down
}

const SuperSort: React.FC<SuperSortPropsType> = ({sort, value, onChange, id = 'hw15'}) => {
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
        <span
            id={id + '-sort-' + value}
            onClick={onChangeCallback}
        >
            {/*сделать иконку*/}
            <img id={id + '-icon-' + sort} src={icon} alt="icon"/>

        </span>
    )
}

export default SuperSort