import React, { useEffect, useState, useRef } from 'react'
import './index.css'
import { fetchItemById, Item } from '../../utils/api'
import useIntersectionObserver from '../../utils/useIntersectionObserver'
import { getDiffText } from '../../utils/time'

interface Props {
    id: number
    position?: number
}

export default function ItemComponent({ id, position }: Props): React.ReactElement | null {
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
        return (
            <div className="Item" ref={itemRef}>
                Loading...
            </div>
        )
    }

    return (
        <div className="Item">
            {position && (
                <div className="Position">
                    <div className="Position__Circle">{position}</div>
                </div>
            )}
            <div className="Content">
                <div className="Title">
                    {item.url ? <a href={item.url}>{item.title}</a> : item.title}
                </div>
                <div className="Detail">
                    {item.url ? (
                        <div className="Hostname">{new URL(item.url).hostname}</div>
                    ) : (
                        <div className="Hostname">No Link</div>
                    )}
                    <div className="TimeAuthor">
                        <span>{getDiffText(item.time, Date.now() / 1000)} ago</span>{' '}
                        <span>by {item.by}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
