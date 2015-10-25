namespace Utils {
    export function mapToArray<K, V>(map: Map<K, V>): Array<[K, V]> {
        var arr: Array<[K, V]> = [];
        map.forEach((value: V, index: K, map: Map<K, V>) => {
            arr.push([index, value]);
        });

        return arr;
    }
}