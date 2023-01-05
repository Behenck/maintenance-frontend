import dayjs from 'dayjs'

export function formatDate(date: string) {
  return dayjs(date).add(1, 'day').format('DD/MM/YYYY')
}
