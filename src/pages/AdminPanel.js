import React from "react";
import CommonSection from "../shared/CommonSection.js";
import { Container, Row, ButtonGroup, Button } from "reactstrap";
import Newsletter from '../shared/NewsLetter.js';
import { Outlet, useNavigate } from "react-router-dom";
import '../styles/adminPanel.css'

const AdminPanel = () => {
  const navigate = useNavigate();

  const handleAllToursClick = () => {
    navigate("/admin");
  };

  const handleShowBookingToursClick = () => {
    navigate("/admin/adminBooking");
  };

  const handleAddTourClick = () => {
    navigate("/addtour");
  };

  const handleShowReview = () => {
    navigate("/admin/review");
  }

  var role = localStorage.getItem('role');

  return role === "admin" ? (
    <>
      <CommonSection title={"Admin Panel"} />
      <section>
        <Container>
          <Row>
            <ButtonGroup style={{ margin: '0 auto', display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <Button className="btn primary__btn" onClick={handleAllToursClick}>All Tours</Button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Button className="btn primary__btn" onClick={handleShowBookingToursClick}>Show Booked Tours</Button>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                <Button className="btn primary__btn" onClick={handleShowReview}>Show All Reviews</Button>
              </div>
            </ButtonGroup>



          </Row>
          <Outlet />
        </Container>

        <div className="add_button">
          <Button className="btn primary__btn" onClick={handleAddTourClick}>Add Tour</Button>
        </div>

      </section>
      <Newsletter />
    </>
  ) : (
    <CommonSection title={"You are not Admin"} />
  );
}

export default AdminPanel;
