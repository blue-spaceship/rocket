import { useState } from "react"
import { Header, Main, Content } from "/components/default/page"
import { Input, TextArea, Select, Checkbox, CheckButton } from "/components/default/input"

const Page = ({ setLoading }) => {
	const [check, setCheck] = useState(false)

	return (
		<Main>
			<Header>
				<h2>Blue Spaceship</h2>
			</Header>
			<Content>
				<Input label="Nome"
					input={ { type: 'text', placeholder: 'Digite seu nome' } }
					labelComplement={ <a>pra que seu nome?</a> } 
					message={ { type: 'danger', text: 'Valor inválido' } } />
				<TextArea label="Mensagem"
					input={ { type: 'text', placeholder: 'Sua mensagem aqui' } }
					labelComplement={ <a>não ta entendendo nada?</a> } 
					message={ { text: 'Digite um texto bonitinho aqui.' } } />
				<Select label="Seleciona um ai" options={ [ { value: '1', text: "Opção 1" }, { value: '2', text: "Opção 2" } ] } />
				<Select label="Escolhe uns ai" options={ [ { value: '1', text: "Opção 1" }, { value: '2', text: "Opção 2" } ] } input={{ multiple: true }}/>

				<Checkbox label="Ai, eu aceito" 
					message={ { type: 'danger', text: 'Valor inválido' } } />

					
				<CheckButton label="Cê é 💁🏻‍♂️?" 
					input={ { onChange : ( e ) => setCheck( e.target.checked ), checked: check } }
					message={ { type: 'info', text: 'Igor nera gay?' } } />
			</Content>
		</Main>
	)
}

export default Page