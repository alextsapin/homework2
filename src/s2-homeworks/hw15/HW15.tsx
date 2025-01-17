/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react'
import s2 from '../../s1-main/App.module.css'
import s from './HW15.module.css'
import axios from 'axios'
import SuperPagination from './common/c9-SuperPagination/SuperPagination'
import {useSearchParams} from 'react-router-dom'
import SuperSort from './common/c10-SuperSort/SuperSort'
import spinner from './images/loading.png'

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
            .then((res: any) => {
                // делает студент 
                setTechs(res.data.techs)
                setTotalCount(res.data.totalCount)   
            })
            .finally(function () {
                setLoading(false)
            })
    }

    const onChangePagination = (newPage: number, newCount: number) => {
        setPage(newPage)
        setCount(newCount)
        sendQuery({sort: sort, page: newPage, count: newCount});
        setSearchParams({sort: sort, page: newPage.toString(), count: newCount.toString()})
    }

    const onChangeSort = (newSort: string) => {
        setPage(1)
        setSort(newSort)
        sendQuery({sort: newSort, page: page, count: count});
        setSearchParams({sort: newSort, page: page.toString(), count: count.toString()})
    }

    const reset = () => {
        setPage(1)
        setSort('')
        setCount(4)
        sendQuery({sort: '', page: 1, count: 4});
        setSearchParams({sort: '', page: (1).toString(), count: (4).toString()})
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
            <div className={s.wrapper + ' row'}>
                {idLoading 
                ? <div id={'hw15-loading'}><img className={s.loading} src={spinner} alt="spinner"/></div>
                : <div className="col-xl-7">
                    <SuperPagination
                        page={page}
                        itemsCountForPage={count}
                        totalCount={totalCount}
                        onChange={onChangePagination}
                    />
                    <table className="table mt-4">
                        <thead className="table-light">
                            <tr>
                                <SuperSort title='Tech' sort={sort} value='tech' onChange={onChangeSort}/>
                                <SuperSort title='Developer' sort={sort} value='developer' onChange={onChangeSort}/>
                            </tr>
                        </thead>
                        <tbody>{mappedTechs}</tbody>
                    </table>
                    <button className='btn btn-danger mt-3' onClick={reset}>RESET</button>
                </div>
                }
            </div>
            <hr/>
        </div>
    )
}

export default HW15
