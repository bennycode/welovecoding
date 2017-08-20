import * as React from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {fetches} from 'redux-fetchers';
import {connect} from 'react-redux';

import {Grid, Row, Col} from 'src/components/modules/Grid';
import {Card} from 'src/components/modules/Layout';
import Typo from 'src/components/modules/Typo';

import {getCategoriesFetcher} from 'src/state/tutorials';
import {StoreState} from 'src/state/store';

interface TutorialsStateProps {
  categories: any[];
}

type TutorialsOwnProps = RouteComponentProps<{}>;

const Tutorials: React.StatelessComponent<TutorialsStateProps & TutorialsOwnProps> = ({categories}) => {
  return (
    <Grid>
      <Row>
        <Col xs={12}>
          <Card>
            <Typo.H1>
              {'Tutorials'}
            </Typo.H1>
            <ul>
              {
                categories.map(c => {
                  return (
                    <li key={c.id}>{c.name}</li>
                  );
                })
              }
            </ul>
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
