import ManageCourses from '../../pages/ManageCourses/ManageCourses'

const ScreenManageCourses = ({data, userData, loader, userLoader, update}) =>{

    return <ManageCourses {...{data, userData, loader, userLoader, update}}/>
}

export default ScreenManageCourses