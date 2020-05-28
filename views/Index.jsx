const React = require('react');

class Index extends React.Component {
    render(){
        const todoList = []
        const notDone = <p>Not Done</p>
        const Done = <p>Done</p>
        const list = <ul>
                {this.props.todo.map((todo, index) => {
                    todoList.push(this.props.todo)
                    return(
                    <>
                    <li><p>{todo.name} - {todo.done = false ? Done : notDone} </p></li>
                    <form action={`/todo/${todo._id}?_method=DELETE`} method="post">
                    <input type="submit" value="delete"/>
                    </form>
                    </>
                    )
                })}
            </ul>
        const empty = <h3>There are no To Dos yet</h3>
        return(
        <>
            <h1>To-do List</h1>
            {Object.keys(todoList).length === 0 ? empty : list}
            <hr></hr>
            <form action='/todo' method="POST">
                <input type='text' name='name'/> 
                <input type="submit" name="" value="ADD TO DO"/>
            </form>
        </>
        )
    }
}

module.exports = Index