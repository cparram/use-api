import React from 'react';
import {
  getDisplayName
} from './utils';
import {
  BACKEND_ACTIONS,
} from '../constants';
import PropType from 'prop-types';

const withPagination = WrappedComponent => {
  const propTypes = {
    /** Datasource object with listing status */
    [BACKEND_ACTIONS.INDEX]: PropType.shape({
      /** Pagination props */
      pagination: PropType.shape({
        perPage: PropType.number.isRequired,
        page: PropType.number.isRequired,
      }).isRequired
    }).isRequired,
    /** Function to get list of resources from api */
    apiIndexRequest: PropType.func.isRequired,
  };

  /**
   * HOC Component that wrapps actions related to vault of funnel.
   *
   * @author [César Parra](https://github.com/cparram)
   */
  class WithPagination extends React.Component {

    /**
     * Callback function responsible to get resources for table
     * when per page value change
     * 
     * @param {number} perPage - pagination value
     */
    onPerPageChange = perPage => {
      const {
        [BACKEND_ACTIONS.INDEX]: {
          pagination
        },
        apiIndexRequest,
      } = this.props;
      // Get the current page
      const page = pagination.page;
      // updates current list of records (optional)
      this.paginatable.apiReduxIndex && 
        typeof this.paginatable.apiReduxIndex === 'function' &&
          apiIndexRequest(this.paginatable.apiReduxIndex(page, perPage));
    };

    /**
     * Callback function responsible to get resources for table
     * when page value change
     * 
     * @param {number} page - pagination value
     */
    onChangePage = page => {
      const {
        [BACKEND_ACTIONS.INDEX]: {
          pagination
        },
        apiIndexRequest,
      } = this.props;
      // Get the current per page value
      const perPage = pagination.perPage;
      // updates current list of records (optional)
      this.paginatable.apiReduxIndex && 
        typeof this.paginatable.apiReduxIndex === 'function' &&
          apiIndexRequest(this.paginatable.apiReduxIndex(page, perPage));
    };

    render() {
      return (
        <WrappedComponent
          paginatableRef={ref => this.paginatable = ref}
          paginatable={{
            onPerPageChange: this.onPerPageChange,
            onChangePage: this.onChangePage,
          }}
          { ...this.props }
        />
      );
    }
  }
  WithPagination.displayName = `WithPagination(${getDisplayName(WrappedComponent)})`;
  WithPagination.propTypes = propTypes;

  return WithPagination;
};

export default withPagination;