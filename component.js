// JSX is Not a string

// 'class' is a reserved in Javascript
// so JSX has a different way to express
// HTML class attributes

// Any code written in curly braces {} is interpreted as literal Javascript

// elements in upper camel case are rendered as react components

class CommentBox extends React.Component {
  constructor() {
    super();

    this.state = {
      showComments: false
    }
  }

  render() {
    const comments = this._getComments();
    let commentNodes;
    let buttonText = "Show Comments";
    if (this.state.showComments) {
      commentNodes = <div className="comment-list">{comments}</div>;
      buttonText = "Hide Comments";
    }

    return(
      <div className="comment-box">
        <h3>Comments</h3>
        <h4 className="comment-count">
          {this._getCommentsTitle(comments.length)}
        </h4>
        <button onClick={this._handleClick.bind(this)}>{buttonText}</button>
        {commentNodes}
      </div>
    );
  }

  _handleClick() {
    this.setState({
      showComments: !this.state.showComments
    })
  }

  _getComments() {
    const commentList = [
      { id: 1, author: 'Morgan McCircuit', body: 'Great picture!' },
      { id: 2, author: 'Bender Bending Rodriguez', body: 'Bite my shiny metal ass!'},
      { id: 3, author: 'Anne Droid', body: 'I want to know what love is...' }
    ]

    return commentList.map((comment) => {
      return (<Comment author={comment.author} body={comment.body} key={comment.id} />);
    });
  }

  _getCommentsTitle(commentCount) {
    if (commentCount === 0) {
      return 'No comments';
    } else if (commentCount === 1) {
      return 'One comment';
    } else {
      return `${commentCount} comments`;
    }
  }
}

class Comment extends React.Component {
  constructor() {
    super();
    this.state = {
      isAbusive: false
    }
  }
  render() {
    let commentBody;

    if (!this.state.isAbusive) {
      commentBody = this.props.body;
    } else {
      commentBody = <em>Content marked as abusive</em>;
    }

    return(
      <div className="comment">
        <p className="comment-header">{this.props.author}</p>
        <p className="comment-body">
          {commentBody}
        </p>
        <div className="comment-footer">
          <a href="#" className="comment-footer-delete">
            Delete Comment
          </a>
          <a href="#" onClick={this._toggleAbuse.bind(this)}>Report as Abuse</a>
        </div>
      </div>
    );
  }

  _toggleAbuse(event) {
    event.preventDefault();

    this.setState({
      isAbusive: !this.state.isAbusive
    })
  }
}

ReactDOM.render(
  <CommentBox />, document.getElementById('story-app')
);
