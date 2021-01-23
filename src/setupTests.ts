// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import { mockFetch } from '../tests/utils'

// Mock the Intersection Observer
jest.mock('./utils/useIntersectionObserver', () => () => [true])

// Mock API calls
global.fetch = jest.fn(() => mockFetch({}))
