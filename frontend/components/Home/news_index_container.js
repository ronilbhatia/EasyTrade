import NewsIndex from './news_index';
import { connect } from 'react-redux';
import { fetchNews } from '../../actions/news_actions';

const mapStateToProps = state => ({
  news: state.entities.news
});

const mapDispatchToProps = dispatch => ({
  fetchNews: () => dispatch(fetchNews())
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsIndex);
