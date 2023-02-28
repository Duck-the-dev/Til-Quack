import sum from './Hello'

describe('#sum', () => {
  it('returns nothing if the array is empty', () => {
    expect(sum()).toBe(0)
  })
  it('returns the sum of numbers', () => {
    expect(sum(1, 2, 3, 4, 5, 6)).toBe(21)
    expect(sum(1, 2, 3, 4, 5, 0)).toBe(15)
    expect(sum(2, 3, 10, 5, 0)).toBe(20)
  })
  it('if user input one number', () => {
    expect(sum(1)).toBe(1)
  })
})
