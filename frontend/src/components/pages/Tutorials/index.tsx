import * as React from 'react';
import {RouteComponentProps, Route, NavLink} from 'react-router-dom';
import {fetches} from 'redux-fetchers';
import {connect} from 'react-redux';

import {Grid, Row, Col} from 'src/components/modules/Grid';
import {Card} from 'src/components/modules/Layout';
import Typo from 'src/components/modules/Typo';

import {getCategoriesFetcher} from 'src/state/tutorials';
import {StoreState} from 'src/state/store';

import './Tutorials.scss';

interface TutorialViewStateProps {
  category: any;
}

type TutorialViewOwnProps = RouteComponentProps<{id: string}>;

const TutorialView: React.StatelessComponent<TutorialViewOwnProps> = ({match}) => {
  console.log(match);
  return (
    <div>
      {'Hey'}
    </div>
  );
};

const ConnectedTutorialView = connect<TutorialViewStateProps, {}, TutorialViewOwnProps>(
  (state: StoreState, props) => {
    return {
      category: state.tutorials.categories[props.match.params.id],
    };
  },
  {},
)(TutorialView);

interface TutorialsStateProps {
  categories: any[];
}

type TutorialsOwnProps = RouteComponentProps<{}>;

const Tutorials: React.StatelessComponent<TutorialsStateProps & TutorialsOwnProps> = ({categories, match}) => {
  return (
    <Grid>
      <Row>
        <Col xs={12}>
          <Typo.H1>
            {'Tutorials'}
          </Typo.H1>
        </Col>
      </Row>
      <Row>
        <Col sm={4} xs={12}>
          <Card>
            <ul className="wlc_category-list">
              {
                categories.map(c => {
                  return (
                    <NavLink
                      to={`${match.url}/${c.id}`} key={c.id}
                      className="wlc_category-list-link"
                      activeClassName="wlc_category-list-link--active"
                    >
                      <li
                        className="wlc_category-list__item"
                      >{c.name}</li>
                    </NavLink>
                  );
                })
              }
            </ul>
          </Card>
        </Col>
        <Col sm={8} xs={12}>
          <Card>
            <Route path={`${match.url}/:id`} component={ConnectedTutorialView} />
          </Card>
        </Col>
      </Row>
    </Grid>
  );
};

const ConnectedTutorials = connect<TutorialsStateProps, {}, TutorialsOwnProps>(
(state: StoreState) => {
  return {
    categories: state.tutorials.categories,
  };
},
{})(Tutorials);

export default fetches(
  getCategoriesFetcher(),
)(ConnectedTutorials);
