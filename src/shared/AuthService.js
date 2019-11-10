import cookie from 'js-cookie';


export const setUserCookie = (token, authUser) => {
    console.log(token);
    if (token && typeof(token) === "string" ) {
        let userInfo = {token : token};
        let user = JSON.parse(window.atob(token.split('.')[1]));
        userInfo.id = user.nameid;
        userInfo.username = user.unique_name;
        cookie.set("user", userInfo);
        authUser();
    }
    
}

export const getUserInfo = () => {
    const user = cookie.get("user") ? JSON.parse(cookie.get("user"))  : null;
    let {id , username} = user;
    return {id , username};
} 
export const logout = () => {
    cookie.remove("user");
}