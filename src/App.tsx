import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from './containers/home';
import { Login } from './containers/login';
import { Navbar } from './containers/navbar';
import { NotFoundPage } from './containers/not-found-page';
import { Signup } from './containers/signup';
import * as routes from './routes';
import { TopicPage } from './containers/topic-page';

export function App() {
  return (
    <>
      <Navbar />
      <main>
        <Switch>
          <Route path={routes.signupUrl} component={Signup} />
          <Route path={routes.loginUrl} component={Login} />
          <Route path={routes.topicUrl} component={TopicPage} />
          <Route path={routes.homeUrl} exact component={Home} />
          <Route component={NotFoundPage} />
        </Switch>
      </main>
    </>
  );
}
