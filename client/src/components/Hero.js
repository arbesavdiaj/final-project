import React, { useState } from "react";
import { alpha } from "@mui/material";
import {
  Box,
  Button,
  Container,
  Link,
  Stack,
  TextField,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Modal,
  Backdrop,
  Fade,
  Grid
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import reservationApi from "../services/reservationService";
import { useAuthContext } from "../context/auth";
import { useLakeContext } from "../context/lakes";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Hero.css";

const Hero = () => {
  const { publicLakes, user } = useAuthContext();
  const { lakes, searchedLakes, setLakes } = useLakeContext();
  const [selectedLake, setSelectedLake] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [name] = useState({name:""});
  const [reservationDetails, setReservationDetails] = useState({
    user_id: 0,
    lake_id: 0,
    date: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value
    const result = searchedLakes.filter((lake)=>{
      return (
        lake.name.toLowerCase().includes(value.toLowerCase())
      )
    })
    setLakes(result)
  }
  
  const handleLearnMore = (lake) => {
    setSelectedLake(lake);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLake(null);
  };

  const handleCloseReservationModal = () => {
    setIsReservationModalOpen(false);
    setReservationDetails({ user_id: null, lake_id: null, date: null });
  };

  const handleReservationDateChange = (date) => {
    setReservationDetails((prevDetails) => ({
      ...prevDetails,
      date,
    }));
  };

  const handleMakeReservation = (lakeData, userData) => {
    setReservationDetails({
      user_id: userData.id,
      lake_id: lakeData.id,
    });
    setIsReservationModalOpen(true);
  };

  const handleReservationSubmit = async (event) => {
    event.preventDefault();
    if (!reservationDetails.date) {
      setErrorMessage("Please select a date for your reservation.");
      return;
    }
    try {
      const date = reservationDetails.date.format("YYYY-MM-DD")
      await reservationApi.createReservation({
        user_id: reservationDetails.user_id,
        lake_id: reservationDetails.lake_id,
        reservation_date: date,
      });
      handleCloseReservationModal();
    } catch (error) {
      console.error("Error making reservation:", error);
      setErrorMessage("There was an error making the reservation. Please try again.");
    }
  };

  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: "100%",
        backgroundImage:
          theme.palette.mode === "light"
            ? "linear-gradient(180deg, #CEE5FD, #FFF)"
            : `linear-gradient(#02294F, ${alpha("#090E10", 0.0)})`,
        backgroundSize: "100% 20%",
        backgroundRepeat: "no-repeat",
        transition: "filter 0.5s ease",
        filter: isModalOpen || isReservationModalOpen ? "blur(5px)" : "none",
      })}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: "100%", sm: "70%" } }}>
          <Typography
            variant="h1"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignSelf: "center",
              textAlign: "center",
              fontSize: "clamp(3.5rem, 10vw, 4rem)",
            }}
          >
            Lake
            <Typography
              component="span"
              variant="h1"
              sx={{
                fontSize: "clamp(3rem, 10vw, 4rem)",
                color: (theme) =>
                  theme.palette.mode === "light"
                    ? "primary.main"
                    : "primary.light",
              }}
            >
              Site
            </Typography>
          </Typography>
          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{ alignSelf: "center", width: { sm: "100%", md: "80%" } }}
          >
            Dive into Albania's serene lakescape and embark on thrilling
            recreational adventures with our Lake Site website, your gateway to
            exploring the natural wonders and exciting sports of the region
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignSelf="center"
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: "100%", sm: "auto" } }}
          >
            <TextField
              id="outlined-basic"
              hiddenLabel
              size="small"
              variant="outlined"
              aria-label="Enter your email address"
              placeholder="Search a Lake"
              value={name.value}
              onChange={handleSearch}
              inputProps={{
                autoComplete: "off",
                "aria-label": "Enter your email address",
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
            >
              Search
            </Button>
          </Stack>
          <Typography
            variant="caption"
            textAlign="center"
            sx={{ opacity: 0.8 }}
          >
            By clicking &quot;Start now&quot; you agree to our&nbsp;
            <Link href="#" color="primary">
              Terms & Conditions
            </Link>
          </Typography>
        </Stack>

        {!user.id ? (
          <Box sx={{ mt: 8, width: "100%" }} className="lakesCarousel">
            <Carousel
              autoPlay
              infiniteLoop
              showThumbs={false}
              showStatus={false}
              showIndicators={false}
              dynamicHeight
              interval={4000}
            >
              {publicLakes.map((publicLake, index) => (
                <div key={index}>
                  <img
                    src={publicLake.image_url}
                    alt={`Public lake ${index}`}
                    style={{ width: "80%", height: "auto", margin: "0 auto" }}
                  />
                </div>
              ))}
            </Carousel>
          </Box>
        ) : (
          <Grid container spacing={2} sx={{ mt: 8 }}>
            {lakes.map((lake) => (
              <Grid item xs={12} sm={6} md={4} key={lake.id}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    sx={{ height: 140 }}
                    image={lake.image_url}
                    title={lake.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {lake.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {lake.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="medium"
                      onClick={() => handleMakeReservation(lake, user)}
                    >
                      Make a reservation
                    </Button>
                    <Button size="medium" onClick={() => handleLearnMore(lake)}>
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {selectedLake && (
        <Modal
          open={isModalOpen}
          onClose={handleCloseModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
            sx: { backgroundColor: "transparent" },
          }}
        >
          <Fade in={isModalOpen}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                outline: 0,
              }}
            >
              <Card sx={{ maxWidth: 345, backgroundColor: "background.paper" }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={selectedLake.image_url}
                  alt={selectedLake.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {selectedLake.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedLake.description}
                  </Typography>
                  <Typography sx={{ mt: 2 }}>
                    <strong>Location:</strong>&nbsp;
                    <Link
                      href={`${selectedLake.location}`}
                      target="_blank"
                      rel="noopener"
                      color="primary"
                    >
                      {selectedLake.location}
                    </Link>
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="medium" onClick={handleCloseModal}>
                    Close
                  </Button>
                </CardActions>
              </Card>
            </Box>
          </Fade>
        </Modal>
      )}

      <Modal
        open={isReservationModalOpen}
        onClose={handleCloseReservationModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          sx: { backgroundColor: "transparent" },
        }}
      >
        <Fade in={isReservationModalOpen}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              outline: 0,
            }}
          >
            <Card sx={{ maxWidth: 345, width: "100%", p: 2 }}>
              <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                Make a Reservation at {selectedLake?.name}
              </Typography>
              <form onSubmit={handleReservationSubmit}>
                <Stack spacing={2}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Reservation Date"
                      value={reservationDetails.date}
                      onChange={handleReservationDateChange}
                      renderInput={(params) => (
                        <TextField {...params} required />
                      )}
                    />
                  </LocalizationProvider>
                  {errorMessage && (
                    <Typography variant="body2" color="error">
                      {errorMessage}
                    </Typography>
                  )}
                  <Button type="submit" variant="contained" color="primary">
                    Submit Reservation
                  </Button>
                  <Button
                    onClick={handleCloseReservationModal}
                    variant="outlined"
                    color="secondary"
                  >
                    Cancel
                  </Button>
                </Stack>
              </form>
            </Card>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default Hero;
