import { useEffect, useState } from 'react'
import { fetchNews } from './api'

export default function useLiveFeed() {
    const [itemsId, setItemsId] = useState<Array<number>>([])

    useEffect(
        function init() {
            function updateItems(ids: Array<number>): void {
                const cursor = ids.indexOf(itemsId[0])
                // If still position 0 no need to update
                if (cursor === 0) return
                // If not found just save the all list
                if (cursor < 0) {
                    setItemsId(ids)
                    return
                }
                // Add one second in order to make sure the new items are available to fetch
                setTimeout(function () {
                    setItemsId([...ids.slice(0, cursor), ...itemsId])
                }, 1000)
            }

            function tick() {
                void fetchNews().then(updateItems)
            }

            tick()
            const autoUpdate = setInterval(tick, 10000)
            return () => {
                clearInterval(autoUpdate)
            }
        },
        [itemsId],
    )
    return [itemsId]
}
