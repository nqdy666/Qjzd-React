import React from 'react';
import { Link } from 'react-router';
import config from '../config';
import $ from 'jquery';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

let Label = React.createClass({
  render() {
    var data = this.props.data;
    if (data.top) {
      return <label className="label label-success">置顶</label>;
    }
    if (data.good) {
      return <label className="label label-success">精华</label>;
    }
    return <label className="label label-default">{config.getTab(data.tab).cnName}</label>;
  }
});

let TabLink = React.createClass({
  render() {
    return (
      <Link {...this.props} activeClassName="active"/>
    );
  }
});

export default React.createClass({

  getInitialState() {
    return {
      page: 1,
      data: [],
      tab: this.props.params.tab
    };
  },

  getTopics(callback) {
    $.getJSON(config.apiUrl + '/topics', {
      page: this.state.page,
      limit: 10,
      tab: this.state.tab
    }, function (ret) {
      this.setState({
        page: this.state.page + 1,
        data: this.state.data.concat(ret.data)
      }, function () {
        console.log('tab:' + this.state.tab + ':state:' + this.state.data.length + ':page:' + this.state.page);
        if ($.isFunction(callback)) {
          callback();
        }

      }.bind(this));
    }.bind(this));
  },

  componentWillMount() {
    console.log('componentWillMount');
    this.getTopics();
  },

  componentDidMount() {
    console.log('componentDidMount');

    let loading = false;
    $(window).on('scroll', function () {
      let fromBottom = $(document).height() - $(window).height() - $(window).scrollTop();
      if (fromBottom <= 10 && !loading) {
        loading = true;
        this.getTopics(function () {
          loading = false;
        });
      }
    }.bind(this));
  },

  componentWillUpdate() {
    console.log('componentWillUpdate');


  },
  componentDidUpdate() {
    console.log('componentDidUpdate');
  },
  componentWillUnmount() {
    console.log('componentWillUnmount');
    $(window).unbind('scroll');
  },
  componentWillReceiveProps(prevProps) {
    console.log('componentWillReceiveProps, nextTab:' + prevProps.params.tab);
    this.state = {
      tab: prevProps.params.tab,
      page: 1,
      data: []
    };
    this.getTopics();
  },

  render() {
    console.log('render' + ',state:' + this.state.data.length);
    return (
      <div className="container">
        <ul className="nav nav-tabs">
          <li><TabLink to="/topics/all" className={!this.props.params.tab? 'active': ''}>全部</TabLink></li>
          <li><TabLink to="/topics/good">精华</TabLink></li>
          { config.tabJson.map((tab, index) => <li key={index}><TabLink
            to={'/topics/' + tab.name}>{tab.cnName}</TabLink></li>)}
        </ul>
        {this.state.data.map(function (item) {
          return (
            <div key={item.id} className="media">
              <div className="media-left">
                <Link property="" to={'/user/' + item.author.loginname}>
                  <img className="media-object" src={item.author.avatar_url}
                       width="40" height="40" title={item.author.loginname}/>
                </Link>
              </div>
              <div className="media-body">
                <h4 className="media-heading">
                  <Label data={item}/>
                  <Link topicId={item.id} to={'/topic/' + item.id}>{item.title}</Link>
                </h4>
                <p className="media-count">
                  <i className="fa fa-hand-pointer-o"></i>{item.visit_count}
                  <i className="fa fa-comment mg-l-5"></i>{item.reply_count}
                  <i className="fa fa-calendar mg-l-5"></i>发表于{moment(item.create_at).fromNow()}
                </p>
              </div>
            </div>
          );
        }.bind(this))}
      </div>
    );
  }
});