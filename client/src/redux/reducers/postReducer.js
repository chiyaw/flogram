const initialState = {
    posts : [] 
}

export const postsReducer=(state=initialState , action)=>{
    switch(action.type){
        case 'GET_ALL_POSTS' : {
            return {
                ...state,
                posts : action.payload
            }
        }
        case 'UPDATE_POST_LIKES': {
            return {
                ...state,
                posts: state.posts.map(post => 
                    post._id === action.payload.postId 
                    ? { ...post, likes: action.payload.likes }
                    : post
                )
            }
        }
        default : return state
    }
}