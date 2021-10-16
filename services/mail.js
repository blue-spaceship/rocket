import sgMail from '@sendgrid/mail'

if(process.env.SENDGRID_API_KEY){
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
}

export const Test = async () => {
  const msg = {
    to: 'w.almeida.w@gmail.com',
    from: 'okaywillian@gmail.com',
    subject: 'Teste de Integração Sendgrid',
    content: [ { type: 'text/plain', value: "Hello world" } ]
  }

  return sgMail.send(msg)
}

export default async (template_id, to, data) => {
  const msg = {
    template_id,
    to,
    from: "Willian Rodrigues <okaywillian@gmail.com>",
    dynamicTemplateData: data
  }

  if(process.env.SENDGRID_API_KEY){
    return sgMail.send(msg)
  }
}

export const Templates = {
  'newUser': 'd-dfe9679126da4674819e2d881b694caf',
  'forgetPassword' : 'd-39fd27459bb245e4bbe1bf31612e4a79'
}