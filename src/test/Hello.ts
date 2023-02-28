export default function sum(...numbers: number[]) {
  return numbers.reduce((total, number) => (total += number), 0)
}
console.log(sum(2, 3, 10, 5, 0))
