import React from 'react'
import WithBar from '../../components/Bar/WithBar'
// import Papers from '../../components/Lists/Papers'
import dynamic from 'next/dynamic'
const Papers = dynamic(
    () => import('../../components/Lists/Papers'),
    { ssr: false }
)

const papers = () => {
    return (
        <WithBar>
            <Papers />
        </WithBar>
    )
}

export default papers
