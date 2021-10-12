import initialState from "./initialState";

function UMCReducer(state = initialState, action) {
    switch (action.type) {
        case "login_action":
            return {
                ...state,
                auth: {
                    username: action.payload.username,
                    userId: action.payload.userID,
                    userRole: action.payload.userRole
                },
            };
            break;
        case "logout_action":
            return {
                ...state,
                auth: {
                    username: "",
                    userId: "",
                    userRole: ""
                },
                currentCourse: {},
                userDetails: {}
            };
            break;
        case "start_loading":
            return {
                ...state,
                loading_status: "loading"
            }
        case "finish_loading":
            return {
                ...state,
                loading_status: "finished"
            }
        case "populate_user_details":
            return {
                ...state,
                userDetails: action.payload
            }
        case "populate_all_courses":
            return {
                ...state,
                allCourse: action.payload
            }
        case "save_course":
            return {
                ...state,
                currentCourse: action.payload
            }
        default:
            return state

    }
}

export default UMCReducer;