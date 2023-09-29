import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';

type Props = {
  pageNumbers: number[];
  currentPage: number;
  onPageChange: (value: number) => void;
};

export const Pagination: React.FC<Props> = ({
  pageNumbers,
  currentPage,
  onPageChange,
}) => {
  const [searchParams] = useSearchParams();

  const isFirstPageActive = currentPage === 1;
  const isLastPageActive = currentPage === pageNumbers.at(-1);

  return (
    <>
      <ul className="pagination">
        <li
          className={classNames('page-item', { disabled: isFirstPageActive })}
        >
          <Link
            to={{
              search: getSearchWith(searchParams, {
                page: String(currentPage - 1),
              }),
            }}
            className="page__link"
            aria-disabled={isFirstPageActive ? 'true' : 'false'}
            onClick={() => !isFirstPageActive && onPageChange(currentPage - 1)}
          >
            «
          </Link>
        </li>

        {pageNumbers.map((page) => (
          <li
            key={page}
            className={classNames('page-item', {
              active: page === currentPage,
            })}
          >
            <Link
              to={{
                search: getSearchWith(searchParams, { page: String(page) }),
              }}
              className="page__link"
              onClick={() => onPageChange(page)}
            >
              {page}
            </Link>
          </li>
        ))}

        <li className={classNames('page-item', { disabled: isLastPageActive })}>
          <Link
            to={{
              search: getSearchWith(searchParams, {
                page: String(currentPage + 1),
              }),
            }}
            className="page__link"
            aria-disabled={isLastPageActive ? 'true' : 'false'}
            onClick={() => !isLastPageActive && onPageChange(currentPage + 1)}
          >
            »
          </Link>
        </li>
      </ul>
    </>
  );
};
