import HomePage from "./Components/HomePage";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import "./App.css";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      width: "100%",
      height: "100vh",
      backgroundImage: `url(${
        process.env.PUBLIC_URL + "/desk_background.jpg"
      })`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    },
  })
);

function App() {
  const style = useStyles();
  return (
    <div className="App" className={style.container}>
      <HomePage />
    </div>
  );
}

export default App;
