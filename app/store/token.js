export var state =() =>{
    token: ""
}
export const mutations ={
    SET_TOKEN(state,token){
        state.token = token;
        console.log(token)
    }
}