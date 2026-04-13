

// use this function if payload has only text data (no file field)
export async function createRecord(collection, payload) {
    try {
        let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/${collection}`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        response = await response.json()
        return response
    } catch (error) {
        console.log(`Error While Creating Record in API Calling Service : ${error}`)
        return []
    }
}

// use this function if payload has form data (contains at least 1 file field)
export async function createMultipartRecord(collection, payload) {
    try {
        let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/${collection}`, {
            method: "POST",
            headers:{

            },
            body: payload
        })
        response = await response.json()
        return response
    } catch (error) {
        console.log(`Error While Creating Record in API Calling Service : ${error}`)
        return []
    }
}


export async function getRecord(collection) {
    try {
        let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/${collection}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        response = await response.json()
        return response
    } catch (error) {
        console.log(`Error While Getting Record in API Calling Service : ${error}`)
        return []
    }
}

// use this function if payload has only text data (no file field)
export async function updateRecord(collection, payload) {
    try {
        let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/${collection}/${payload.id}`,
            {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(payload)
            }
        )
        response = await response.json()
        return response
    } catch (error) {
        console.log(`Error While updating Record in API Calling Service : ${error}`)
        return []
    }
}

// use this function if payload has form data (contains at least 1 file field)
export async function updateMultipartRecord(collection, payload) {
    try {
        let response = await fetch(
            `${import.meta.env.VITE_APP_BACKEND_SERVER}/${collection}/${payload.get("id")}`,
            {
                method: "PUT",
                body: payload
            }
        )
        response = await response.json()
        return response
    } catch (error) {
        console.log(`Error While updating Record in API Calling Service : ${error}`)
        return []
    }
}


export async function deleteRecord(collection, payload) {
    try {
        let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/${collection}/${payload.id}`,
            {
                method: "DELETE",
                headers: {
                    "content-type": "application/json"
                }
            }
        )
        response = await response.json()
        return response
    } catch (error) {
        console.log(`Error While Deleting Record in API Calling Service : ${error}`)
        return []
    }
}
 