import { ResultJson, useDispatch, useTrackedState } from "@/store/tracked";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";


export const useExpansion = () =>{
  const [ isExpanded, setIsExpanded ] = useState(false);
  
  const handleExpansion = () => {
    setIsExpanded(prev => !prev)
  };

  return {
    isExpanded,
    handleExpansion
  };
}

export const useCurrentWriter = () =>{
  const { data } = useSession();
  const { writer } = useTrackedState();
  const dispatch = useDispatch();

  useEffect(() => {
    if( data && data.user && !writer ) {
      const getWriter = async() =>{
        if ( !data.user ) return;

        const result = await fetch(`/api/user/${ data.user.userType }`);
        const jsonResult: ResultJson = await result.json();

        if ( result.ok ) {
          dispatch({
            type: "SET_USER",
            userType: data.user.userType as "writer" | "student",
            data: jsonResult.data
          })
        }
      }

      getWriter();
    }
  }, [ data ])

  return { data, writer }
}