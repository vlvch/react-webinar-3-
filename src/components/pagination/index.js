import { memo } from 'react';
import propTypes from 'prop-types';
import { getPaginationList } from '../../utils';
import './style.css';

function Pagination(props) {
  const {
    pagesCount = 0,
    currentPage = 0,
    onClick = () => { },
  } = props;

  const list = getPaginationList(currentPage, pagesCount);
  const firstPage = 1;
  const lastPage = pagesCount;

  return (
    <div
      className='Pagination'
      onClick={(e) => e.target.className === 'Pagination-item' && onClick(Number(e.target.dataset.value))}>
      {!list.includes(firstPage) &&
        <>
          <div data-value={firstPage} className='Pagination-item'>{firstPage}</div>
          {currentPage - 2 !== firstPage && <div className='Pagination-dots'>...</div>}
        </>
      }
      {list.map((num) => {
        return (
          <div
            data-value={num}
            key={num}
            className={'Pagination-item' + (num === currentPage ? ' Pagination-item_selected' : '')}>
            {num}
          </div>
        )
      })}
      {!list.includes(lastPage) &&
        <>
          {currentPage + 2 !== lastPage && <div className='Pagination-dots'>...</div>}
          <div data-value={lastPage} className='Pagination-item'>{lastPage}</div>
        </>
      }
    </div >
  );
}

Pagination.propTypes = {
  pagesCount: propTypes.number,
  currentPage: propTypes.number,
  onClick: propTypes.func,
};

export default memo(Pagination);
