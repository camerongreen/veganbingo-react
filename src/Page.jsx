import * as React from "react";
import { useParams, Link } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import GridOnIcon from "@mui/icons-material/GridOn";
import Moment from "moment";
import { Helmet } from "@dr.pogodin/react-helmet";

// Services.
import { BingoContext } from "./services/BingoContext";
import DataService from "./services/DataService";

// CSS.
import "./styles/Page.css";

const dataService = new DataService();

export default function Page() {
  const { name } = useParams();
  const { bingos, hasBingo, toggleBingo } = React.useContext(BingoContext);
  const [page, setPage] = React.useState({});
  const canonicalUrl = "https://veganbingo.net/page/" + name;

  React.useEffect(() => {
    let isMounted = true;
    dataService.getSection(name).then((data) => {
      if (isMounted) {
        setPage(data)
      }
    });
    return () => { isMounted = false };
  }, [name]);

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Helmet>
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      <Grid container spacing={2} size={{ xs: 12 }}>
        <Grid size={{ xs: 4, sm: 3, md: 2 }}>
          <img
            src={
              "/images/" +
              name +
              (hasBingo(name) ? "_done" : "") +
              ".png"
            }
            alt={page.heading + " Page"}
          />
        </Grid>
        <Grid size={{ xs: 8, sm: 9, md: 10 }}>
          <h2>{page.heading}</h2>
        </Grid>
        <Grid size={{ xs: 12 }} className="rules">
          <div>Similar acceptable statements to get this bingo</div>
          <h3>{page.alternatives}</h3>
        </Grid>
        <Grid>
          <Button
            variant="contained"
            color={hasBingo(name) ? "success" : "primary"}
            size="large"
            onClick={() => {
              toggleBingo(name);
            }}
          >
            {hasBingo(name) ? "Remove bingo" : "Add bingo!"}
          </Button>
        </Grid>
        {hasBingo(name) ? (
          <Grid>
            <Typography>
              Completed{" "}
              <strong>
                {Moment(bingos[name].time).format("HH:mm Do MMM YYYY")}
              </strong>
            </Typography>
          </Grid>
        ) : (
          ""
        )}
        <Grid size={{ xs: 12 }}>
          <h2 className="section-title">Summary (tl;dr)</h2>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
            className="discussion"
          >
            <Grid
              size={{ xs: 12 }}
              dangerouslySetInnerHTML={{ __html: page.summary }}
            />
          </Paper>
          <h2 className="section-title">Discussion</h2>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
            className="discussion"
          >
            <Grid
              size={{ xs: 12 }}
              dangerouslySetInnerHTML={{ __html: page.discussion }}
            />
          </Paper>
        </Grid>
      </Grid>
      <IconButton component={Link} to="/">
        <GridOnIcon />
      </IconButton>
    </Container>
  );
}
