import React, { useEffect, useState } from 'react'
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
        <div>
            {itemsId.map((id) => (
                <Item key={id} id={id} />
            ))}
        </div>
    )
}
