import React, { useEffect, useState } from "react";
import CompanyBox from "./CompanyBox";
import { Container, Row, Col } from "react-bootstrap";
import CompanyAPI from "api/Company/CompanyAPI";

function CompanyList() {
  const [listProduct,setlistProduct] = useState([{title:'Company',description:'Company'}]);
  useEffect(() => {
    async function fetchData() {
      const result = await CompanyAPI.getListCompanyTop();
      setlistProduct(result);
    }
    fetchData();
}, [])

  return (
    <div>
      <React.Fragment>
        <Container>
          <Row style={{display:'flex',flexWrap: 'wrap',justifyContent: 'space-evenly'}}>
            {listProduct.length > 0 &&
              listProduct.map(product => {
                const { id } = product;
                return <CompanyBox key={id} product={product} />;
              })}
          </Row>
        </Container>
      </React.Fragment>
    </div>
  )
}

export default CompanyList
