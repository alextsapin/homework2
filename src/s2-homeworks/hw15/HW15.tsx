/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react'
import s2 from '../../s1-main/App.module.css'
import s from './HW15.module.css'
import axios from 'axios'
import SuperPagination from './common/c9-SuperPagination/SuperPagination'
import {useSearchParams} from 'react-router-dom'
import SuperSort from './common/c10-SuperSort/SuperSort'
import spinner from './images/spinner.svg'

/*
* 1 - дописать SuperPagination
* 2 - дописать SuperSort
* 3 - проверить pureChange тестами
* 3 - дописать sendQuery, onChangePagination, onChangeSort в HW15
* 4 - сделать стили в соответствии с дизайном
* 5 - добавить HW15 в HW5/pages/JuniorPlus
* */

type TechType = {
    id: number
    tech: string
    developer: string
}

type ParamsType = {
    sort: string
    page: number
    count: number
}

const getTechs = (params: ParamsType) => {
    return axios
        .get<{ techs: TechType[], totalCount: number }>(
            'https://samurai.it-incubator.io/api/3.0/homework/test3',
            {params}
        )
        .catch((e) => {
            alert(e.response?.data?.errorText || e.message)
        })
}

const HW15 = () => {
    const [sort, setSort] = useState('')
    const [page, setPage] = useState(1)
    const [count, setCount] = useState(4)
    const [idLoading, setLoading] = useState(false)
    const [totalCount, setTotalCount] = useState(100)
    const [searchParams, setSearchParams] = useSearchParams()
    const [techs, setTechs] = useState<TechType[]>([])

    const sendQuery = (params: any) => {
        setLoading(true)
        getTechs(params)
            .then((res) => {
                // делает студент 
                // console.log(res?.data)
                const techs = res?.data.techs
                const totalCount = res?.data.totalCount
    
                // сохранить пришедшие данные
                if(techs) {
                    setTechs(techs)
                }
    
                if(totalCount) {
                    setTotalCount(totalCount)
                }
            })
            .finally(function () {
                setLoading(false)
            })
    }

    const onChangePagination = (newPage: number, newCount: number) => {
        // делает студент
        setPage(newPage)
        setCount(newCount)

        sendQuery({page: newPage})
        // setSearchParams(

        //
    }

    const onChangeSort = (newSort: string) => {
        // делает студент

        setSort(newSort)

        // при сортировке сбрасывать на 1 страницу
        setPage(1)

        sendQuery({sort: newSort})
        // setSearchParams(

        //
    }

    useEffect(() => {
        const params = Object.fromEntries(searchParams)
        sendQuery({page: params.page, count: params.count})
        setPage(+params.page || 1)
        setCount(+params.count || 4)
    }, [])

    const mappedTechs = techs.map(t => (
        <tr key={t.id} className={s.row}>
            <td id={'hw15-tech-' + t.id} className={s.tech}>
                {t.tech}
            </td>

            <td id={'hw15-developer-' + t.id} className={s.developer}>
                {t.developer}
            </td>
        </tr>
    ))

    return (
        <div id={'hw15'} className="container">
            <div className={s2.hwTitle}>Homework #15</div>
            <div className="row">
                {idLoading 
                ? <div id={'hw15-loading'} className={s.loading}><img src={spinner} alt="spinner"/></div>
                : <div className="col-xl-6">
                    <SuperPagination
                        page={page}
                        itemsCountForPage={count}
                        totalCount={totalCount}
                        onChange={onChangePagination}
                    />
                    <table className="table mt-4">
                        <thead className="table-light">
                            <tr>
                                <td className={s.techHeader}>
                                    tech
                                    <SuperSort sort={sort} value={'tech'} onChange={onChangeSort}/>
                                </td>

                                <td className={s.developerHeader}>
                                    developer
                                    <SuperSort sort={sort} value={'developer'} onChange={onChangeSort}/>
                                </td>
                            </tr>
                        </thead>
                        <tbody>{mappedTechs}</tbody>
                    </table>
                </div>
                }
            </div>
        </div>
    )
}


export default HW15
