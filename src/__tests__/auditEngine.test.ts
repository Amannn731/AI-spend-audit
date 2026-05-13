import { describe, it, expect } from 'vitest'

function calcSavings(pricePerSeat: number, seats: number, recommendedPrice: number, recommendedSeats: number) {
  return (pricePerSeat * seats) - (recommendedPrice * recommendedSeats)
}

function isOverspending(utilisation: number, threshold = 0.7) {
  return utilisation < threshold
}

function annualSavings(monthlySavings: number) {
  return monthlySavings * 12
}

function getStatus(savings: number): string {
  return savings > 0 ? 'overspending' : 'optimal'
}

function capSavings(savings: number, totalSpend: number): number {
  return Math.min(savings, totalSpend)
}

describe('Audit Engine — seat savings', () => {
  it('calculates savings when downgrading plan', () => {
    expect(calcSavings(39, 1, 19, 1)).toBe(20)
  })
  it('returns zero savings when already on cheapest plan', () => {
    expect(calcSavings(10, 1, 10, 1)).toBe(0)
  })
  it('calculates savings across multiple seats', () => {
    expect(calcSavings(39, 5, 19, 5)).toBe(100)
  })
})

describe('Audit Engine — utilisation', () => {
  it('flags low utilisation as overspending', () => {
    expect(isOverspending(0.4)).toBe(true)
  })
  it('does not flag high utilisation', () => {
    expect(isOverspending(0.9)).toBe(false)
  })
  it('uses 70% as the threshold boundary', () => {
    expect(isOverspending(0.7)).toBe(false)
    expect(isOverspending(0.69)).toBe(true)
  })
})

describe('Audit Engine — annual projection', () => {
  it('multiplies monthly savings by 12', () => {
    expect(annualSavings(110)).toBe(1320)
  })
  it('returns zero for zero monthly savings', () => {
    expect(annualSavings(0)).toBe(0)
  })
})

describe('Audit Engine — status flags', () => {
  it('marks positive savings as overspending', () => {
    expect(getStatus(50)).toBe('overspending')
  })
  it('marks zero savings as optimal', () => {
    expect(getStatus(0)).toBe('optimal')
  })
})

describe('Audit Engine — savings cap', () => {
  it('caps savings at total spend', () => {
    expect(capSavings(500, 300)).toBe(300)
  })
  it('does not cap when savings are below total spend', () => {
    expect(capSavings(100, 300)).toBe(100)
  })
})