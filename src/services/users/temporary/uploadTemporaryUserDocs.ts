import api from 'services/api'

interface UploadData {
  docImages: [Object, Object]
  docType: 'CNPJ' | 'CPF'
  docNumber: string
}

export const uploadTemporaryUserDocs = async (data: UploadData) => {
  try {
    await api.post('/users/temporary/docs', data)
  } catch (err: any) {
    if (err.response.data) {
      return { error: err.response.data.error }
    } else if (!err.request.data) {
      return { error: 'ConnectionError' }
    } else {
      return { error: 'InternalError' }
    }
  }
}
