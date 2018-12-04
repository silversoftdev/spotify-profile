import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getRecentlyPlayed } from '../spotify';

import Loader from './Loader';
import Track from './Track';

import styled from 'styled-components/macro';
import { Section } from '../styles';

const Container = styled(Section)`
  width: 100%;
`;
const TracksContainer = styled.div`
  margin-top: 50px;
`;

class RecentlyPlayed extends Component {
  static propTypes = {
    recentlyPlayed: PropTypes.object,
  };

  state = {
    recentlyPlayed: null,
  };

  componentDidMount() {
    this.getData();
  }

  async getData() {
    try {
      const { data } = await getRecentlyPlayed();
      this.setState({ recentlyPlayed: data });
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    const { recentlyPlayed } = this.state;

    return (
      <Container>
        <h2>Recently Played Tracks</h2>
        <TracksContainer>
          {recentlyPlayed ? (
            recentlyPlayed.items.map(({ track }, i) => <Track track={track} key={i} />)
          ) : (
            <Loader />
          )}
        </TracksContainer>
      </Container>
    );
  }
}

export default RecentlyPlayed;
