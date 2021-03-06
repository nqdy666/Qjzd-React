import path from 'path';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './app/routes';

const app = express();

app.use(express.static(path.join(__dirname, './public')));

const renderPage = appHtml =>
  `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <title>秦晋之巅社区</title>
          <meta charset="utf-8"/>
          <meta name="keywords" content="react nodejs"/>
          <link rel="icon" href="//dn-cnodestatic.qbox.me/public/images/cnode_icon_32.png"
              type="image/x-icon" />
          <link rel="stylesheet" href="/css/font-awesome.min.css"/>
          <link rel="stylesheet" href="/css/bootstrap.css"/>
          <link rel="stylesheet" href="/css/style.css" />
      </head>
      <body>
          <div id="app">${appHtml}</div>
          <script src="/bundle.js"></script>
      </body>
      </html>
  `;

app.get('*', (req, res) => {
  console.log(req.url);
  match({
    routes,
    location: req.url
  }, (err, redirect, props) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search);
    } else if (props) {
      const appHtml = renderToString(<RouterContext {...props} />);
      res.send(renderPage(appHtml));
    } else {
      res.status(404).send(`${req.url} Not Found`);
    }
  });
});

const port = 8080;
app.listen(port, () => {
  console.log(`The server is running at port: ${port}`);
});

