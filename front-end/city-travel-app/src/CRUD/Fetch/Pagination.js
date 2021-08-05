const Pagination = ({ DataPerPage, TotalData, paginate }) => {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(TotalData / DataPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <div className="center">
      <br></br>

      {pageNumber.map((num) => {
        return (
          <div className="pagination" key={num}>
            {console.log(num)}
            <a
              className="page-link"
              onClick={() => paginate(num)}
            >
              {num}
            </a>
            {/* </li> */}
          </div>
        );
      })}

      {/* </ul> */}

      {/* </nav> */}
    </div>
  );
};

export default Pagination;
