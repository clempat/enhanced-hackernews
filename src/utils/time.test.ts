import { getDiffInHours, getDiffInMinutes, getDiffText } from './time'

describe('Time', function () {
    it('should give difference in hours', function () {
        const from = +new Date('2021-01-01T12:00:00') / 1000
        const to = +new Date('2021-01-01T15:00:00') / 1000

        expect(getDiffInHours(from, to)).toBe(3)
    })

    it('should give difference in minutes', function () {
        const from = +new Date('2021-01-01T12:00:00') / 1000
        const to = +new Date('2021-01-01T12:30:00') / 1000

        expect(getDiffInMinutes(from, to)).toBe(30)
    })

    it('should give difference in minutes as string', function () {
        const from = +new Date('2021-01-01T12:00:00') / 1000
        const to = +new Date('2021-01-01T12:30:00') / 1000

        expect(getDiffText(from, to)).toBe('30 min')
    })

    it('should give difference in hours as string', function () {
        const from = +new Date('2021-01-01T12:00:00') / 1000
        const to = +new Date('2021-01-01T16:00:00') / 1000

        expect(getDiffText(from, to)).toBe('4 hours')
    })

    it('should display singular when one hour', function () {
        const from = +new Date('2021-01-01T12:00:00') / 1000
        const to = +new Date('2021-01-01T13:00:00') / 1000

        expect(getDiffText(from, to)).toBe('1 hour')
    })
})
