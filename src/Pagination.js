import React from 'react'

const Pagination = ({postsPerPage, totalPosts, paginate}) => {
let pageNumber =[];
for(let i =1; i<= Math.ceil(totalPosts/postsPerPage) ; i++){
     pageNumber.push(i)
}
  return (
    <nav>
        <ul className='pagination'>
            {pageNumber.map((number)=>{
                return (
                    <li key={number}>
                        <a href="!#" className='page-item' onClick={()=>paginate(number)}>
                            {number}
                        </a>
                    </li>
                )
            })}
        </ul>
    </nav>
  )
}

export default Pagination