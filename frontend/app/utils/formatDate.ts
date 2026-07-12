export const formatDate = (value: string) => {
    return new Intl.DateTimeFormat("pl-PL", {
        dateStyle: "long",
        timeStyle: "medium",
    }).format(new Date(value))
}
