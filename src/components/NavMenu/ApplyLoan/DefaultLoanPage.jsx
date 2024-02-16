import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const DefaultLoanPage = () => {


  const { data: loandForm, isLoanForm: isLoanExist } = useSelector((state) => state.LoanFormDetail);

  const navigate = useNavigate()

  useEffect(() => {


    if(loandForm) {
      const stepAt = loandForm?.trackingdata?.stepAt;
      if(stepAt){
        if(stepAt == 1){
          navigate(`/layout/loan-Details`);
        }
      }
    }
  },[])

  return (
    <div>hello</div>
  )
}

export default DefaultLoanPage