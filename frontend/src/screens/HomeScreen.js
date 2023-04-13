import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

export default function HomeScreen() {
  return (
    <>
      <header
        className="background-img"
        style={{
          height: "600px",
          backgroundSize: "100% 100%",
          color: "white",
        }}
      >
        <Container
          className="d-flex align-items-center"
          style={{ maxWidth: "1140px", height: "100%" }}
          fluid
        >
          <div className="ms-3">
            <h1 style={{ fontSize: "60px", fontWeight: "700" }}>420 for All</h1>
            <h4 className="mt-4 mb-5">New Deals Every Day</h4>
            <Link to="/" className="header-btn">
              Shop Now
            </Link>
          </div>
        </Container>
      </header>

      <Container
        className="mt-5 mb-5 d-flex align-items-center flex-wrap justify-content-lg-between  justify-content-md-center red"
        style={{ maxWidth: "1140px", height: "100%" }}
        fluid
      >
        <div className="red" style={{ height: "100%", width: "500px" }}>
          <h2>Save on Khalifa Kush, Love’s Oven, Bhang and Trekkers</h2>
          <p>Limited Time Florida Deals</p>
          <h5>
            Puff like a Rock Star with KK at just $40. Get Baked with Big
            savings on Bhang and Love’s Oven Edibles. Explore a little further
            with $15 Trekkers.
          </h5>
          <Link to="/" className="body-btn">
            Shop Now
          </Link>
        </div>

        <img
          className="red"
          style={{ borderRadius: "100%", height: "500px", width: "500px" }}
          src="https://images.unsplash.com/photo-1630082900894-edbd503588f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        ></img>
      </Container>
    </>
  );
}
