

export enum TodoStatusEnum {
    ACTIVE= 'active' ,
    COMPLETED = 'completed'
}


export interface TodoModel {
    id : string ,
    label : string ,
    desc : string ,
    status : TodoStatusEnum ,
    createAt : number ,
    // sort : number
}