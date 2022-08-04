import React from "react";

export default function Paginado ({allDogs, dogPerPage, paginado}) {
    const pageNumber = [];
    if( typeof allDogs === 'object' )
    for (let i = 1; i < Math.ceil (allDogs.length / dogPerPage); i++) {
        pageNumber.push (i)        
    };
    
return(
    <nav className ="paginado">
            {pageNumber && pageNumber.map(e => (
                <ul className="number" key = {e}> 
                    <a onClick= {() => paginado(e)}>
                        {e}
                    </a>
                </ul>
            ))}
        
    </nav>
)};


