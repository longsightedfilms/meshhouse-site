import React from 'react'
import { NavLink } from 'react-router-dom'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

const ModelPaginator = (props: any) => {
  const currentPage = isNaN(Number(props.match.params.page)) ? 1 : Number(props.match.params.page)
  const totalPages = props.totalPages + 1

  function generateLink(idx: number): string {
    return `/models/${props.match.params.category}`
    + (currentPage - 1 === 0 ? '' : `${(currentPage - 1) + idx}`)
  }

  return (
    <Pagination size='lg'>
      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink
          first
          tag={NavLink}
          to={`/models/${props.match.params.category}`}
        />
      </PaginationItem>
      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink
          previous
          tag={NavLink}
          to={`/models/${props.match.params.category}`}
        />
      </PaginationItem>
      {[...Array(5)].map((item: any, idx: number) => (
        (currentPage - 1) + idx < totalPages - 1 && (
          <PaginationItem
            key={`paginator-item-${idx}`}
          >
            <PaginationLink
              tag={NavLink}
              to={generateLink(idx)}
            >
              {currentPage + idx}
            </PaginationLink>
          </PaginationItem>
        )
      ))}
      <PaginationItem disabled={currentPage === totalPages - 1}>
        <PaginationLink
          next
          tag={NavLink}
          to={`/models/${props.match.params.category}/${(Number(props.match.params.page) ?? 0) + 1}`}
        />
      </PaginationItem>
      <PaginationItem disabled={currentPage === totalPages - 1}>
        <PaginationLink
          last
          tag={NavLink}
          to={`/models/${props.match.params.category}/${totalPages}`}
        />
      </PaginationItem>
    </Pagination>
    )
}

export default ModelPaginator
