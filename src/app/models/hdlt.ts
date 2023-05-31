export interface StatusType {
    id: string;
    name: string;
}

export interface Status {
    id: string;
    type: StatusType;
    name: string;
    date: Date;
    completed: boolean;
    username: string;
}