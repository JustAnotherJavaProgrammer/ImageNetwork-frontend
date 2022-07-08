export function focus(id: string) {
    return () =>
        document.getElementById(id)?.focus();
}