
export default function Pagination({callBack, count, currPage}) {

    return (
        <div>
            {generateTabs(currPage, callBack, Math.ceil(count / 20))}
        </div>
    )
}

function generateTabs(currPage, pageSetter, count) {
    const prev = fillPrevTabs(1, currPage - 1, pageSetter)
    const next = fillNextTabs(currPage + 1, count, pageSetter)
    const currTab = <span onClick={()=>pageSetter(currPage)} className="current">{currPage}</span>
    return [...prev, currTab, ...next]
    
}

function fillNextTabs(begin, end, pageSetter) {
    if(begin > end) {
        return []
    }
    const array =[]
    const swing = end - begin
    if(swing <= 3) {
        for(let i = 0; i <= swing; i ++) {
            array.push(<span onClick={()=>pageSetter(begin + i)}>{begin + i}</span>)
        }
    } else {
        for(let i = 0; i < 2; i ++) {
            array.push(<span onClick={() => pageSetter(begin + i)}>{begin + i}</span>)
        }
        array.push(<span className="other">...</span>)
        array.push(<span onClick={()=>pageSetter(end)}>{end}</span>)
    }
    return array
}

function fillPrevTabs(begin, end, pageSetter) {
    if(begin > end) {
        return []
    }
    const array =[]
    const swing = end - begin
    if(swing <= 3) {
        for(let i = 0; i <= swing; i ++) {
            array.push(<span onClick={()=>pageSetter(begin+ i)}>{begin + i}</span>)
        }
    } else {
        array.push(<span onClick={()=>pageSetter(begin)}>{begin}</span>)
        array.push(<span className="other">...</span>)
        for(let i = 0; i < 2; i ++) {
            array.push(<span onClick={() => pageSetter(end - 1 + i)}>{end - 1 + i}</span>)
        }
    }
    return array
}