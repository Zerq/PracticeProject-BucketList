/**
 * Basically this is a tiny little snippet i wrote inspired by the way JSX is handled
 * @param {string} tag html tag name
 * @param {*} attributes an object with key values representing the diffrent attributes and their values
 * @param  {HTMLElement|string} children child element or text content
 * @returns 
 */
export function Elm(tag, attributes, ...children) {
    let result = document.createElement(tag);
    if (attributes) {
        for (let attrName in attributes) {
            if (attrName.startsWith("on")) {
                result.addEventListener(attrName.substring(2).toLocaleLowerCase(), attributes[attrName]);
                continue;
            }
            result.setAttribute(attrName, attributes[attrName]);
        }
    }
    children?.forEach(n => {
        if (typeof n === "string") {
            n = document.createTextNode(n);
        }

        result.appendChild(n);
    });
    return result;
}
