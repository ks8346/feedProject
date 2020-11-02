export class Proposal {
    constructor(
        public userId:string,
        public title:string,
        public text:string,
        public teams:[],
        public id?:number
    ){}
}
