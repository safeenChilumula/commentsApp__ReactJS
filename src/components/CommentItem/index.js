import './index.css'

const CommentItem = props => {
  const {eachComment, onDeleteComment, onLikeBtn} = props
  const {id, userName, userComment, time, isLike, colour} = eachComment
  console.log(colour, id)

  const onLike = () => {
    onLikeBtn(id)
  }

  const onDeleteBtn = () => {
    onDeleteComment(id)
  }

  const listBtnStyle = isLike
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const likeText = isLike ? 'liked-text' : ''

  return (
    <li className="list-container">
      <div className="name-time-container">
        <div className={`profile ${colour}`}>
          <p className="profile-name">{userName[0]}</p>
        </div>
        <p className="name">{userName}</p>
        <p className="time">{time}</p>
      </div>
      <p className="comment-text">{userComment}</p>
      <div className="like-delete">
        <div className="like-container">
          <button onClick={onLike} type="button" className="like-button">
            <img src={listBtnStyle} alt="like" className="like-img" />
          </button>

          <p className={`like-text ${likeText}`}>Like</p>
        </div>
        <button
          data-testid="delete"
          onClick={onDeleteBtn}
          type="button"
          className="like-button"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="delete"
            onClick={onDeleteBtn}
          />
        </button>
      </div>
      <hr className="hr-line" />
    </li>
  )
}

export default CommentItem
