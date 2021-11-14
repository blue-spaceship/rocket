import { useState } from 'react'
import { Header, Main, Content } from "/components/default/page"
import LocalBase, { Todo } from '../services/pouchdb'

const Page = () => {
	const [ list, setList ] = useState([])
	const [ NewItem, setNewItem ] = useState('')

	const _ = LocalBase.getInstance()

	const Add = async (event) => {
		event.preventDefault()
		const todo = new Todo({ name: NewItem })
		await _.put({...todo.toJSON()})
		setNewItem('')
	}
	
	LocalBase.get('Todo').then(res => {		
		setList(res);
	}).catch(err => {
		console.log(err);
	})

	const sync = async () => {
		LocalBase.sync()
	}

	return (
		<Main>
			<Header>
				<h2>Blue Spaceship</h2>
			</Header>
			<Content>
				<div style={{ width: '440px', display: 'flex', margin: 'auto', flex: '1' }}>
					<ul>
						{ list.map( (item, index) => <li key={item._id}>{ item.completed ? '✅' : '⬜' }{ item.name }</li>) }
						<li>
							<form onSubmit={Add}>
								<input type="text" required placeholder="Novo item" value={ NewItem } onChange={ (event) => setNewItem( event.target.value ) } />
								<button type="submit">Adicionar</button>
							</form>
						</li>
					</ul>
				</div>
				{ JSON.stringify(list) }
			</Content>
		</Main>
	)
}

export default Page