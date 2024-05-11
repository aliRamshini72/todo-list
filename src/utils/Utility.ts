

const options: any = {
    hour12: false,
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    weekday: "short"
}
export class Utility {
    public static generateUniqueId  () : string  {
        return Math.ceil(Math.random() * Date.now()).toPrecision(16).toString().replace(".", "")
    }
    public static formatDate (time : number) : string {
        return new Intl.DateTimeFormat('en', options).format(new Date(time))
    }
}