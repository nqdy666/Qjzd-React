import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import config from '../config';
import moment from 'moment';
import 'moment/locale/zh-cn';

export default class TopicDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      topic: {}
    };
  }

  componentDidMount() {
    this.getTopic();
  }

  getTopic() {
    $.getJSON(`${config.apiUrl}/topic/${this.props.params.topicId}`, (ret) => {
      console.log(ret.data);
      this.setState({
        topic: ret.data
      });
    });
  }

  render() {
    console.log('render');
    const topic = this.state.topic;
    if (Object.keys(topic).length === 0) {
      return (<div>加载中,请稍后...</div>);
    }
    return (
      <div className="container">
        <div className="page-header">
          <h3>{topic.title}</h3>

          <p className="topic-message">
            <i className="fa fa-hand-pointer-o"></i>
            <span>{topic.visit_count}</span>
            &nbsp; <i className="fa fa-calendar" mg-l-5></i>
            <span>发表于{moment(topic.create_at).fromNow()}</span>
            &nbsp; <i className="fa fa-user mg-l-5"></i>
            作者{topic.author.loginname}
            &nbsp; <i className="fa fa-tablet mg-l-5"></i>
            来自{config.getTab(topic.tab).cnName}
          </p>
        </div>
        <div dangerouslySetInnerHTML={ { __html: topic.content } }></div>
        <div className="page-header">
          <h4>回复({topic.reply_count})</h4>
        </div>
        { topic.replies.length ? topic.replies.map((reply, index) => (
            <div key={index} className="media">
              <div className="media-left">
                <Link to={`/user/${reply.author.loginname}`}>
                  <img className="media-object" src={reply.author.avatar_url}
                    width="40" height="40" title={reply.author.loginname}
                  />
                </Link>
              </div>
              <div className="media-body">
                <span className="pull-right">
                    <i className="fa fa-thumbs-o-up"></i>{reply.ups.length}
                </span>
                <h5 className="media-heading">
                  <Link to={`/user/${reply.author.loginname}`}>{reply.author.loginname}</Link>
                  <span className="reply-date">发表于{moment(reply.create_at).fromNow()}</span>
                </h5>
                <div dangerouslySetInnerHTML={ { __html: reply.content } }></div>
              </div>
            </div>
          )
        ) : <div className="text-center">暂无回复</div>};
      </div>
    );
  }
}
