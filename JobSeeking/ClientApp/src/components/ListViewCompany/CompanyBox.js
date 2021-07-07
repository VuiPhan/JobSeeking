import ConstCommon from "common/ConstInApp";
import React from "react";
import { Card, Button, Col } from "react-bootstrap";
import './styleCompanyBox.scss';
import { useHistory, useParams } from "react-router-dom";

function CompanyBox(props) {
  const img = "https://cdn.itviec.com/employers/axon/logo/social/uBK6xcRCszrVB8BfkBBsmiqi/axon-logo.png";
    const { companyID,companyName, introduceCompany,numJobsRecruited,imageLogo } = props.product;
  const history = useHistory();
    const HandleRedirectPage = (id) => {
      const linkRedired = `/Company/${id}`;
      history.push(linkRedired);

      window.scrollTo(0, 450);
    }
  return (
    <div key={companyID} style={{marginTop: 40,    overflow: 'hidden'}} className="hoverItem" onClick={()=>HandleRedirectPage(companyID)}>
       <React.Fragment>
        <Col lg={3} md={6} xs={9}>
          <Card style={{ width: "18rem",height:440,textAlign: 'center',position:'relative'}}>
            <div>
            <Card.Img variant="top" style={{height:139,width: 185,minHeight: 185,paddingTop: 16}} src={`${ConstCommon.LinkImage}${imageLogo}`} />
            </div>
            <Card.Body>
              <Card.Title style={{textAlign: 'center',fontSize: 25,height:100}}>{companyName}</Card.Title>
              <div style={{}}>
              <p style={{textDecorationLine:'underline',color:'blue'}}>{numJobsRecruited} việc làm đang tuyển</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </React.Fragment>
    </div>
  )
}

export default CompanyBox
