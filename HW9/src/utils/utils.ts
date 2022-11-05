const fetchUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Moscow&appid=111836d36d452866f627599b193d2401&units=metric'

export const sleep = (delay: number): Promise<void> => {
    return new Promise<void>((resolve) => {
        setTimeout(resolve, delay)
    })
}

export const timeout = async (func: Promise<Response>, delay: number) => {
    const fetchPromise = new Promise((res) => {
       func.then((data) => res(data));
    })
    const timeOut = new Promise((_, reject) => {
        setTimeout(reject, delay);
    })
    return Promise.race([timeOut, fetchPromise]).then(console.log).catch(console.error)
}

