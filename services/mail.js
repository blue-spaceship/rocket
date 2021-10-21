import sgMail from '@sendgrid/mail'

if(process.env.SENDGRID_API_KEY){
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
}

export async function Send (template_id, to, data){
  const msg = {
    template_id,
    to,
    from: "Willian Rodrigues <noreply@minery.com.br>",
    dynamicTemplateData: data
  }

  if(process.env.SENDGRID_API_KEY){
    return sgMail.send(msg)
  }
}

export async function Test(){
  const msg = {
    to: 'w.almeida.w@gmail.com',
    from: 'okaywillian@gmail.com',
    subject: 'Teste de Integração Sendgrid',
    content: [ { type: 'text/plain', value: "Hello world" } ]
  }

  return sgMail.send(msg)
}

export default Send

export const Templates = {
  'newUser': 'd-ea0da27cffce4fdfa388c5e94a1d0495',
  'forgetPassword' : 'd-716038270ce342e48821fcdfb990e98f'
}