import { Add } from "@mui/icons-material"
import { Card, Grid, Tooltip } from "@mui/material"

const AddCourseBtn = ({hndlOpn, colors, isMobile, theme}) =>{
return (
    <Grid item>
              <Tooltip title="Añadir curso" arrow>
                <Card
                  sx={{
                    width: isMobile ? "80vw" : "40vh",
                    height: isMobile ? "auto" : "40vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    maxWidth: 600,
                    borderRadius: "12px",
                    boxShadow: theme.shadows[3],
                    transition: "0.3s",
                    "&:hover": { boxShadow: theme.shadows[6] }
                  }}
                  onClick={() => hndlOpn()}
                >
                  <Add sx={{ fontSize: isMobile ? "10vw" : "10vh", color: colors.primary.main }} />
                </Card>
              </Tooltip>
            </Grid>
)
}

export default AddCourseBtn