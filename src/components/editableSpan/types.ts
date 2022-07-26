export type EditableSpanType = {
    title: string
    callback: (newTitle: string) => void
    disabled?: boolean
}