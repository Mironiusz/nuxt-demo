export const formatNumber = (value: number) => {
    return new Intl.NumberFormat("pl-PL").format(value)
}
