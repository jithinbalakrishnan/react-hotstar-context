const getUserAPI = (userName, password) => {
    return new Promise((resolve, reject)=> {
        if(userName) {
            resolve({userName: userName})
        } else {
            reject("Something went wrong")
        }
    })
}

export {
    getUserAPI
}