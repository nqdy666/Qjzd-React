import React from 'react';
import { Link } from 'react-router';
import config from '../config';
import $ from 'jquery';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

class Label extends React.Component {
  render() {
    const data = this.props.data;
    if (data.top) {
      return <label className="label label-success">置顶</label>;
    }
    if (data.good) {
      return <label className="label label-success">精华</label>;
    }
    return <label className="label label-default">{config.getTab(data.tab).cnName}</label>;
  }
}

class TabLink extends React.Component {
  render() {
    return (
      <Link {...this.props} activeClassName="active" />
    );
  }
}

export default class Topics extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      data: [],
      tab: this.props.params.tab ? this.props.params.tab : 'all'
    };
  }

  componentWillMount() {
    console.log('componentWillMount');
  }

  componentDidMount() {
    console.log('componentDidMount');

    this.getTopics();
    let loading = false;
    $(window).on('scroll', () => {
      const fromBottom = $(document).height() - $(window).height() - $(window).scrollTop();
      if (fromBottom <= 10 && !loading) {
        loading = true;
        this.getTopics(() => {
          loading = false;
        });
      }
    });
  }

  componentWillReceiveProps(prevProps) {
    console.log(`componentWillReceiveProps, nextTab:${prevProps.params.tab}`);
    this.getTopics(null, prevProps.params.tab);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate');
    return this.state !== nextState;
  }

  componentWillUpdate() {
    console.log('componentWillUpdate');
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    $(window).unbind('scroll');
  }

  getTopics(callback, newTab) {
    let { tab, page, data } = this.state;
    if (newTab) {
      tab = newTab;
      page = 1;
      data = [];
    }
    $.getJSON(`${config.apiUrl}/topics`, {
      page,
      tab
    }, (ret) => {
      this.setState({
        page: page + 1,
        tab,
        data: data.concat(ret.data)
      }, () => {
        console.log(`tab:${this.state.tab}:state:
          ${this.state.data.length}:page:${this.state.page}`);
        if ($.isFunction(callback)) {
          callback();
        }
      });
    });
  }

  render() {
    console.log(`render,state:${this.state.data.length}`);
    return (
      <div className="container">
        <ul className="nav nav-tabs">
          <li>
            <TabLink to="/topics/all" className={!this.props.params.tab ? 'active' : ''}>
              全部
            </TabLink>
          </li>
          <li><TabLink to="/topics/good">精华</TabLink></li>
          {
            config.tabJson.map((tab, index) =>
            (
              <li key={index}>
                <TabLink to={`/topics/${tab.name}`}>{tab.cnName}</TabLink>
              </li>
            )
          )}
        </ul>
        {
          this.state.data.map((item) =>
          (
            <div key={item.id} className="media">
              <div className="media-left">
                <Link property="" to={`/user/${item.author.loginname}`}>
                  <img className="media-object" src={item.author.avatar_url}
                    width="40" height="40" title={item.author.loginname}
                  />
                </Link>
              </div>
              <div className="media-body">
                <h4 className="media-heading">
                  <Label data={item} />
                  <Link topicId={item.id} to={`/topic/${item.id}`}>{item.title}</Link>
                </h4>
                <p className="media-count">
                  <i className="fa fa-hand-pointer-o"></i>{item.visit_count}
                  <i className="fa fa-comment mg-l-5"></i>{item.reply_count}
                  <i className="fa fa-calendar mg-l-5"></i>发表于{moment(item.create_at).fromNow()}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    );
  }
}
