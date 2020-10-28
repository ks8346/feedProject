export class Post {
    constructor(
        public text : string,
        public userId: string,
        public comments:string[],
        public id:number
    )
    {}
}
