import { styled } from '@mui/system'
import { colors } from './helpers/colors'
import { Box } from '@mui/material'

   export const ModalBox = styled(Box)({
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: 400,
        backgroundColor: '#ffffff',
        border: `0.2px solid ${colors.lightGray}`,
        boxShadow: 24,
        p: 4,
    })
