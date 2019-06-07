export const updateObject = (oldObject, updatedValuesObject) => {
    return {
        ...oldObject,
        ...updatedValuesObject
    }
}