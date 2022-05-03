import { string } from 'yup'

export const nameField = string().matches(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]{1,40}$/, 'Nome inválido. Somente utilize letras.')
export const passwordField = string().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'A senha precisa ter no mínimo 8 caracteres. Inclua ao menos uma letra maiúscula, uma minúscula, um número e um símbolo (!@#$&*).')
