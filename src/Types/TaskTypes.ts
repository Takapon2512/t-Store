export type TaskType = {
    id: string,
    title: string,
    state: string,
    year: string,
    month: string,
    date: string,
    comment: string
}

export type UserDataType = {
    user: string,
    Incompletes: TaskType[],
    Progresses: TaskType[],
    Completes: TaskType[]
}