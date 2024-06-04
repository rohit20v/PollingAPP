export interface Poll{
    created_at: string,
    id: number,
    question: string,
    options: []
}
export interface Votes{
    created_at: string
    id: number
    option: string
    poll_id: number
    user_id: string
}

