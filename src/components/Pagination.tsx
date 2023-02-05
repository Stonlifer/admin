/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unsafe-optional-chaining */
import { Link } from '@tanstack/react-router'

function Pagination({ meta }: any) {
  const previous = meta?.current_page > 1 ? meta?.current_page - 1 : null
  const next =
    meta?.current_page < meta?.last_page ? meta?.current_page + 1 : null

  const paragraph = (
    <p className="whitespace-pre">
      Showing Pages {meta?.current_page} of {meta?.last_page} in {meta?.total}{' '}
      results
    </p>
  )

  const currentPageTemplate = (
    <>
      <Link
        search={{
          page: 1,
        }}
        className="hidden sm:block"
      >
        <button
          type="button"
          className="hover:text-Primary border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100"
        >
          1
        </button>
      </Link>

      <button
        type="button"
        disabled
        className="hidden border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 sm:block"
      >
        ...
      </button>
    </>
  )

  const normalPreviousTemplate = (
    <Link
      search={{
        page: previous,
      }}
    >
      <button
        type="button"
        className="hover:text-Primary border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100"
      >
        {previous}
      </button>
    </Link>
  )

  const lastPageTemplate = (
    <>
      <a href="#" className="hidden sm:block">
        <button
          type="button"
          disabled
          className="border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500"
        >
          ...
        </button>
      </a>

      <Link
        search={{
          page: meta?.last_page,
        }}
        className="hidden sm:block"
      >
        <button
          type="button"
          className="hover:text-Primary border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100"
        >
          {meta?.last_page}
        </button>
      </Link>
    </>
  )

  return (
    <div className="flex items-center justify-between">
      {meta?.last_page > 1 ? paragraph : ''}

      <nav aria-label="Page navigation" v-if="meta?.last_page > 1">
        <ul className="inline-flex -space-x-px">
          <Link
            search={{
              page: previous,
            }}
          >
            <button
              className={`rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 ${
                previous == null ? '' : 'hover:bg-gray-100 hover:text-primary'
              }`}
              type="button"
              disabled={previous == null}
            >
              Previous
            </button>
          </Link>

          {previous != null && previous > 1 ? currentPageTemplate : ''}
          {previous != null ? normalPreviousTemplate : ''}

          <a href="#">
            <button
              type="button"
              aria-current="page"
              className="hover:text-ActivePrimary border border-gray-300 bg-gray-200 py-2 px-3 leading-tight text-primary"
            >
              {meta?.current_page}
            </button>
          </a>

          {next != null ? (
            <Link
              search={{
                page: next,
              }}
            >
              <button
                type="button"
                className="hover:text-Primary border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100"
              >
                {next}
              </button>
            </Link>
          ) : (
            ''
          )}

          {next != null && next < meta?.last_page ? lastPageTemplate : ''}

          <Link
            search={{
              page: next,
            }}
          >
            <button
              type="button"
              className={`rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 ${
                next == null ? '' : ' hover:text-Primary hover:bg-gray-100'
              }`}
              disabled={next == null}
            >
              Next
            </button>
          </Link>
        </ul>
      </nav>
    </div>
  )
}

export default Pagination
