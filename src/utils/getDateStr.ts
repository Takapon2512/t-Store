export const getDateStr = (date: string) => {
    return new Date(date).toLocaleDateString('ja-Jp', {
        timeZone: 'Asia/Tokyo'
    })
}