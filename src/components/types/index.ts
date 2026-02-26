


export type column<T> = {
    key: keyof T | string;
    header: string;
    render?: (item: T) => React.ReactNode
    className?: string
}