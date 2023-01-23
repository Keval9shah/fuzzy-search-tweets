export type SearchResult = {
    title:string,
    description: string,
    indexes: number[],
    wholeWordsFound: number
}

export type CardType = {
    title:string,
    description: string,
}

export type ArrayOfStringObj = Record<any,string>[]