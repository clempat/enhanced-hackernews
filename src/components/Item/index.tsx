import React, { useEffect, useState, useRef } from 'react'

import { fetchItemById, Item } from '../../utils/api'
import useIntersectionObserver from '../../utils/useIntersectionObserver'

interface Props {
    id: number
}

export default function ItemComponent({ id }: Props): React.ReactElement {
    const [item, setItem] = useState<Item>()
    const itemRef = useRef<HTMLDivElement | null>(null)

    const [isVisible] = useIntersectionObserver({ elementRef: itemRef, freezeOnceVisible: true })

    useEffect(
        function loadItem() {
            if (!isVisible) return
            void fetchItemById(id).then(setItem)
        },
        [setItem, id, isVisible],
    )

    if (!item) {
        return <div ref={itemRef}>Loading...</div>
    }

    return <div>{item.title}</div>
}
