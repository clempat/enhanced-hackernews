import React from 'react'
import './index.css'
import Item from '../Item'
import useLiveFeed from '../../utils/useLiveFeed'

export default function List(): React.ReactElement {
    const [news] = useLiveFeed()

    return (
        <div className="List">
            {news.map((id, index) => (
                <Item position={index + 1} key={id} id={id} />
            ))}
        </div>
    )
}
