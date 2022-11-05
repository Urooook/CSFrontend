export type userObjType = {
    user: string
    age: number
}

export const isAlphaAndNumericAndDollar = (str: string): boolean => /^[\w$]+$/g.test(str);

export const mySplit = (str: string): string[] => str.split(/[.,;]| +/g);

export const format = (str: string, userObj: userObjType): string => {
    return str.replace(/\$\{(\w+)}/g, (str1, $1) => {
        return userObj[$1] != null ? String(userObj[$1]) : str;
    })
}

export const shortString = (str: string) => {
    return str.replace(/(\w{1,3}?)\1+/g, (str1, $1) => {
        return $1
    })
}

export function calc(expression: string): string {
    return expression.replace(/[(\d\-][\d\+\-\*\/\(\) ]+[\d)]/mig, (...args) => {
            return Function('', `return ${args[0]}`)()
        }
    )
}
