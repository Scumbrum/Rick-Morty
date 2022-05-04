import { DISLIKE, LIKE } from "./config";

export default function LikeControlls({likeHandler, dislikeHandler, status, character}) {

    return (
        <div className="row justify-content-center gx-4 mt-4">
            <button className={"btn btn-outline-success col-md-2 col-5 me-2 " + (status === LIKE ? "active" : "")} 
            onClick={(e) => likeHandler(e, character)}>
                Like
            </button>
            <button className={"btn btn-outline-danger col-md-2 col-5 me-2 " + (status === DISLIKE ? "active" : "")} 
            onClick={(e) => dislikeHandler(e, character)}>
                Dislike
            </button>
        </div>
    )
}