

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
}

export enum SortType {
    ASC = 'ascending',
    DESC = 'descending'
}
