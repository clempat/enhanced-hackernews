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
    const [failed, setFailed] = useState(false)

    const [isVisible] = useIntersectionObserver({
        elementRef: itemRef,
        freezeOnceVisible: Boolean(item),
    })

    useEffect(
        function loadItem() {
            if (!isVisible) return
            void fetchItemById(id)
                .then(function success(item) {
                    setItem(item)
                    setFailed(false)
                })
                .catch(function failed() {
                    setFailed(true)
                })
        },
        [setItem, id, isVisible],
    )

    // Write a message if no item
    if (!item) {
        return (
            <div className={`Item ${isVisible ? '' : 'Item--hidden'}`} ref={itemRef}>
                {position && (
                    <div className="Item__position">
                        <div className="Item__position__Circle">{position}</div>
                    </div>
                )}
                <div className="Item__content">
                    <div className="Item__title disabled">
                        {failed ? 'Check your Network !' : 'Loading...'}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="Item">
            {position && (
                <div className="Item__position">
                    <div className="Item__position__Circle">{position}</div>
                </div>
            )}
            <div className="Item__content">
                <div className={`Item__title ${item.url ? '' : 'disabled'}`}>
                    {item.url ? <a href={item.url}>{item.title}</a> : item.title}
                </div>
                <div className="Item__detail">
                    {item.url ? (
                        <div className="Item__hostname">{new URL(item.url).hostname}</div>
                    ) : (
                        <div className="Item__hostname">No Link</div>
                    )}
                    <div className="Item__time_author">
                        <span>{getDiffText(item.time, Date.now() / 1000)} ago</span>{' '}
                        <span>by {item.by}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
