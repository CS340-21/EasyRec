import { React } from 'react'
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Header from './../Header'

const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            width: "100%",
            height: "100vh",
            backgroundImage: `url(${process.env.PUBLIC_URL + "/desk_background.jpg"})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
        },
    })
);

const HomePage = () => {
    const style = useStyles()

    return (
        <div className={style.container}>
            <Header />
        </div>
    )
}

export default HomePage
