export class Post {
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public upvotesCount: number,
        public creationDate: Date,        
        public user: {
            id: number,
            name: string,
            email: string,
            teams:{
                id:number,
                name:string
            }
        },
        public teams:[]
    )
    {}
}
