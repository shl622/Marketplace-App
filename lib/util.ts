
//change value to USD
export function formatToUsd(price:number){
    return price.toLocaleString('en-US')
}

//changes Date format to how many days post was made
export function formatTime(date:string){
    const dayInMs = 1000 * 60 * 60 * 24 //ms in 1 day
    const time = new Date(date).getTime()
    const now = new Date().getTime()
    const diff = Math.round((time - now) / dayInMs)
    //use api to show n days ago
    const formatter = new Intl.RelativeTimeFormat("en")
    return formatter.format(diff, "days")
}