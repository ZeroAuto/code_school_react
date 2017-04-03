// JSX is Not a string

// 'class' is a reserved in Javascript
// so JSX has a different way to express
// HTML class attributes

// Any code written in curly braces {} is interpreted as literal Javascript

// elements in upper camel case are rendered as react components

class StoryBox extends React.Component {
  render() {
    const now = new Date();

    const topicsList = ["HTML", "Javascript", "React"];

    return(
      <div>
        <h1>Stories App</h1>
        <p className="lead">Current Time: {now.toTimeString()}</p>

        <ul>
          {topicsList.map( topic => <li>{topic}</li> )}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(
  <StoryBox />, document.getElementById('story-app')
);
