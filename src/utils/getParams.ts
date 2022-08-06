export type Data = {
    [index: string]: string | number | boolean
}

export default function getParams(data: Data): string {
    const query: string[] = [];
        for (let key in data) {
            query.push(`${key}=${data[key]}`);
        } 
    return query.join("&")
}