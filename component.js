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
      showComments: false,
      comments: [
        { id: 1, author: 'Morgan McCircuit', body: 'Great picture!' },
        { id: 2, author: 'Bender Bending Rodriguez', body: 'Bite my shiny metal ass!'},
        { id: 3, author: 'Anne Droid', body: 'I want to know what love is...' }
      ]
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
        <CommentForm addComment={this._addComment.bind(this)} />
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
    return this.state.comments.map((comment) => {
      return(
        <Comment author={comment.author} body={comment.body} key={comment.id} />
      );
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

  _addComment(author, body) {
    const comment = {
      id: this.state.comments.length + 1,
      author,
      body
    };
    this.setState({comments: this.state.comments.concat([comment])});
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

class CommentForm extends React.Component {
  render() {
    return(
      <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
        <label>Join the discussion</label>
        <div className="comment-form-fields">
          <input placeholder="Name:" ref={(input) => this._author = input}/>
          <textarea placeholder="Comment:"
            ref={(textarea) => this._body = textarea}
            onKeyUp={this._getCharacterCount.bind(this)}>
          </textarea>
        </div>
        <div className="comment-form-actions">
          <button type="submit">
            Post comment
          </button>
        </div>
      </form>
    )
  }

  _handleSubmit(event) {
    event.preventDefault();

    if (!this._author.value || !this._body.value) {
      alert("Please enter your name and comment");

      return
    }

    let author = this._author;
    let body = this._body;

    this.props.addComment(author.value, body.value);
  }

  _getCharacterCount() {
    this.setState({
      characters: this._body.value.length
    });
  }
}

ReactDOM.render(
  <CommentBox />, document.getElementById('story-app')
);
