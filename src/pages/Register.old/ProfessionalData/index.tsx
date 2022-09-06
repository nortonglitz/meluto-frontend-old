import React, { useState, FormEventHandler, ChangeEvent, useEffect } from 'react'
import NumberFormat from 'react-number-format'
import { Box, Fade, Typography, TextField, Button } from '@mui/material'
import { SelectSimpleTextMenu, ButtonFileUpload } from 'components'
import { uploadTemporaryUserDocs } from 'services/users/temporary'
import { ImagePlus } from 'mdi-material-ui'

const docs = [
  { value: 'CNPJ', display: 'CNPJ' },
  { value: 'CPF', display: 'CPF' }
]

const ProfessionalData: React.FC = () => {
  const [docType, setDocType] = useState<'CPF' | 'CNPJ'>('CNPJ')
  const [docNumber, setDocNumber] = useState('')
  const [individualDoc, setIndividualDoc] = useState<[File, File]>([] as any)
  const [companyDoc, setCompanyDoc] = useState<FileList>([] as any)

  useEffect(() => {
    document.title = 'Cadastro - Documentação'
  }, [])

  const handleDocumentChange = (value: any) => {
    setDocNumber('')
    setDocType(value as 'CPF' | 'CNPJ')
  }

  const handleFormSubmit: FormEventHandler = async (e) => {
    e.preventDefault()
    if (!!individualDoc[0] && !!individualDoc[1]) {
      console.log('passei')
      await uploadTemporaryUserDocs({
        docImages: individualDoc,
        docType,
        docNumber
      })
    }
  }

  const onImageUpload = (e: ChangeEvent<HTMLInputElement>, docFile: 'individualDocFront' | 'individualDocBack' | 'companyDoc') => {
    if (e.target.files && e.target.files[0]) {
      if (docFile === 'individualDocFront') {
        setIndividualDoc([e.target.files[0], individualDoc[1]])
        return
      }
      if (docFile === 'individualDocBack') {
        setIndividualDoc([individualDoc[0], e.target.files[0]])
        return
      }
      if (docFile === 'companyDoc') {
        setCompanyDoc(e.target.files)
      }
    }
  }

  return (
    <Fade in>
      <Box sx={{ maxWidth: '400px' }}>
        <Typography variant="h4" align="center" sx={{ mb: 4 }}>Documentação</Typography>
        <Typography>Precisamos saber se é uma pessoa jurídica ou física.</Typography>
        <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', width: '100%', my: 2 }}>
            <SelectSimpleTextMenu sx={{ width: '90px', minWidth: '90px' }} label="Documento" value={docType} options={docs} onChoose={handleDocumentChange}/>
            <NumberFormat
              sx={{ flexGrow: 1, ml: 1 }}
              value={docNumber}
              onValueChange={({ formattedValue, value }) => {
                setDocNumber(value)
              }}
              label="Número do Documento"
              format={docType === 'CPF' ? '###.###.###-##' : '##.###.###/####-##'}
              customInput={TextField}
            />
          </Box>
          {docType === 'CPF'
            ? <Typography variant="body1">Utilize sua CNH para validar seu documento.</Typography>
            : <>
                <Typography variant="body1" align="justify">
                  Para validar que está apto a criar a conta em nome da empresa, tire foto ou adicione um PDF de um dos seguintes documentos:
                </Typography>
                <Typography variant="body1">
                  <ul>
                    <li>Certificado de Condição do Microempreendedor Individual (CCMEI)</li>
                    <li>Contrato Social</li>
                    <li>Procuração permanente</li>
                    <li>Ata de designação de autoridades</li>
                    <li>Contrato constitutivo/estatuto</li>
                  </ul>
                </Typography>
              </>
          }
          <Box sx={{
            mt: 1,
            minWidth: '280px',
            width: '100%',
            maxWidth: '400px',
            border: theme => `1px solid ${theme.palette.divider}`,
            p: 4,
            borderRadius: '10px'
          }}>
            {docType === 'CPF'
              ? <>
                  <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-around' }}>
                    <ButtonFileUpload key="CPFFront" label="Frente" Icon={ImagePlus} accept="image/*" name="CPFFront" onChange={e => onImageUpload(e, 'individualDocFront')}/>
                    <ButtonFileUpload key="CPFBack" label="Verso" Icon={ImagePlus} accept="image/*" name="CPFBack" onChange={e => onImageUpload(e, 'individualDocBack')}/>
                  </Box>
                  <Typography sx={{ mt: 1 }} align="center" variant="body1" fontSize="0.85em" color="text.secondary">São aceitas imagens até 5MB.</Typography>
                </>
              : <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <ButtonFileUpload key="CNPJFile" label="Documento" multiple accept="image/*,.pdf" name="CNPJFiles" onChange={e => onImageUpload(e, 'companyDoc')}/>
                  <Typography sx={{ mt: 1 }} variant="body1" fontSize="0.85em" color="text.secondary">São aceitas imagens ou documentos PDF até 5MB.</Typography>
                </Box>
            }
          </Box>
          <Button variant="outlined" type="submit" fullWidth size="large" onClick={handleFormSubmit} sx={{ mt: 4 }}>Continuar</Button>
        </form>
      </Box>
    </Fade>
  )
}

export default ProfessionalData
