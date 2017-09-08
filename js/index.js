"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_React$Component) {
  _inherits(Header, _React$Component);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Header.prototype.render = function render() {
    return React.createElement(
      "header",
      null,
      React.createElement(
        "h1",
        null,
        " FreeCodeCamp Leaderboard "
      )
    );
  };

  return Header;
}(React.Component);

//The column headings

var TableHeadings = function (_React$Component2) {
  _inherits(TableHeadings, _React$Component2);

  function TableHeadings() {
    _classCallCheck(this, TableHeadings);

    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
  }

  TableHeadings.prototype.render = function render() {
    return React.createElement(
      "thead",
      null,
      React.createElement(
        "tr",
        { id: "tableHeader" },
        React.createElement(
          "th",
          { id: "number" },
          "#"
        ),
        React.createElement(
          "th",
          { id: "profileHeader" },
          "User"
        ),
        React.createElement(
          "th",
          { id: "totalScore", onClick: this.props.handleClickTotal },
          "Total Score"
        ),
        React.createElement(
          "th",
          { id: "recentScore", onClick: this.props.handleClickRecent },
          "Score in Past 30 Days"
        )
      )
    );
  };

  return TableHeadings;
}(React.Component);

//renders the table after fetching data

var TableData = function (_React$Component3) {
  _inherits(TableData, _React$Component3);

  function TableData(props) {
    _classCallCheck(this, TableData);

    var _this3 = _possibleConstructorReturn(this, _React$Component3.call(this, props));

    _this3.state = {
      users: [],
      sortRecent: false
    };
    return _this3;
  }

  //makes initial request for FCC json data

  TableData.prototype.componentDidMount = function componentDidMount() {
    $.ajax({
      url: "https://fcctop100.herokuapp.com/api/fccusers/top/recent",
      dataType: "json",
      cache: false,
      success: function (data) {
        var users = data;
        this.setState({
          users: users
        });
      }.bind(this)
    });
  };

  //changes the table to be sorted by total points

  TableData.prototype.handleClickTotal = function handleClickTotal() {
    $.ajax({
      url: "https://fcctop100.herokuapp.com/api/fccusers/top/alltime",
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({
          users: data
        });
      }.bind(this)
    });
  };

  //changes the table to be sorted by recent points

  TableData.prototype.handleClickRecent = function handleClickRecent() {
    $.ajax({
      url: "https://fcctop100.herokuapp.com/api/fccusers/top/recent",
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({
          users: data
        });
      }.bind(this)
    });
  };

  TableData.prototype.render = function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(TableHeadings, {
        handleClickTotal: this.handleClickTotal.bind(this),
        handleClickRecent: this.handleClickRecent.bind(this)
      }),
      React.createElement(Users, { users: this.state.users })
    );
  };

  return TableData;
}(React.Component);

//returns a table row with user data

var Users = function (_React$Component4) {
  _inherits(Users, _React$Component4);

  function Users() {
    _classCallCheck(this, Users);

    return _possibleConstructorReturn(this, _React$Component4.apply(this, arguments));
  }

  Users.prototype.render = function render() {
    return React.createElement(
      "tbody",
      null,
      this.props.users.map(function (user, index) {
        return React.createElement(
          "tr",
          null,
          React.createElement(
            "td",
            { className: "position" },
            index + 1
          ),
          React.createElement(
            "td",
            { className: "profileImgBox" },
            React.createElement("img", { className: "profileImg", src: user.img }),
            " ",
            user.username,
            " "
          ),
          React.createElement(
            "td",
            { className: "allTimeScore" },
            " ",
            user.alltime,
            " "
          ),
          React.createElement(
            "td",
            { className: "recentScore" },
            " ",
            user.recent,
            " "
          )
        );
      })
    );
  };

  return Users;
}(React.Component);

//renders project in its entirety

var App = function (_React$Component5) {
  _inherits(App, _React$Component5);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, _React$Component5.apply(this, arguments));
  }

  App.prototype.render = function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(Header, null),
      React.createElement(
        "table",
        { className: "fullTable table" },
        React.createElement(TableData, null)
      )
    );
  };

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById("root"));