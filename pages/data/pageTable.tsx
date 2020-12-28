import React, { useCallback, useEffect, useState } from 'react';

interface Props {
    dataNum: any
    hi: any
    dataRender: any,
    // test: any,
}
const PageTable = (props: Props) => {
    // const test = props.test;
    var dataNum = props.dataNum;
    const [pagePerNum, setPagePerNum] = useState<any>(3);
    const [hi,setHi] = useState([]);
    useEffect(()=> {
        setHi(props.hi)
    })
    const hihi = hi.length;
    const pageNumAll = Math.ceil(hihi / pagePerNum);
    const [pageCurr, setPageCurr] = useState<any>('1');
    const lastIndexPerP = pageCurr * pagePerNum;
    const firstIndexPerp = lastIndexPerP - pagePerNum;
    const dataDisplay = hi.slice(firstIndexPerp, lastIndexPerP);
    const pageCrrUp: any = pageCurr - -1;
    const PageCrrDown: any = pageCurr - 1;
    useEffect(() => {
        props.dataRender(dataDisplay)
    }, [pageCurr, pagePerNum,hi])
    return (
        <>
            <div className="divPageNum">
                <span
                    className='allPage '
                >
                    All page: {hi.length}
                </span>
                <span
                    className='allPage '
                >
                    <label >number per pages: </label>
                    <select onChange={
                        (e) => { setPagePerNum(e.target.value); setPageCurr('1') }
                    }>
                        <option value={3} >3</option>
                        <option value={5} >5</option>
                        <option value={10} >10</option>
                        <option value={15} >15</option>
                    </select>
                </span>
                <span
                >
                    <input
                        type="button"
                        disabled={pageCurr <= 1}
                        onClick={() => { setPageCurr(pageCurr - 1) }}
                        value="privous"
                    ></input>
                </span>
                {PageCrrDown === 0 ? '' : <span
                    className={'pageNum'}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setPageCurr(pageCurr - 1)}
                    id={PageCrrDown}
                >
                    {PageCrrDown}
                </span>}
                <span
                    className='pageNum pageCrr'
                    style={{ cursor: 'pointer ' }}
                    // onClick={handlePageChange}
                    id={pageCurr}
                >
                    {pageCurr}
                </span>
                {
                    (pageNumAll < pageCrrUp) ? '' :
                        <span
                            className='pageNum'
                            style={{ cursor: 'pointer' }}
                            onClick={() => { setPageCurr(pageCurr - -1) }}
                            id={pageCrrUp}
                        >
                            {pageCrrUp}
                        </span>
                }
                <span
                >
                    <input
                        type="button"
                        disabled={pageNumAll <= pageCurr}
                        // disabled={isNext || numberCurrent >= pageNumber}
                        onClick={() => { setPageCurr(pageCurr - -1) }}
                        value="next"
                    ></input>
                </span>
            </div>
        </>
    );
}
export default PageTable;