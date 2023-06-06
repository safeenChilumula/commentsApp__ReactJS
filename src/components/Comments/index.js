import {Component} from 'react'
import {formatDistanceToNow} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    commentsList: [],
    name: '',
    comment: '',
  }

  onNameInput = event => {
    this.setState({
      name: event.target.value,
    })
  }

  onCommentInput = event => {
    this.setState({
      comment: event.target.value,
    })
  }

  onSubmit = event => {
    event.preventDefault()
    const {name, comment} = this.state
    if (name.length !== 0 && comment.length !== 0) {
      const newComment = {
        id: uuidv4(),
        userName: name,
        userComment: comment,
        time: formatDistanceToNow(new Date()),
        colour:
          initialContainerBackgroundClassNames[Math.floor(Math.random() * 7)],
        isLike: false,
      }
      this.setState(prevState => ({
        commentsList: [...prevState.commentsList, newComment],
        name: '',
        comment: '',
      }))
    }
  }

  onDeleteComment = id => {
    const {commentsList} = this.state
    const filteredCommentsList = commentsList.filter(
      eachItem => eachItem.id !== id,
    )
    this.setState(() => ({
      commentsList: filteredCommentsList,
    }))
  }

  onLikeBtn = id => {
    console.log('like')
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, isLike: !eachItem.isLike}
        }
        return eachItem
      }),
    }))
  }

  render() {
    const {commentsList, name, comment} = this.state
    return (
      <div className="bg-container">
        <h1 className="heading">Comments</h1>
        <div className="comment-header">
          <form onSubmit={this.onSubmit} className="user-comment-section">
            <p className="sub-heading">Say something about 4.0 Technologies</p>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={this.onNameInput}
              className="user-name"
            />
            <textarea
              type="textarea"
              value={comment}
              rows="7"
              cols="30"
              placeholder="Your Comment"
              onChange={this.onCommentInput}
              className="user-name user-comment"
            />
            <button className="button" type="submit">
              Add Comment
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
            className="comment-img"
          />
        </div>
        <hr className="hr-line" />
        <div className="comment-count-section">
          <p className="comment-count">{commentsList.length}</p>
          <p className="comment">Comments</p>
        </div>
        <ul className="ul-list-container">
          {commentsList.map(eachComment => (
            <CommentItem
              key={eachComment.id}
              onLikeBtn={this.onLikeBtn}
              onDeleteComment={this.onDeleteComment}
              eachComment={eachComment}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Comments
