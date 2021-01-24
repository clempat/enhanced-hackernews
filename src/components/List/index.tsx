import React, { useEffect, useState } from 'react'
import './index.css'
import { fetchNews } from '../../utils/api'
import Item from '../Item'

export default function List(): React.ReactElement {
    const [itemsId, setItemsId] = useState<Array<number>>([])

    useEffect(
        function init() {
            void fetchNews().then(setItemsId)
        },
        [setItemsId],
    )

    return (
        <div className="List">
            {itemsId.map((id, index) => (
                <Item position={index + 1} key={id} id={id} />
            ))}
        </div>
    )
}
