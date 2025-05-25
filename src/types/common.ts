export default interface QueryOptions {
    filter?: Record<string, any>
    sort?: Record<string, -1 | 1>
    limit?: number
    skip?: number
}
