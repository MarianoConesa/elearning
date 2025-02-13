const CourseCard = ({ data, loader, userData, userLoader, update }) => {
    const theme = useTheme()
    const { isDarkMode } = useThemeContext()
    const colors = { ...theme.palette }
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <Grid>
            
        </Grid>
    )
}

export default CourseCard