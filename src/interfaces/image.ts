export enum Tag {
    food, travel, coffee, friends, school, sports
}

export interface IImage {
    title: string,
    description: string,
    link: string,
    tags: [string],
}
