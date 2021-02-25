import React from "react"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { Link, Menu, MenuItem } from "@material-ui/core"

const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            position: "fixed",
            top: 0,
            right: 0,
            margin: "0 30px",
            background: "none",
            MaxWidth: "400px",
            height: "120px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
        },
        titleWrapper: {
            fontSize: "24px",
            color: "#f0f0f0",
            dropShadow: "30px",
        },
        navLinkWrapper: {
            fontSize: "24px",
            dropShadow: "30px",
        },
        navLink: {
            margin: "0 20px",
            color: "#f0f0f0",
            textDecoration: "bolder",
            "&:hover": {
                cursor: "pointer",
                textDecorationLine: "none",
                color: "red",
            }
        },
        
    })
);

const Header = () => {
    const style = useStyles()

    return (
        <React.Fragment>
            <div className={style.container}>
                <div className={style.titleWrapper}>
                    <h1>Easy Recommendation</h1>
                </div> 
                <div className={style.navLinkWrapper}>
                    <Link href="/" className={style.navLink}>Home</Link>
                    <Link href="#" className={style.navLink}>Account</Link>
                    <Link href="#" className={style.navLink}>Resources</Link>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Header
