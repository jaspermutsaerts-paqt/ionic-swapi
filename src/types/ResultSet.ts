export interface ResultSet<Type> {
    count: number
    previous: string | null
    next: string | null
    results: Type[]
}
