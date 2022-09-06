import React, { ChangeEventHandler, useState, ComponentType } from 'react'
import { Button, Typography, SxProps, Box, SvgIconProps } from '@mui/material'
import { ImagePlus, CheckCircle, FileUpload } from 'mdi-material-ui'

interface ButtonImageUploadProps {
  label?: string
  sx?: SxProps
  name: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  accept?: string
  Icon?: ComponentType<SvgIconProps>
  multiple?: boolean
}

export const ButtonFileUpload: React.FC<ButtonImageUploadProps> = ({ label, name, sx, accept, onChange, Icon, multiple, ...props }) => {
  const [filesUpload, setFilesUpload] = useState<FileList>()

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFilesUpload(e.target.files)
    }
    if (onChange) {
      onChange(e)
    }
  }

  return (
    <Box sx={{ width: '120px', overflow: 'hidden' }}>
      <Button component="label" color={filesUpload ? 'success' : 'secondary'} variant="outlined" sx={{
        display: 'flex',
        flexDirection: 'column',
        textTransform: 'none',
        width: '120px',
        height: '100px',
        ...sx
      }}>
          <input
            name={name}
            type="file"
            hidden
            multiple={multiple}
            accept={accept}
            onChange={onChangeHandler}
          />
        {filesUpload
          ? <CheckCircle color="success" fontSize="large"/>
          : Icon
            ? <Icon fontSize="large"/>
            : <FileUpload fontSize="large"/>
        }
        <Typography align="center" sx={{ mt: 1 }}>{label}</Typography>
      </Button>
      <Typography variant="caption" sx={{ display: 'block', mt: 1, textAlign: 'center', width: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
        {filesUpload && (filesUpload.length === 1 ? filesUpload[0].name : `${filesUpload.length} arquivos`)}
      </Typography>
    </Box>
  )
}
