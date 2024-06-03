import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/system";
import pic1 from "./images/avatar/1.jpg"
import pic2 from "./images/avatar/2.jpg"
import pic3 from "./images/avatar/3.jpg"
import pic4 from "./images/avatar/4.jpg"
import pic5 from "./images/avatar/5.jpg"
import pic6 from "./images/avatar/6.jpg"

const userTestimonials = [
  {
    avatar: <Avatar alt="Remy Sharp" src={pic1} />,
    name: "Remy Sharp",
    occupation: "Engineer",
    testimonial:
    "LakeSite has become my go-to destination for booking lake adventures in Albania. The website's intuitive interface makes it a breeze to reserve spots, and the lakeside experience never fails to rejuvenate my spirit.",
  },
  {
    avatar: <Avatar alt="Travis Howard" src={pic2} />,
    name: "Travis Howard",
    occupation: "Lead Product Designer",
    testimonial:
    "I stumbled upon LakeSite while planning a weekend getaway, and it exceeded all my expectations! The ability to book recreational sports alongside lake reservations added an extra layer of excitement to our trip. Highly recommended!",
  },
  {
    avatar: <Avatar alt="Cindy Baker" src={pic3} />,
    name: "Cindy Baker",
    occupation: "Makeup Artist",
    testimonial:
    "As an avid nature lover, LakeSite has become my virtual sanctuary. From kayaking on crystal-clear waters to enjoying serene lake views, every moment spent on the website feels like a blissful escape from the hustle and bustle of daily life.",
  },
  {
    avatar: <Avatar alt="Remy Sharp" src={pic4} />,
    name: "Julia Stewart",
    occupation: "Software Developer",
    testimonial:
    "I can't stop raving about LakeSite to all my friends! The positive feedback I've received after recommending it to them speaks volumes about its quality. Trust me, you won't be disappointed with the experience it offers.",
  },
  {
    avatar: <Avatar alt="Travis Howard" src={pic5} />,
    name: "John Smith",
    occupation: "Business Analyst",
    testimonial:
    "Thanks to LakeSite, I've discovered a newfound appreciation for Albania's natural beauty. Whether I'm lounging by the lakeside or indulging in water sports, each visit leaves me with cherished memories that I'll treasure forever.",
  },
  {
    avatar: <Avatar alt="Cindy Baker" src={pic6} />,
    name: "Daniel Wolf",
    occupation: "Chef",
    testimonial:
    "Using LakeSite to plan my lake adventures has been an absolute delight. The seamless booking process coupled with the sheer joy of exploring Tirana's lakes has made me a loyal user. Can't wait for my next excursion!",
  },
];

const whiteLogos = [
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628e8573c43893fe0ace_Sydney-white.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d520d0517ae8e8ddf13_Bern-white.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f46794c159024c1af6d44_Montreal-white.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e891fa22f89efd7477a_TerraLight.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a09d1f6337b1dfed14ab_colorado-white.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5caa77bf7d69fb78792e_Ankara-white.svg",
];

const darkLogos = [
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628889c3bdf1129952dc_Sydney-black.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d4d8b829a89976a419c_Bern-black.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f467502f091ccb929529d_Montreal-black.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e911fa22f2203d7514c_TerraDark.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a0990f3717787fd49245_colorado-black.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5ca4e548b0deb1041c33_Ankara-black.svg",
];

const logoStyle = {
  width: "64px",
  opacity: 0.3,
};

export default function Testimonials() {
  const theme = useTheme();
  const logos = theme.palette.mode === "light" ? darkLogos : whiteLogos;

  return (
    <Container
      id="testimonials"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: "100%", md: "60%" },
          textAlign: { sm: "left", md: "center" },
        }}
      >
        <Typography component="h2" variant="h4" color="text.primary">
          Testimonials
        </Typography>
        <Typography variant="body1" color="text.secondary">
          See what our customers love about our website. Discover how we excel
          in efficiency, durability, and satisfaction. Join us for quality,
          innovation, and reliable support.
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {userTestimonials.map((testimonial, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: "flex" }}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                flexGrow: 1,
                p: 1,
              }}
            >
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {testimonial.testimonial}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  pr: 2,
                }}
              >
                <CardHeader
                  avatar={testimonial.avatar}
                  title={testimonial.name}
                  subheader={testimonial.occupation}
                />
                <img
                  src={logos[index]}
                  alt={`Logo ${index + 1}`}
                  style={logoStyle}
                />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
