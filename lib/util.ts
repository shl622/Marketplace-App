
//change value to USD
export function formatToUsd(price:number){
    return price.toLocaleString('en-US')
}

//changes Date format to how many days post was made
export function formatTime(date:string){
    //60000ms in 1 day
    const dayInMs = 60000 * 60 * 24 
    const hourInMs = 60000 * 60
    const minInMs = 60000
    const time = new Date(date).getTime()
    const now = new Date().getTime()
    const formatter = new Intl.RelativeTimeFormat("en")
    const diff = Math.round((time - now) / dayInMs)
    if (diff == 0){
        const hrdiff = Math.round((time-now)/hourInMs)
        if(hrdiff == 0){
            const mindiff = Math.round((time-now)/minInMs)
            return formatter.format(mindiff,"minutes")
        }
        return formatter.format(hrdiff, "hours")
    }
    else{
        return formatter.format(diff, "days")
    }
}
