export function getPropertyByPath(obj: any, pathString: string): string | number {
	return pathString.split('.').reduce((o, i: string) => o[i], obj);
}
