import ManageCourses from '../../pages/ManageCourses/ManageCourses'

const ScreenManageCourses = ({data, userData, categories, loader, userLoader, catLoader, update}) =>{

    return <ManageCourses {...{data, userData, categories, loader, userLoader, catLoader, update}}/>
}

export default ScreenManageCourses